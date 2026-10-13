import {
  engine,
  Entity,
  Transform,
  GltfContainer,
  Animator,
  pointerEventsSystem,
  InputAction,
  MeshRenderer,
  Material,
  Billboard,
  BillboardMode,
  TextShape,
  MeshCollider,
  ColliderLayer
} from '@dcl/sdk/ecs'
import { Vector3, Quaternion, Color4 } from '@dcl/sdk/math'
import { TREES, ROCKS, BOARS, BONE_PILES, BERRY_BUSHES, Pos } from './mapLayout'
import { Skill } from './state'
import { requestGather } from './transactions'

interface NodeDef {
  model: string
  scale: number
  idle?: string
  action?: string
  skill: Skill
  hover: string
}

const TREE: NodeDef = { model: 'models/resources/Pine.glb', scale: 1, idle: 'idle', action: 'chop', skill: 'lumberjack', hover: 'Chop' }
const ROCK: NodeDef = { model: 'models/resources/mining.glb', scale: 1, idle: 'idle', action: 'mine', skill: 'miner', hover: 'Mine' }
const BOAR: NodeDef = { model: 'models/resources/Boar.glb', scale: 0.8, idle: 'idle', action: 'impact', skill: 'butcher', hover: 'Hunt' }
const BERRY: NodeDef = { model: 'models/resources/Berries.glb', scale: 2.4, idle: 'idle', action: 'gather', skill: 'lumberjack', hover: 'Pick Berries' }
const SKELETON: NodeDef = { model: 'models/resources/Skeleton.glb', scale: 0.9, idle: 'idle', action: 'impact', skill: 'assassin', hover: 'Defeat Skeleton' }

function toPos(p: Pos) {
  return Vector3.create(p.x, p.y, p.z)
}

function spawnGltfNode(def: NodeDef, p: Pos, onClick: (e: Entity) => void): Entity {
  const e = engine.addEntity()
  GltfContainer.create(e, {
    src: def.model,
    visibleMeshesCollisionMask: ColliderLayer.CL_POINTER | ColliderLayer.CL_PHYSICS
  })
  Transform.create(e, {
    position: toPos(p),
    rotation: Quaternion.fromEulerDegrees(0, p.ry ?? 0, 0),
    scale: Vector3.create(def.scale, def.scale, def.scale)
  })
  if (def.idle) {
    Animator.create(e, {
      states: [
        { clip: def.idle, playing: true, loop: true },
        ...(def.action ? [{ clip: def.action, playing: false, loop: false }] : [])
      ]
    })
  }
  pointerEventsSystem.onPointerDown(
    { entity: e, opts: { button: InputAction.IA_POINTER, hoverText: def.hover, maxDistance: 7 } },
    () => onClick(e)
  )
  return e
}

function hit(def: NodeDef, e: Entity) {
  if (def.action && Animator.getOrNull(e)) {
    Animator.playSingleAnimation(e, def.action, true)
  }
  const t = Transform.get(e)
  requestGather(def.skill, 'click', (got) => {
    spawnFloatingText(got > 0 ? `+${got}` : 'FULL!', Vector3.add(t.position, Vector3.create(0, 2.6, 0)), got > 0 ? Color4.fromHexString('#ffd23fff') : Color4.fromHexString('#ff4d4dff'))
  })
}

// --- Bone pile: procedural blocky bones ---------------------------------------

const BONE_WHITE = Color4.fromHexString('#f3eee4ff')

function bone(parent: Entity, pos: Vector3, rotDeg: Vector3, len: number) {
  const shaft = engine.addEntity()
  Transform.create(shaft, { parent, position: pos, rotation: Quaternion.fromEulerDegrees(rotDeg.x, rotDeg.y, rotDeg.z), scale: Vector3.create(0.16, len, 0.16) })
  MeshRenderer.setCylinder(shaft, 0.5, 0.5)
  Material.setPbrMaterial(shaft, { albedoColor: BONE_WHITE, roughness: 0.9 })
  for (const s of [-1, 1]) {
    for (const o of [-0.09, 0.09]) {
      const knob = engine.addEntity()
      Transform.create(knob, { parent: shaft, position: Vector3.create(o, s * 0.5, 0), scale: Vector3.create(1.9, 0.3, 1.9) })
      MeshRenderer.setSphere(knob)
      Material.setPbrMaterial(knob, { albedoColor: BONE_WHITE, roughness: 0.9 })
    }
  }
}

