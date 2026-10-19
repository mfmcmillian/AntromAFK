# Antrom AFK

| | |
|---|---|
| Public experience title | Antrom AFK (the scene is "the Champions' Hall") — IP & [Content Policy](https://decentraland.org/content/) self-check: names, characters, code and UI are original KOA work; 3D kits are licensed Synty Studios packs (Synty EULA permits use in shipped games) |
| Deployment target | Decentraland World on a KOA NAME, running the SDK7 **authoritative server** (`authoritativeMultiplayer: true`; `scene.json` currently names `KoA.dcl.eth`, final NAME to confirm) |
| Studio / team name | KOA |
| Date | 2026-10-18 |
| Contact (Discord + email) | koa_matt · matthew.mcmillian@ymail.com |

*A standalone experience. Resources arrive from a separate, already-published smart wearable (the Antrom Guildstone Ring) through one deposit step, the way a bank accepts a cheque; nothing else about that wearable, its backend or its systems is part of this design. Also separate from Dungeons of Antrom (`-17,123`, its own GDD, repo and server).*

---

## 0. TL;DR

| | |
|---|---|
| **Player promise** | Bring resources to the hall, forge wearables you keep, raid in them, and climb to Raiding Champion of the week. |
| **Primary player** | Players who like crafting gear from what they have gathered and then proving it in a fight: the Monster Hunter and co-op raid crowd, arriving at a public World alone and hoping to find a party. In Decentraland specifically: wallets that already hold Antrom resources (60 today) and have nothing to point them at. |
| **Current status** | **Not built.** The `AntromAFK` repo holds a pre-World crafting prototype ("Knights of Antrom: Crafters", 2025) whose Depot / Craft / Workshop panels are reused for the Forge UI. The resource source (the Guildstone Ring) is live and approved, so day one has players with full depots. |
| **Requested round** | **v0** (vertical slice): the hall, the deposit, the Forge with the first weapon line, and one raid against the Bone-Warden, playtested with real parties. The V1 4-week scope in §9 adds the second raid, armor sets, tiers and the Champion board. |
| **Live at end of the round** | *V0:* a player deposits resources, forges a weapon that mints to their wallet, walks through the Gate with up to three others, fights the Bone-Warden with that weapon in hand, and comes back with Wardenstone and champion XP. *V1 (§9):* the same loop with two raids, three weapon lines, armor sets, +1/+2 tiers and the weekly Champion board naming the Raiding Champion in the hall. |

---

## 1. Player Promise

> Bring resources to the hall, forge wearables you keep, raid in them, and climb to Raiding Champion of the week.

The twist is that the gear is real: every weapon and armor piece forged is a Decentraland wearable minted to the wallet, worn in every scene, and the only way to get one is to raid for the material and forge it. For the listing: *forge your gear, raid in it, be champion for a week.*

---

## 2. First Minutes & How to Play

*The order below is what V0 builds; timings are targets to check at the week-2 playtest.*

| Time | Player experience |
|---|---|
| **0–5 seconds after control** | The Champions' Hall: a round stone chamber, a lit stone at its centre with this week's Champion's banner over it, the Forge glowing to one side, the Vault to the other, the Gate to the undercroft behind. Other players visible. One line over Alara at the Forge: "Bring me iron, I'll give you a blade." |
| **5–30 seconds** | The Vault: a stone counter that reads the wallet and shows what it holds (wood, rock, meat, bone) with one button, DEPOSIT. The player picks how much to move in; the numbers appear on the Vault's wall. A wallet with nothing sees "Resources come from the Guildstone Ring" and a link, and can still walk the hall and watch a raid. |
| **30 s – 3 minutes** | The Forge: the first weapon line (Sword & Shield) turns on the anvil, cost in resources, CRAFT green when the Vault covers it. The first blade is priced so that any wallet with a week's resources owns it on the spot. It mints; it is on the avatar; the dummy in the yard takes a hit and shows a number. |
| **3–10 minutes** | The Gate: a party board with up to four seats, one raid (the Bone-Warden), one difficulty, GO. The doors hold 15 s for others in the hall to join. Three rooms of undercroft and the Warden; light / heavy / guard / roll; downed players raised by an ally beside them. |
| **Natural stopping point** | WARDEN SLAIN: time, champion XP, Wardenstone found, gear found; "Champion level 2". Back in the hall the Forge shows what the Wardenstone is for, and the Vault wall shows what the next piece needs. |

**Player-facing How to Play**

- Deposit resources, forge a weapon, wear it
- Raid the undercroft with up to three others
- Level up, forge better, be the week's Champion

---

## 3. Core Loop

| # | Step (verb) | What the player does (Player input → what they see or hear → what changes) | Why do it again? |
|---|---|---|---|
| 1 | **Deposit** | Walk to the Vault → it reads the wallet's resources (one call to the ring's bank, one-way) → choose amounts, DEPOSIT → the Vault wall shows the hall's stores for this wallet. | The Forge's upper tiers cost more than one deposit; the Vault keeps the running total. |
| 2 | **Forge** | Pick a line (Sword & Shield / Twin Daggers / Staff) and a piece (weapon, then helm, chest, legs) → the piece turns on the anvil with its cost in resources and Wardenstone → CRAFT → the server debits the Vault, mints the wearable to the wallet, the piece appears on the avatar in the hall. | Three lines, four pieces each, +1/+2 tiers with a visible trim, and the tiers need the raid. |
| 3 | **Raid** | Up to four at the Gate, GO → three rooms and the Bone-Warden (V1 adds the Hollow Knight in a second wing) → light / heavy / guard / roll, the weapon line sets the moveset, armor pieces set defence → WARDEN SLAIN pays champion XP, Wardenstone and a chance at a set piece to every player who hit the boss. | Hard and Nightmare multiply health, damage and Wardenstone; a party makes them possible. |
| 4 | **Level** | Champion XP from raids → champion level (1–30) → unlocks Hard at 5, the second line's pieces at 8, Nightmare at 14, +2 tier at 20. Level is shown under the name in the hall and on the party seats. | Each unlock is a new fight or a new piece, not a bigger number. |
| 5 | **Rank** | The Champion board on the hall's stone: champion points this week (raid clears weighted by difficulty and time) → top ten with names, the leader's banner over the stone and the title **Raiding Champion** until Monday 00:00 UTC. | The title is held, not kept; the one who lost it knows who took it. |

