import {
  engine,
  Entity,
  Transform,
  MeshRenderer,
  Material,
  MaterialTransparencyMode,
  Billboard,
  BillboardMode,
  TextShape
} from '@dcl/sdk/ecs'
import { Vector3, Color4 } from '@dcl/sdk/math'
import * as utils from '@dcl-sdk/utils'
import { HUB, Pos } from './mapLayout'
import { PanelId, openPanel, closePanel, ui } from './ui/uiState'

interface StationDef {
  id: PanelId
  label: string
  icon: string
  color: string
  pos: Pos
}

const STATIONS: StationDef[] = [
  { id: 'bank', label: 'DEPOT', icon: 'images/icons/backpack.png', color: '#3ddc84', pos: HUB.sell },
  { id: 'workshop', label: 'CRAFT MATERIALS', icon: 'images/icons/plank.png', color: '#ff9f1c', pos: HUB.workshop },
  { id: 'forge', label: 'TOOL BENCH', icon: 'images/icons/lumberjack.png', color: '#3aa0ff', pos: HUB.forge },
  { id: 'shop', label: 'BERRY SHOP', icon: 'images/icons/berry.png', color: '#a259ff', pos: HUB.berryShop }
]

const bobbers: { e: Entity; base: number; phase: number }[] = []

function machineBox(base: Vector3, offset: Vector3, scale: Vector3, color: string) {
  const e = engine.addEntity()
  Transform.create(e, { position: Vector3.add(base, offset), scale })
  MeshRenderer.setBox(e)
  Material.setPbrMaterial(e, { albedoColor: Color4.fromHexString(color), roughness: 0.8 })
}

function spawnWorkshopMachine(base: Vector3) {
  // Chunky Roblox-style processor: dark base, orange body, input bins and output tray.
  machineBox(base, Vector3.create(0, 0.25, 0.55), Vector3.create(3.6, 0.35, 2), '#1b2436ff')
  machineBox(base, Vector3.create(0, 0.85, 0.55), Vector3.create(3.2, 1.15, 1.65), '#ff9f1cff')
  machineBox(base, Vector3.create(0, 1.48, 0.55), Vector3.create(3.45, 0.24, 1.9), '#1b2436ff')
  machineBox(base, Vector3.create(0, 1.66, 0.55), Vector3.create(2.5, 0.22, 1.25), '#ffd23fff')

  const slotColors = ['#8b542fff', '#8f98aaff', '#e53945ff', '#eee7d7ff']
  for (let i = 0; i < slotColors.length; i++) {
    machineBox(base, Vector3.create(-1.14 + i * 0.76, 0.92, -0.31), Vector3.create(0.5, 0.5, 0.12), '#1b2436ff')
    machineBox(base, Vector3.create(-1.14 + i * 0.76, 0.92, -0.39), Vector3.create(0.34, 0.34, 0.08), slotColors[i])
  }

  // Output tray makes the direction of the machine obvious.
  machineBox(base, Vector3.create(0, 0.42, -0.78), Vector3.create(2.1, 0.16, 0.9), '#d9e0ecff')
  machineBox(base, Vector3.create(-1.05, 0.62, -0.78), Vector3.create(0.15, 0.55, 0.9), '#1b2436ff')
  machineBox(base, Vector3.create(1.05, 0.62, -0.78), Vector3.create(0.15, 0.55, 0.9), '#1b2436ff')

  const text = engine.addEntity()
  Transform.create(text, { position: Vector3.add(base, Vector3.create(0, 1.22, -0.43)) })
  TextShape.create(text, {
    text: 'CRAFT',
    fontSize: 3.5,
    textColor: Color4.White(),
    outlineColor: Color4.fromHexString('#1b2436ff'),
    outlineWidth: 0.22
  })
  Billboard.create(text, { billboardMode: BillboardMode.BM_Y })
}

