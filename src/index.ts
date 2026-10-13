import { setupMap } from './map'
import { spawnResources } from './resources'
import { spawnStations } from './stations'
import { setupZones } from './zones'
import { setupUi } from './ui'
import { initializePlayerProfile } from './playerProfile'
import { initializeBackpackPersistence } from './backpackPersistence'
import { initializeUiSounds } from './uiSounds'

export function main() {
  setupMap()
  spawnResources()
  spawnStations()
  setupZones()
  initializeUiSounds()
  setupUi()
  initializePlayerProfile()
  initializeBackpackPersistence()
}
