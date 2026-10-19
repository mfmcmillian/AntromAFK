# Decisions

Dated, one paragraph each. Newest first.

## 2026-10-18 — Standalone World; the ring is only a source of resources

Antrom AFK (the World, this repo) is designed, built and documented as its own game: deposit resources, forge wearables, raid in them, level, be the week's Raiding Champion. The Antrom Guildstone Ring (`AntromAFK-Wearable`) is a separate, already-published product and the GDD treats it as the place resources come from, nothing more: no ring HUD in the hall, no ring heroes, guilds, chat, mail or Storm in the World's design, and no World systems on the ring. The one touchpoint is the Vault's **deposit**: a one-way, idempotent, keyed call from the World's server to the ring's bank that moves a chosen amount of wood / rock / meat / bone out of the wallet's ring balance and into the hall's Vault. Anything the World mints (weapons, armor) it mints itself from its own server with its own dispenser keys.

## 2026-10-18 — Two servers, two ledgers

The ring keeps Matt's own backend (`dcl-firebase-backend`: Express on Vercel + Firestore) for everything of the ring's. The World runs on Decentraland's SDK7 **authoritative server** and keeps all of its own state in `Storage`: Vault balances, Wardenstone, champion XP and level, gear tiers, the Champion board, raid rooms. The World never reads or writes the ring's data except through the deposit call above, and the ring never reads the World's. Why: the ring is live and approved with 60 profiles; keeping the World's state on Decentraland's server means a hall bug cannot touch a ring balance, and the World can be deployed, reset or rebuilt without a backend release. Details (endpoint name, idempotency key, retry) are deferred until the Vault is being built.

## 2026-10-18 — Separate from Dungeons of Antrom

Own experience, own Creator Support application. Shares the Antrom name and the KOA studio with Dungeons of Antrom (`DG-realms`, `-17,123`) and nothing else: no code, no backend, no currency, no progression, no GDD text. The DG GDD stays as written.