function spawnBonePile(p: Pos): Entity {
  const root = engine.addEntity()
  Transform.create(root, { position: toPos(p), rotation: Quaternion.fromEulerDegrees(0, p.ry ?? 0, 0) })
  bone(root, Vector3.create(0, 0.12, 0), Vector3.create(0, 0, 80), 1.3)
  bone(root, Vector3.create(0.1, 0.3, 0.1), Vector3.create(0, 60, 75), 1.1)
  bone(root, Vector3.create(-0.2, 0.45, -0.1), Vector3.create(0, -50, 70), 1.0)
  // skull
  const skull = engine.addEntity()
  Transform.create(skull, { parent: root, position: Vector3.create(0.45, 0.3, -0.35), scale: Vector3.create(0.5, 0.45, 0.5) })
  MeshRenderer.setSphere(skull)
  Material.setPbrMaterial(skull, { albedoColor: BONE_WHITE, roughness: 0.9 })
  for (const s of [-1, 1]) {
    const eye = engine.addEntity()
    Transform.create(eye, { parent: skull, position: Vector3.create(s * 0.22, 0.05, -0.42), scale: Vector3.create(0.22, 0.26, 0.2) })
    MeshRenderer.setSphere(eye)
    Material.setPbrMaterial(eye, { albedoColor: Color4.fromHexString('#1b2436ff') })
  }
  // click target
  const hitbox = engine.addEntity()
  Transform.create(hitbox, { parent: root, position: Vector3.create(0, 0.45, 0), scale: Vector3.create(1.6, 0.9, 1.6) })
  MeshCollider.setBox(hitbox, ColliderLayer.CL_POINTER)
  pointerEventsSystem.onPointerDown(
    { entity: hitbox, opts: { button: InputAction.IA_POINTER, hoverText: 'Collect Bones', maxDistance: 7 } },
    () => {
      requestGather('assassin', 'click', (got) => {
        spawnFloatingText(got > 0 ? `+${got}` : 'FULL!', Vector3.add(toPos(p), Vector3.create(0, 1.8, 0)), got > 0 ? Color4.fromHexString('#ffd23fff') : Color4.fromHexString('#ff4d4dff'))
      })
    }
  )
  return root
}

// --- Floating "+N" text ------------------------------------------------------

const floaters: { e: Entity; t: number }[] = []

export function spawnFloatingText(text: string, pos: Vector3, color: Color4) {
  const e = engine.addEntity()
  Transform.create(e, { position: pos })
  TextShape.create(e, {
    text,
    fontSize: 6,
    textColor: color,
    outlineColor: Color4.fromHexString('#1b2436ff'),
    outlineWidth: 0.2
  })
  Billboard.create(e, { billboardMode: BillboardMode.BM_Y })
  floaters.push({ e, t: 0 })
}

function floaterSystem(dt: number) {
  for (let i = floaters.length - 1; i >= 0; i--) {
    const f = floaters[i]
    f.t += dt
    const tr = Transform.getMutable(f.e)
    tr.position = Vector3.add(tr.position, Vector3.create(0, dt * 1.2, 0))
    if (f.t > 1.1) {
      engine.removeEntity(f.e)
      floaters.splice(i, 1)
    }
  }
}

// --- Public ------------------------------------------------------------------

export function spawnResources() {
  for (const p of TREES) spawnGltfNode(TREE, p, (e) => hit(TREE, e))
  for (const p of ROCKS) spawnGltfNode(ROCK, p, (e) => hit(ROCK, e))
  for (const p of BOARS) spawnGltfNode(BOAR, p, (e) => hit(BOAR, e))
  for (const p of BONE_PILES) spawnGltfNode(SKELETON, p, (e) => hit(SKELETON, e))
  for (const p of BERRY_BUSHES) {
    spawnGltfNode(BERRY, p, (e) => {
      if (Animator.getOrNull(e)) Animator.playSingleAnimation(e, 'gather', true)
      const t = Transform.get(e)
      requestGather('berry', 'click', (got) => {
        if (got > 0) spawnFloatingText('+1', Vector3.add(t.position, Vector3.create(0, 1.6, 0)), Color4.fromHexString('#a259ffff'))
      })
    })
  }
  engine.addSystem(floaterSystem)
}