function spawnStation(def: StationDef) {
  const base = Vector3.create(def.pos.x, def.pos.y, def.pos.z)
  const color = Color4.fromHexString(def.color + 'ff')

  // Pad
  const pad = engine.addEntity()
  Transform.create(pad, { position: Vector3.add(base, Vector3.create(0, 0.08, 0)), scale: Vector3.create(4.4, 0.16, 4.4) })
  MeshRenderer.setCylinder(pad, 0.5, 0.5)
  Material.setPbrMaterial(pad, { albedoColor: color, emissiveColor: color, emissiveIntensity: 0.6, roughness: 1 })
  // Pad rim (dark outline look)
  const rim = engine.addEntity()
  Transform.create(rim, { position: Vector3.add(base, Vector3.create(0, 0.04, 0)), scale: Vector3.create(5.0, 0.08, 5.0) })
  MeshRenderer.setCylinder(rim, 0.5, 0.5)
  Material.setPbrMaterial(rim, { albedoColor: Color4.fromHexString('#1b2436ff'), roughness: 1 })

  if (def.id === 'workshop') spawnWorkshopMachine(base)

  // Post
  const post = engine.addEntity()
  Transform.create(post, { position: Vector3.add(base, Vector3.create(0, 1.4, -1.6)), scale: Vector3.create(0.25, 2.8, 0.25) })
  MeshRenderer.setBox(post)
  Material.setPbrMaterial(post, { albedoColor: Color4.fromHexString('#1b2436ff'), roughness: 1 })

  // Floating icon (billboarded, unlit plane with alpha)
  const icon = engine.addEntity()
  Transform.create(icon, { position: Vector3.add(base, Vector3.create(0, 3.6, -1.6)), scale: Vector3.create(1.6, 1.6, 1.6) })
  MeshRenderer.setPlane(icon)
  Material.setPbrMaterial(icon, {
    texture: Material.Texture.Common({ src: def.icon }),
    alphaTexture: Material.Texture.Common({ src: def.icon }),
    transparencyMode: MaterialTransparencyMode.MTM_ALPHA_BLEND,
    emissiveTexture: Material.Texture.Common({ src: def.icon }),
    emissiveColor: Color4.White(),
    emissiveIntensity: 0.8,
    roughness: 1,
    metallic: 0
  })
  Billboard.create(icon, { billboardMode: BillboardMode.BM_Y })
  bobbers.push({ e: icon, base: base.y + 3.6, phase: Math.random() * 6.28 })

  // Label
  const label = engine.addEntity()
  Transform.create(label, { position: Vector3.add(base, Vector3.create(0, 2.6, -1.6)) })
  TextShape.create(label, {
    text: def.label,
    fontSize: 4,
    textColor: Color4.White(),
    outlineColor: Color4.fromHexString('#1b2436ff'),
    outlineWidth: 0.25
  })
  Billboard.create(label, { billboardMode: BillboardMode.BM_Y })

  // Walk-in trigger
  const trig = engine.addEntity()
  Transform.create(trig, { position: Vector3.add(base, Vector3.create(0, 1.5, 0)) })
  utils.triggers.addTrigger(
    trig,
    utils.NO_LAYERS,
    utils.LAYER_1,
    [{ type: 'box', scale: Vector3.create(5.5, 3, 5.5) }],
    () => {
      ui.nearStation = def.id
      openPanel(def.id)
    },
    () => {
      if (ui.nearStation === def.id) ui.nearStation = null
      if (ui.open === def.id) closePanel()
    }
  )
}

function bobSystem(dt: number) {
  const t = Date.now() / 1000
  for (const b of bobbers) {
    const tr = Transform.getMutable(b.e)
    tr.position = Vector3.create(tr.position.x, b.base + Math.sin(t * 2 + b.phase) * 0.15, tr.position.z)
  }
}

export function spawnStations() {
  for (const s of STATIONS) spawnStation(s)
  engine.addSystem(bobSystem)
}
