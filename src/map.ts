import { engine, GltfContainer, Transform, ColliderLayer } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { HUB, MAP_ORIGIN } from './mapLayout'

const MAP_MODELS = [
  'models/map/AntromForestTest.glb',
  'models/map/AntromCavesTest.glb',
  'models/map/AntromCastleTest.glb',
  'models/map/AntromCastle2Test.glb',
  'models/map/AntromColliderTest.glb',
  'models/map/TreesSkybox.glb'
]

export function setupMap() {
  const origin = Vector3.create(MAP_ORIGIN.x, MAP_ORIGIN.y, MAP_ORIGIN.z)
  for (const src of MAP_MODELS) {
    const e = engine.addEntity()
    GltfContainer.create(e, { src })
    Transform.create(e, { position: origin })
  }

  const fire = engine.addEntity()
  GltfContainer.create(fire, {
    src: 'models/resources/fireplace.glb',
    visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS | ColliderLayer.CL_POINTER
  })
  Transform.create(fire, {
    position: Vector3.create(HUB.campfire.x, HUB.campfire.y, HUB.campfire.z),
    scale: Vector3.create(1.25, 1.25, 1.25)
  })
}