| | |
|---|---|
| **One complete loop takes** | **4–6 minutes** for a Normal run of the Bone-Warden from GO to WARDEN SLAIN. A hall visit around it (deposit, forge, check the board) is **2–3 minutes**. Payoffs inside the run: Wardenstone per room, XP per kill, a drop toast on the Warden. |
| **Decision, challenge, or expression** | Which line to forge first (Sword & Shield guards, Twin Daggers roll, Staff keeps range); how much to deposit now against the next tier; which difficulty for this party; when to guard and when to spend stamina; who holds the Warden while others hit; which set and trim to wear in the hall and everywhere else. |
| **Shortest satisfying visit / typical session** | One raid, **5 minutes** / a forge, three raids and the board, **20–30 minutes** |
| **Why repetition 10 differs from repetition 1** | First, **the gear**: a +1 Twin Daggers set rolls through a room a Normal Sword & Shield had to guard through, and the Staff in the fourth seat changes the room again. Second, **the difficulty**: Hard and Nightmare on a fight the party knows, for ×2 / ×3 Wardenstone. Third, **the board**: by run ten the player has a name above theirs and a Monday deadline. Layouts are fixed; fresh play comes from gear, people and difficulty. |

**Pillars**

1. **Forge it or don't have it.** Every wearable in the hall was crafted at the Forge by the player wearing it, from resources and raid material.
2. **Better with a party, never blocked without one.** Normal is clearable alone; Hard and Nightmare are tuned for four.
3. **One champion a week.** The title turns over every Monday, and the whole hall sees who holds it.

---

## 4. Why Players Come Back

*First session is bought with fun, next-day with an appointment, long-term with friends. Decentraland sends no notifications, so the reason to return lives in the player's memory or in their friends.*

### 4.1 The next-day (D1) sentence

> "A player who enjoyed their first session returns the next day because **the Champion board** shows their name a few points behind someone else's and the board **resets Monday 00:00 UTC**, so the points that take the title must be earned this week."

### 4.2 The progression chain

> **Repeatable action → persistent reward → new capability, status, or social role → new decision or challenge**

