# Decisions

Dated, one paragraph each. Newest first.

## 2026-10-18 — Two servers, one ledger

The ring (`AntromAFK-Wearable`) keeps Matt's own backend (`dcl-firebase-backend`: Express on Vercel + Firestore) as the single source of truth for everything with value: resources, refined goods, coins, berries, levels, suits, relics, guilds, heroes, Storm, mail, chat. The World (`AntromAFK`) runs on Decentraland's SDK7 **authoritative server** and keeps only world state in its `Storage` (quest progress, raid rooms, hall board, hall layout). The World never holds a balance. When it needs to read or spend, it calls the ring backend over one narrow, keyed server-to-server path (an `AFK_WORLD_KEY` env on both sides; the same shape as the suit-mint path), and the backend settles the debit in one Firestore transaction and returns the new balance. Why: the ring is live and approved with 60 profiles on that ledger, moving it would be a migration for no player benefit, and keeping the World's state separate means a bug in the hall cannot touch a wallet's Depot. Details (endpoint names, quest-tick tracking, idempotency keys) are deferred until the hall is being built.

## 2026-10-18 — Separate from Dungeons of Antrom

Antrom AFK World is its own experience and its own Creator Support application. It shares the Antrom name and the KOA studio with Dungeons of Antrom (`DG-realms`, `-17,123`) and nothing else: no code, no backend, no currency, no progression, no GDD text. The DG GDD stays as written.

## 2026-10-18 — The World is the hub, not the grind

Gathering stays on the ring, wherever the player is in Decentraland. The World spends what the ring gathered: combat wearable crafting at the Forge, quests from Alara's board, and in-person raids in the undercroft. Standing non-goal: the hall never asks a player to stand and click for resources.
