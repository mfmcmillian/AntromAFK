import { engine, Transform, TextShape, Billboard, BillboardMode, MeshRenderer, Material, MaterialTransparencyMode } from '@dcl/sdk/ecs'
import { Vector3, Color4 } from '@dcl/sdk/math'
import * as utils from '@dcl-sdk/utils'
import { ZONES, Zone } from './mapLayout'
import { player, ZoneId, ZONE_SKILL, SKILL_INFO, SKILL_ICON, WORK_CYCLE_SECS, craftTick, flash } from './state'
import { pollCraftSuit, refreshGuild, requestGather, syncCraftQueue } from './transactions'

const WORK_ZONES: ZoneId[] = ['lumber', 'quarry', 'hunt', 'bones']
let craftSyncElapsed = 0

// Signpost at the zone entrance (closest edge to the hub)
function signpost(id: ZoneId, z: Zone) {
  const skill = ZONE_SKILL[id]
  const info = SKILL_INFO[skill]
  // entrance: edge midpoint facing the hub (hub is around x=2, z=28)
  const hx = 2, hz = 28
  const cx = (z.x0 + z.x1) / 2, cz = (z.z0 + z.z1) / 2
  const dx = hx - cx, dz = hz - cz
  let ex = cx, ez = cz
  if (Math.abs(dx) * (z.z1 - z.z0) > Math.abs(dz) * (z.x1 - z.x0)) ex = dx > 0 ? z.x0 : z.x1
  else ez = dz > 0 ? z.z0 : z.z1
  const base = Vector3.create(ex, z.cy, ez)

  const color = Color4.create(info.color[0], info.color[1], info.color[2], 1)
  const post = engine.addEntity()
  Transform.create(post, { position: Vector3.add(base, Vector3.create(0, 1.6, 0)), scale: Vector3.create(0.3, 3.2, 0.3) })
  MeshRenderer.setBox(post)
  Material.setPbrMaterial(post, { albedoColor: Color4.fromHexString('#1b2436ff'), roughness: 1 })

  const board = engine.addEntity()
  Transform.create(board, { position: Vector3.add(base, Vector3.create(0, 3.3, 0)), scale: Vector3.create(4.2, 1.3, 0.25) })
  MeshRenderer.setBox(board)
  Material.setPbrMaterial(board, { albedoColor: color, emissiveColor: color, emissiveIntensity: 0.4, roughness: 1 })
  Billboard.create(board, { billboardMode: BillboardMode.BM_Y })

  const label = engine.addEntity()
  Transform.create(label, { position: Vector3.add(base, Vector3.create(0, 3.3, 0)) })
  TextShape.create(label, {
    text: info.zoneName,
    fontSize: 3.6,
    textColor: Color4.White(),
    outlineColor: Color4.fromHexString('#1b2436ff'),
    outlineWidth: 0.25
  })
  Billboard.create(label, { billboardMode: BillboardMode.BM_Y })

  const icon = engine.addEntity()
  Transform.create(icon, { position: Vector3.add(base, Vector3.create(0, 4.8, 0)), scale: Vector3.create(1.5, 1.5, 1.5) })
  MeshRenderer.setPlane(icon)
  Material.setPbrMaterial(icon, {
    texture: Material.Texture.Common({ src: SKILL_ICON[skill] }),
    alphaTexture: Material.Texture.Common({ src: SKILL_ICON[skill] }),
    emissiveTexture: Material.Texture.Common({ src: SKILL_ICON[skill] }),
    emissiveColor: Color4.White(),
    emissiveIntensity: 0.8,
    transparencyMode: MaterialTransparencyMode.MTM_ALPHA_BLEND,
    roughness: 1
  })
  Billboard.create(icon, { billboardMode: BillboardMode.BM_Y })
}

function zoneTrigger(id: ZoneId, z: Zone) {
  const e = engine.addEntity()
  const cx = (z.x0 + z.x1) / 2, cz = (z.z0 + z.z1) / 2
  Transform.create(e, { position: Vector3.create(cx, z.cy + 6, cz) })
  utils.triggers.addTrigger(
    e,
    utils.NO_LAYERS,
    utils.LAYER_1,
    [{ type: 'box', scale: Vector3.create(z.x1 - z.x0, 30, z.z1 - z.z0) }],
    () => {
      player.activeZone = id
      player.workProgress = 0
      flash(`Entered ${SKILL_INFO[ZONE_SKILL[id]].zoneName}`)
    },
    () => {
      if (player.activeZone === id) {
        player.activeZone = null
        player.workProgress = 0
      }
    }
  )
}

function afkSystem(dt: number) {
  craftTick(dt)
  craftSyncElapsed += dt
  if (craftSyncElapsed >= 1) {
    craftSyncElapsed = 0
    syncCraftQueue()
    pollCraftSuit() // settles a suit mint in flight (every 15 s while one is pending)
    // Background guild refresh so HQ level-ups from other members get announced even with the panel closed.
    refreshGuild(3 * 60_000)
  }
  if (!player.activeZone) return
  player.workProgress += dt / WORK_CYCLE_SECS
  if (player.workProgress >= 1) {
    player.workProgress -= 1
    const skill = ZONE_SKILL[player.activeZone]
    requestGather(skill, 'cycle')
  }
}

export function setupZones() {
  for (const id of WORK_ZONES) {
    zoneTrigger(id, ZONES[id])
    signpost(id, ZONES[id])
  }
  engine.addSystem(afkSystem)
}