| Moment | What persists or has been built? | What becomes possible next? | How can another player tell? |
|---|---|---|---|
| **End of first session** | Resources in the Vault, one forged weapon minted to the wallet, one Warden kill, champion level 2–3, a handful of Wardenstone, a place on the board. | Helm from the first line (Wardenstone plus resources); a party, now the controls are known; Hard at level 5. | The weapon on the avatar, in the hall and in every other scene; the name on the board. |
| **End of first week** | Champion level 8–10; a full first-line set (weapon + three armor pieces) with one piece at +1; Hard cleared; the second line's weapon forged; two or three names raided with more than once; top ten on the board at least once. | Nightmare at 14; +2 at 20; the Hollow Knight wing (V1) with its own set; the choice each evening between points for the board, Wardenstone for the tier, or a party for Nightmare. | The +1 trim; the second weapon on the hip; the party seat with level 9 beside a stranger's level 3. |
| **Week 3+ — what takes more than two weeks?** | A +2 set from one line plus a second line's weapon, and the Raiding Champion banner at least once. +2 needs Nightmare Wardenstone, which needs a party at level 14+; the title needs a week of raids against everyone else's. | Carrying newcomers through Nightmare; the Hollow Knight's set; holding the title two weeks running. | The banner over the stone with their name; the +2 trim on a hero standing in the hall: the gear a newcomer asks about. |

*End of first week as a scene:* You come into the hall on a Sunday and check the stone first: the banner is someone else's, and you are fourth, nine points behind third, with the reset tomorrow. Two players you cleared Hard with on Thursday are at the Gate with a Staff and a Sword & Shield, one seat open, Nightmare set. You have the level for it since Friday. The Warden falls on the second try, the Wardenstone takes your daggers to +1, and the trim shows when you turn back to the hall. The points put you second. Tomorrow the board is clean and you know who to beat.

*Currency:* **resources** (wood, rock, meat, bone) enter the hall only through the Vault deposit and leave only through the Forge. **Wardenstone** drops only in raids (×2 Hard, ×3 Nightmare) and is consumed by the Forge for armor pieces and tiers. No coins, no trade, no cash purchase; every unit that enters the hall is sunk into a wearable or nothing. **Where it lives:** the hall's Vault balances, Wardenstone, champion XP, gear tiers and the board are the World's own state in the authoritative server's `Storage`; the Vault's deposit is the one call out, to the ring's bank, which debits the wallet there and returns what was moved. Main abuse risk: a client claiming a craft or a kill it did not earn; both are resolved on the server (the Forge debits and mints server-side, the raid's damage and kill are simulated server-side), so the client only ever asks.

### 4.3 Two return hooks

| Selected hook | Exact trigger or timing | What the player anticipates | Reminder channel + no-reminder fallback |
|---|---|---|---|
| **1. Collection — forged sets** *(V0 weapon, V1 armor)* | Every piece is a wearable minted on craft; the Forge shows each line x/4 and names the material and level each missing piece needs; the Warden has a chance to drop an armor piece outright. | "Helm needs 12 Wardenstone; two Hard runs." When complete the set is on the avatar everywhere in Decentraland. | No reminder needed: the Forge shows the gap every visit; fallback is the set itself on another player in the hall. |
| **2. Weekly Champion board** *(V1 build)* | Champion points per raid clear, weighted by difficulty and time; top ten on the stone and the leader's banner over it; resets **Monday 00:00 UTC**, automatic, no content work. | "Nine points off third. One Nightmare clear tonight." The holder who loses the banner sees whose name replaced theirs. | The banner and board are the first thing seen on entry; the community channel posts Monday's Champion; fallback is the player's memory of a gap that is closable. |

*Not in V1, parked for later rounds: crews / guilds, a third raid wing, daily contracts — see §9 cuts.*

---

## 5. Social by Design

*Playable alone, better with others.*

| | |
|---|---|
| **The repeatable social loop** | A player presses GO at the Gate → for 15 s everyone in the hall sees "{name} is going to the Warden · Hard · 1/4" over the Gate and at the foot of the screen → a second player steps in and the seat shows their line and level → Hard becomes clearable, the Staff covers what the Sword & Shield lacks → both get the Wardenstone and the points, and the same two are worth finding again. |
| **The disappearance test** | Deposit, Forge, Normal raids, the yard and the board all work alone. What breaks is **Hard and Nightmare** (tuned for three or four; a lone player clears the first room and not the Warden) and so **+2 tiers**, which need Nightmare Wardenstone. A solo player keeps roughly two thirds of the game and loses the top. |
| **From strangers to a group** | The Gate's party board shows the raid, the difficulty and the seats taken, each seat with the player's line icon and champion level, so a newcomer sees "Warden · Hard · Sword 9, Staff 7, —, —" and knows what is wanted before they click. No text needed. |
| **Recognition & continuity** | Names and champion level over players in the hall and in the run; the board lists names by points; the banner names one. What persists: the board history, the sets on players' backs, the party board showing a familiar name. |
| **Quiet hours & player counts** | Alone: Normal raids, the Forge, the Vault, the yard. Social play becomes viable at **2** (a two-player Hard run). Ideal group **4**; a party holds **4**; several parties can run in parallel. A solo arrival meets someone through the Gate's open parties and the hall itself; the title holder is usually there. |
| **Drop-in / drop-out** | A party is joined from the hall while its doors are open (15 s after GO, extended per joiner, or held by the leader); once closed, closed. A member can leave a run from the door button; the others continue. A downed player is raised by an ally standing beside them; if all fall, everyone returns to the hall and the Warden is whole again. |
| **Visible play (the bystander test)** | At the Forge a bystander sees the piece turn on the anvil, the Vault numbers drop, and the piece appear on the player's avatar, and understands "resources in, gear out". In the yard they see a heavy blow stagger the dummy. |
| **Shareable play (the memorable moment)** | Four players of three lines on the undercroft floor as the Bone-Warden breaks on Nightmare, the last of them raised a second before, the Wardenstone toast on every screen, and upstairs the banner over the stone changing to one of their names. |
| **Bring-a-friend** | The moment a player reaches level 5 and the Hard seat list is empty, or the Forge shows +2 and they know no one does Nightmare alone. What changes when the friend arrives: a wall becomes a run, and the points land for both. |

