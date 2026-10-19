# Antrom AFK

*Bring resources to the hall, forge wearables you keep, raid in them, and climb to Raiding Champion of the week.*

A co-op forge-and-raid game for Decentraland (SDK7, authoritative server). Players deposit resources at the Vault, forge weapon lines and armor sets at the Forge (every piece is a Decentraland wearable minted to the wallet), take a party of up to four through the Gate to fight the Bone-Warden, level their champion, and compete for the weekly Raiding Champion banner over the hall's stone.

Resources arrive from a separate, already-published smart wearable (the Antrom Guildstone Ring) through a single one-way deposit; nothing else about that wearable is part of this project.

## Creator Success

This repository is the project for a Decentraland Creator Success V0 application.

- Game Design Document: [`design/gdd.md`](design/gdd.md)
- Design decisions log: [`design/decisions.md`](design/decisions.md)
- World: **`koa.dcl.eth`** — test scene deploy pending; link will be added here when it is live: `https://play.decentraland.org/?realm=koa.dcl.eth`
- Studio: KOA · Discord `koa_matt`

## Status

The World is not yet built. The repo currently holds an earlier crafting prototype whose Vault / Forge panel UI (`src/ui/panels.tsx`, `src/ui/components.tsx`) is being reused; the test scene for the application (the Vault deposit and the Forge, the first interaction of the core loop) is the next step and will replace the prototype's gathering code.

## Commands

```bash
npm install
npm run start      # preview; starts the authoritative server automatically (authoritativeMultiplayer: true)
npm run build
npm run deploy     # to koa.dcl.eth (worldConfiguration in scene.json)
```

## Layout

- `scene.json`: World `koa.dcl.eth`, `authoritativeMultiplayer: true`.
- `src/`: scene code (`index.ts` entry; `ui/` React-ECS panels; `state.ts`, `resources.ts`, `suits.ts`).
- `design/`: GDD and decisions.
- `models/`, `images/`, `sounds/`: scene assets (Synty Studios kits under licence; UI and icons original).