---

## 6. Mobile-First

*A new scene, so touch is designed in rather than retrofitted. Every verb below is a trigger area or a button; nothing hovers, nothing swipes.*

**Every core-loop verb on touch**

| Core-loop verb | How it works with touch controls |
|---|---|
| **Deposit** | The Vault is a trigger area; the deposit sheet is full-screen with large steppers and one DEPOSIT button. |
| **Forge** | The Forge is a trigger area; lines and pieces are a one-column list of large cards; CRAFT is one tap with a confirm sheet showing what leaves the Vault. |
| **Raid** | Left thumb moves. One attack button: tap light, hold heavy. Guard and roll are two buttons beside it (no gestures). The line sets the moveset, so a touch player picks Sword & Shield for a forgiving guard. |
| **Level** | Level and XP bar are read on the clear screen and under the name; nothing to operate. |
| **Rank** | The board is a full-screen panel with thumb-height rows; the banner needs no interaction. |

**UI plan.** Nothing persistent in the hall; every interaction opens a full-screen panel and closes it. In a raid only health, stamina and the room count are on screen, in the bottom third within thumb reach.

**Performance.** Target: 60 fps on recommended desktop at four players; 30 fps on a **Samsung Galaxy Z Fold 8** (the developer's phone) at four players in the undercroft and eight avatars in the hall. The hall is one Synty kit; the undercroft loads on entry; the deployed scene is budgeted at **under 60 MB**. Per-realm kits are not loaded until a wing exists.

**Desktop-only dependencies.** Checked against the mobile missing-features list (reviewed August 2026). Keyboard combat sits behind one input module with touch as a second source. `LightSource` on the stone and braziers ships on mobile since v1.13.0; emissive textures carry the look before that. Panels use flat backgrounds with a border texture (mobile stretches nine-slice). Nothing depends on gestures, hover, voice or daily quests.

---

## 7. World, Look & Story

**Story / world**

Beneath the Champions' Hall the Bone-Warden guards a gate the knights of Antrom sealed and never meant to open. Alara keeps the Forge above it, turning what the knights bring her into blades and mail, because whatever is behind the Warden will have to be fought by whoever is best armed that week. The banner over the stone says who that is.

**Visual direction.**

One round hall, Synty fantasy kits, over-the-shoulder camera: a lit standing stone at the centre with a banner above it, the Forge's glow to one side, the Vault's counter to the other, the Gate's stair behind; warm stone and torchlight above, bone-white and cold blue below. Players wear forged lines and sets; name and champion level float above them. UI is parchment and navy with gold headings. **Signature:** a player at the Forge, the Vault numbers over the anvil dropping as a blade appears on their hip, two players waiting at the Gate behind with the countdown lit. Sound: a hammer at the Forge, the Gate's chain, each line's hit with its own weight (shield thud, dagger snap, staff crack).

---

## 8. Audience & Comparables

**Audience.** Players who like crafting gear from what they have gathered and then proving it in a fight, arriving at a public World alone and hoping to find a party; in Decentraland, wallets that already hold Antrom resources and want something to spend them on.

**Comparables** — *one outside Decentraland, one inside.*

| | Monster Hunter Rise (Capcom, 2021) | Wondermine (Decentraland, 2020–) |
|---|---|---|
| **What works** | The loop is hunt → carve material → forge gear → hunt harder, and the gear is the progression: a weapon line defines how you fight, and a set shows what you killed. Four-player hunts in a shared hub where other hunters see your armor. | A gather-and-craft loop Decentraland players came back to daily for years: bank the gems, craft a better pickaxe. Everyone stood in the same field, so it was social without a party system. |
| **What does not fit** | Hunts run 15–30 minutes; the hub is instanced to four; gear exists only inside the game. | The grind and the craft are the whole game; nothing you make is a fight, and the reward is a tool and a currency, not a wearable. |
| **What we do differently** | Five-minute raids in a public World where the hub is everyone; the gear is a Decentraland wearable on the avatar in every scene; a weekly title the whole hall can see. | The gathering is done elsewhere and arrives at the Vault; the hall is for forging, raiding and ranking, so the time in the World is the fight, not the waiting. |

---

## 9. 4 Week Plan (v1 scope)

*Team: one developer at about 20 hours a week, 80 hours across the four weeks. A new scene on the authoritative server in the `AntromAFK` repo, deployed to the KOA NAME from week 2 so the "live" milestone is met early. Proposed **V0 scope**: weeks 1–2, the hall, the Vault, the first weapon line and the Bone-Warden on Normal, playtested with one party. **V1** adds the lines, armor, tiers, difficulties, the second wing and the Champion board.*

| Week | What is playable / done |
|---|---|
| 1 — Prototype definition (20 h) | Hall blockout; authoritative server scaffold (`isServer()`, `Storage`, `EnvVar`); the **Vault**: read a wallet's resources and deposit them (one keyed call out, idempotent, settled on both sides); the **Forge** with the Sword & Shield weapon (collection created, dispenser key in `EnvVar`, mint from the server). Playable: deposit, forge, see the blade on the avatar. |
| 2 — Core interaction + first-group test (20 h) | **The Gate and the Bone-Warden**: party board (4 seats, 15 s doors), three rooms, the Warden with three phases, light / heavy / guard / roll, raise an ally, server-simulated hits; champion XP and level; Wardenstone drop. Deployed to the NAME. Milestone playtest: one party of two clears the Warden; watch one true newcomer for §2's timings. |
| 3 — Core systems refinement (20 h) | **Twin Daggers and Staff** lines with their movesets; **armor pieces** (helm, chest, legs per line) costing Wardenstone; **+1 / +2 tiers** with trims; **Hard and Nightmare** (health, damage, Wardenstone multipliers); level gates (5 / 8 / 14 / 20). Combat and hall audio. |
| 4 — Playable prototype, final design direction (20 h) | **Champion board** on the stone with Monday 00:00 UTC reset, the banner and the title; **the Hollow Knight** wing (second raid, same rooms kit, its own boss and set); touch layer and the **mobile playtest** on the Galaxy Z Fold 8 (a phone player clears Normal; 30 fps at four); design direction locked from the week-2 and week-4 sessions. |

**What keeps the experience changing after launch**

- Without building a new room, we rotate **the board's featured raid and difficulty** every **Monday** (one server value; the reset is automatic).
- If an update is skipped, **the Monday reset and the drop tables** still create variation: a clean board and a set still unfinished.
- Progression never resets; **forged wearables cannot be taken back**, and champion level and Wardenstone persist; a new player can contribute within **3 minutes** by forging the first blade and taking a Normal seat, where a fresh player still clears rooms and shares the Warden's drop.
- One player behaviour that would change what we build next: **the same four names at the Gate three evenings running** would move crews (a shared banner and board entry) to the front of V2.

**Not building in v1**

1. **Crews / guilds.** The hurtful cut: a shared banner is the obvious next step after a personal one, and the strongest long-term hook known. Too much surface (roster, moderation) for 80 hours; first in V2.
2. **A third raid wing.** Two bosses, two sets. Content is consumed once; hooks are not.
3. **Daily contracts.** The surest D1 lever, but the board does that job in V1 and contracts need the Wardenstone economy settled first.

*Standing non-goal: the hall never asks a player to stand and click for resources. Resources arrive through the Vault; the World is for forging, raiding and ranking.*

**Top risk + fallback.** Server-simulated combat for four players on the authoritative server holding up at the raid's pace (hits, stagger, raise) with acceptable latency, with no earlier evidence on this runtime. Mitigation: week 2 builds the Warden with server-side hit resolution first and measures before adding phases; the moveset stays small (four actions). Fallback: if the server cannot resolve hits at pace by mid-week 2, V0 ships with **client-side hits and server-side kill and loot validation** (damage totals checked against the weapon's range and the run's length), and the full server simulation moves to V1 week 3.

---
