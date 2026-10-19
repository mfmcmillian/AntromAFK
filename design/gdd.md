# Antrom AFK World

| | |
|---|---|
| Public experience title | Antrom AFK World (working title; the hall is "the Guildstone Hall") — IP & [Content Policy](https://decentraland.org/content/) self-check: names, characters, code, UI and the Guildstone Ring are original KOA work; 3D kits are licensed Synty Studios packs (Synty EULA permits use in shipped games) |
| Deployment target | Decentraland World on a KOA NAME, running the SDK7 **authoritative server** (`authoritativeMultiplayer: true`; `scene.json` currently names `KoA.dcl.eth`, final NAME to confirm) |
| Studio / team name | KOA |
| Date | 2026-10-18 |
| Contact (Discord + email) | koa_matt · matthew.mcmillian@ymail.com |

*Separate experience from Dungeons of Antrom (`-17,123`, its own GDD, repo and server). Shares the Antrom name and the studio, nothing else: no code, no backend, no currency, no progression.*

---

## 0. TL;DR

| | |
|---|---|
| **Player promise** | Your ring gathers while you wander Decentraland. Bring the haul to the Guildstone Hall and turn it into a weapon you wear, a raid you fight in person, and a quest that sends you back out. |
| **Primary player** | A ring wearer (60 profiles, 8 guilds today) who has a Depot full of wood, rock, meat and bone and nothing to point it at beyond the next suit; and the Decentraland regular who wants an idle game to run in the background of whatever else they do, with a place to go when the numbers are big enough. |
| **Current status** | **The gathering half is live** as a smart wearable, the Antrom Guildstone Ring (v1.4.0, approved 2026-10-18): four professions, Depot, Workshop, Bank, Berry Shop, 92 profession suits minted, guilds with HQ and tech tree, three heroes with four stats, the Storm auto-battler, lobby chat in four languages, mail. **The World is not built**: the `AntromAFK` repo holds a pre-ring land prototype ("Knights of Antrom: Crafters") that becomes the hall. Ring source: `AntromAFK-Wearable`; backend: `dcl-firebase-backend` (Express on Vercel + Firestore). |
| **Requested round** | **v0** (vertical slice): the hall, the Forge with one craftable combat wearable, and the quest board, read against the live ring ledger. The V1 4-week scope in §9 adds the first in-person raid. |
| **Live at end of the round** | *V0:* a ring wearer walks into the hall, sees their real Depot on the Forge, spends it on a combat wearable that mints to their wallet, and takes a quest that pays out when the ring has gathered its target. *V1 (§9):* the same, plus a four-player raid against a boss in the hall's undercroft, fought with the hero stats the ring already tracks, paying in the forge's rare material. |

---

## 1. Player Promise

> Your ring gathers while you wander Decentraland. Bring the haul to the Guildstone Hall and turn it into a weapon you wear, a raid you fight in person, and a quest that sends you back out.

The twist is the split: the grind happens anywhere in Decentraland, through a wearable, while you do other things; the World is where the grind becomes something you can see, wear and fight with. For the listing: *the idle game that follows you around Decentraland, and the hall where its loot becomes gear, raids and quests.*

---

## 2. First Minutes & How to Play

*Two arrivals matter. A ring wearer already has a Depot; a newcomer does not own the ring yet. The hall must give the newcomer a ring in the first minute and the wearer a reason to spend in the first three.*

| Time | Player experience |
|---|---|
| **0–5 seconds after control** | The Guildstone Hall: a round stone chamber under a lit guildstone, Alara at its foot, the Forge glowing to one side, the quest board to the other, the undercroft stair behind. Other players visible. One line over Alara: "Bring me what the ring gathered." |
| **5–30 seconds** | *No ring yet:* Alara's pedestal says FREE RING and mints the Guildstone Ring to the wallet (the Rewards dispenser the site already uses, one per wallet) with a one-line "put it on, pick a profession, it gathers for you". *Ring on:* the HUD the player knows appears over the hall and their Depot totals float over the Forge. |
| **30 s – 3 minutes** | Walk to the Forge: recipes shown as the piece itself turning on the anvil, cost in the four base resources plus a refined good, and a green CRAFT when the Depot covers it. The first recipe is priced at a few hours of idle gathering, so a wearer of a week owns it on the spot; a newcomer sees exactly how far their ring has to go. |
| **3–10 minutes** | The quest board: three quests from Alara, each a target the ring will hit on its own ("bring 400 bone") plus one thing only the hall can do ("hand it to the Bone-Warden in the undercroft"). Take one. The training yard: hit the dummy with the piece you just forged; the number that pops is the ring's ATTACK stat. |
| **Natural stopping point** | The piece is in the wardrobe, the quest is on the HUD with its bar moving while the ring gathers elsewhere, and the undercroft door reads the raid's next bell. Leave; the ring keeps working; come back when the bar is full. |

**Player-facing How to Play**

- Wear the ring, pick a profession, it gathers wherever you are
- Bring the haul to the hall: forge gear, take quests, fight the raid
- Guildmates in the hall see what you forged

---

## 3. Core Loop

| # | Step (verb) | What the player does (Player input → what they see or hear → what changes) | Why do it again? |
|---|---|---|---|
| 1 | **Gather** (ring, anywhere) | Choose a profession on the ring's dock → every 3 s a gather tick, the bag fills, BANK IT moves it to the Depot → levels, mastery, berries found. Runs in any scene, including this hall. | Already the live loop; the World gives it a destination. |
| 2 | **Forge** (hall) | Stand at the Forge, pick a combat piece (blade, shield, focus, one per hero class to start) → the piece turns on the anvil with its cost; CRAFT → the server spends the Depot, the Rewards server mints the wearable, the piece shows on the player in the hall. | Three classes, tiers that need the undercroft's rare material, and a visible trim per tier. |
| 3 | **Quest** (board → world → hall) | Take one of three quests → a bar on the ring HUD fills as the ring gathers anywhere → return to the hall and hand in at the named NPC → coins, a refined good, and the next quest in Alara's chain. | The chain tells the hall's story one hand-in at a time, and the hand-in is where friends are standing. |
| 4 | **Raid** (undercroft, V1) | Up to four heroes at the undercroft door; the bell rings every 20 minutes → a three-room fight to the Bone-Warden with the ring's hero (Knight / Assassin / Warlock, HP / ATTACK / SPEED / RECOVERY) made physical: light, heavy, guard, roll → the Warden drops the Forge's rare material to every hero who hit it. | The only source of the material the Forge's upper tiers need. |
| 5 — optional | **Show** | The wardrobe and the hall itself: forged pieces on your avatar, the guild tag over your head, the hall board (fastest Warden kill this week, most forged this week, by guild). | A guild that fills the board is seen by everyone who walks in. |

| | |
|---|---|
| **One complete loop takes** | **3–5 minutes** in the hall for a forge-and-quest visit: walk in, craft, take or hand in a quest, hit the dummy, leave. The gathering between visits is idle and happens elsewhere: the first recipe is priced at about 4 hours of ring time. A raid (V1) is **4–6 minutes** from bell to drop. |
| **Decision, challenge, or expression** | Which profession to run for the piece you want (bone for the Assassin blade, rock for the Knight shield); which quest to carry; in the raid, when to guard and when to spend the hero's RECOVERY; which piece and trim to wear in the hall. |
| **Shortest satisfying visit / typical session** | One hand-in or one craft, **3 minutes** / a craft, two hand-ins and a raid bell, **15–20 minutes** |
| **Why repetition 10 differs from repetition 1** | First, **the hero**: by visit ten the ring's hero has levels in four stats and a forged piece per slot, so the raid is a different fight. Second, **the chain**: Alara's quests move from "bring 400 bone" to "forge the Warden's key" to "bring three guildmates to the undercroft", so hand-in ten needs people. Third, **tiers**: the Forge's +1/+2 trims need the Warden's material, so by visit ten the Forge asks for the raid. |

**Pillars**

1. **The grind is somewhere else.** Nothing in the hall asks you to stand and click; the hall spends what the ring gathered.
2. **Everything you make, you wear.** Forged pieces are Decentraland wearables, minted to the wallet, on your avatar in every scene.
3. **One ledger, two doors.** The ring and the hall read the same Depot; nothing earned in one is invisible in the other.

---

## 4. Why Players Come Back

*The ring brings people back on its own: it is on their hand, and the Depot grows while they are elsewhere. The World's job is to be the place that growth is for.*

### 4.1 The next-day (D1) sentence

> "A player who enjoyed their first session returns the next day because **the quest bar on their ring HUD filled overnight** and the hand-in, Alara's next chapter and the Forge recipe it unlocks are **in the hall, not on the ring**."

### 4.2 The progression chain

> **Repeatable action → persistent reward → new capability, status, or social role → new decision or challenge**

| Moment | What persists or has been built? | What becomes possible next? | How can another player tell? |
|---|---|---|---|
| **End of first session** | A ring (minted if they had none), a profession running, one quest taken, and for a wearer of a week, the first forged piece of their class. | The hand-in tomorrow; the second recipe, which needs a refined good from the ring's Workshop. | The forged piece on the avatar, anywhere in Decentraland. |
| **End of first week** | Three quests handed in, two forged pieces, the Workshop queue feeding planks and bricks to the Forge, the first raid bell attended (V1) and a sliver of Warden material. | Tier +1 on a piece; Alara's "bring three guildmates" quest; the hall board. | The +1 trim; the name on the hall board; the guild tag over a hero in the undercroft queue. |
| **Week 3+ — what takes more than two weeks?** | A full three-piece set at +2 for one hero class. +2 needs Warden material from several raids, and the third piece's recipe is the reward of the chain's last quest, which needs four people at the door. | Carrying newcomers through the Warden; the second class's set; a guild's name on the board three weeks running. | The complete set with +2 trim on a hero standing in the hall, seen from the door. |

*End of first week as a scene:* You come into the hall on a Sunday with the quest bar full since Thursday. Alara's hand-in gives you the Forge recipe for the Knight shield, and your Depot already covers it because the ring has been mining rock in the background all week; the shield shows on your arm as the server mints it. Two guildmates are at the undercroft door with four minutes to the bell, so you join them, the Bone-Warden falls on the second try, and the material it drops is the last you needed for +1 on the blade. On the way out you check the board: your guild is second on Warden kills this week, one behind.

*Currency:* the ring's economy, unchanged. Base resources (wood, rock, meat, bone) and refined goods come from the ring's gathering and Workshop; **coins** come from the Bank and quest hand-ins; **berries** are the ring's premium currency (daily share, rare finds). The Forge consumes base and refined resources plus the Warden's material; quests pay coins and refined goods; no new currency is introduced and nothing is tradeable or purchasable for cash in the hall. **Where the ledger lives:** the ring's backend is the single source of truth for everything with value (resources, coins, berries, levels, suits, guilds, heroes, Storm). The World's authoritative server keeps world state only (quest progress, raid rooms, hall board) in its own Storage and spends from the ledger through a narrow, keyed server-to-server call, the same path the ring already uses to mint suits. Main abuse risk: a client claiming a hand-in or craft it did not pay for; both are server-side on the authoritative server and settled against the ledger, so the client only ever asks.

### 4.3 Two return hooks

| Selected hook | Exact trigger or timing | What the player anticipates | Reminder channel + no-reminder fallback |
|---|---|---|---|
| **1. Quest bar on the ring** *(V0 build)* | The active quest's target is tracked by the ring's gather ticks anywhere in Decentraland; the HUD shows "Alara: 310 / 400 bone" and turns green at the target, with the hall as the only hand-in. | "It'll be full by tonight; the hand-in gives me the shield recipe." | The ring HUD itself, visible in every scene; the ring's mail and lobby line when a chain chapter opens. Fallback: the green bar on the hand when they next log in. |
| **2. Raid bell** *(V1 build)* | The undercroft bell rings every 20 minutes, server-timed, posted to the ring's lobby chat ("Warden bell in 5 min, 2 at the door") so wearers elsewhere in Decentraland can jump in. | "Two more Warden kills for +2 on the blade; the guild needs one more for the board." | Lobby chat line and the guild channel the ring already has; fallback is the door's countdown in the hall. |

*Not in V1, parked for later rounds: guild halls (a wing per guild), the Storm auto-battler rendered in 3D, trading between players — see §9 cuts.*

---

## 5. Social by Design

*Playable alone, better with others. The ring already has guilds (8), a lobby, guild chat and whispers; the hall gives those people a floor to stand on.*

| | |
|---|---|
| **The repeatable social loop** | A player hands in a quest at the Bone-Warden's altar → the guildmate forging beside them sees the chapter card and asks in guild chat what it took → both queue at the undercroft door for the bell → the Warden's material drops for both, the guild's kill count ticks on the hall board → they meet at the next bell. |
| **The disappearance test** | The ring, the Forge, the quest chain's first two thirds and the wardrobe all work alone. What breaks is **the undercroft** (the Warden is tuned for three or four heroes; a lone Knight can clear the first room and not the third) and **the last chapter** of Alara's chain, which asks for guildmates at the door. A solo player keeps the hall and the first two forge tiers and loses the top. |
| **From strangers to a group** | The undercroft door lists who is waiting by hero class and level, and the bell counts down in the open, so a stranger sees "Knight 12, Assassin 9, —, —" and knows a Warlock is wanted. Guild tags over heads carry across from the ring. |
| **Recognition & continuity** | Names and guild tags over heroes; the hall board lists guilds and players by Warden kills and pieces forged this week; forged pieces are wearables, so a player is recognised in the hall by what is on their back. What persists: the board history, the ring's lobby and guild chat, the set itself. |
| **Quiet hours & player counts** | Alone: the Forge, the board, the quest chain through chapter four, the training yard. Social play becomes viable at **2** (a two-hero Warden run on the first room's difficulty). Ideal group **4**; the undercroft holds **4** per run, several runs in parallel. A solo arrival meets someone through the undercroft door list and the ring's lobby chat, which shows who is in the hall. |
| **Drop-in / drop-out** | The door is open until the bell; the run is closed after. A hero can leave mid-run; the others continue. A downed hero is raised by an ally standing beside them; if all fall, the Warden resets to full and the door reopens for the next bell. |
| **Visible play (the bystander test)** | At the Forge a bystander sees the piece turn on the anvil, the Depot numbers drop, and the piece appear on the player's avatar, and understands the game is "stuff goes in, gear comes out". In the training yard they see a heavy blow stagger the dummy with a number that matches the ring's ATTACK. |
| **Shareable play (the memorable moment)** | Four heroes of three classes on the undercroft floor as the Bone-Warden breaks, one raised a second before, and the material toast on every screen while the guild's count on the hall board ticks up where everyone upstairs can see it. |
| **Bring-a-friend** | The moment Alara's chain asks for three guildmates at the door, or a wearer sees the FREE RING pedestal and realises the friend they idle with could be gathering too. What changes: a quest that was a wall becomes a bell, and two Depots feed one raid. |

---

## 6. Mobile-First

*The ring is UI-only and already runs on the mobile Explorer at the size it ships (2 MB cap). The hall is a new scene, so its touch mapping is designed in rather than retrofitted.*

**Every core-loop verb on touch**

| Core-loop verb | How it works with touch controls |
|---|---|
| **Gather** | Unchanged: the ring's dock and panels are tap targets already; the ring is the mobile-first half of the game. |
| **Forge** | The Forge is a trigger area, not a hover target; recipes are a one-column list of large cards, CRAFT is one tap with a confirm sheet showing what leaves the Depot. |
| **Quest** | The board is a trigger area; three quest cards fill the screen; TAKE is one tap. Hand-in: walk into the NPC's trigger area, one tap. |
| **Raid** (V1) | Left thumb moves. One attack button: tap light, hold heavy. Guard and roll are two buttons beside it (no gestures). The hero's four stats do the rest; a touch Knight guards more and dodges less by design. |
| **Show** | The wardrobe and the board are full-screen panels with thumb-height rows. |

**UI plan.** In the hall the ring's HUD already occupies the bottom edge, so the hall adds nothing persistent: every hall interaction is a trigger area that opens a full-screen panel and closes it. In a raid only health, stamina and the room count are on screen, in the bottom third.

**Performance.** Target: 60 fps on recommended desktop; 30 fps on a **Samsung Galaxy Z Fold 8** (the developer's phone) with eight avatars in the hall. The hall is one Synty kit and a few props, budgeted at **under 40 MB** deployed; the undercroft loads on entry. The ring's own cost (UI only) is already measured on mobile.

**Desktop-only dependencies.** Checked against the mobile missing-features list (reviewed August 2026). The ring uses `USE_FETCH` only; the hall adds trigger areas and, in V1, keyboard combat behind one input module with touch as a second source. `LightSource` on the guildstone and braziers ships on mobile since v1.13.0; emissive textures carry the look before that. The ring's UI uses nine-slice panels that mobile stretches, so the hall's panels use flat backgrounds with a border texture. Nothing depends on gestures, hover or voice.

---

## 7. World, Look & Story

**Story / world**

The Knights of Antrom guard a guildstone, a standing stone that remembers every oath sworn on it, and Alara, its keeper, bound a sliver of it into rings so the knights could gather for the order wherever they roamed. The hall is where the rings return. Under it, in the undercroft, something the stone was built to hold is stirring, and the Bone-Warden is its gatekeeper.

**Visual direction.**

One round hall, Synty fantasy kits, seen over the shoulder: the lit guildstone at the centre, the Forge's glow to one side, the quest board and Alara to the other, the undercroft stair behind; warm stone and torchlight above, cold blue below. Heroes wear forged pieces and the ring's profession suits; guild tags float with names. UI reuses the ring's panel kit (parchment and navy, gold on paper) so the hall and the HUD read as one product. **Signature:** a ring wearer at the Forge, their Depot numbers in the air over the anvil dropping as a blade appears on their hip, with two guildmates waiting at the undercroft door behind. Sound: the ring's gather and craft chimes carry into the hall; the Forge adds a hammer, the undercroft a bell.

---

## 8. Audience & Comparables

**Audience.** Ring wearers and the Decentraland regulars who would wear one: people who like a game that runs while they do something else, and want the place they bring the result to be a world with other people in it.

**Comparables** — *one outside Decentraland, one inside.*

| | Melvor Idle (Games by Malcs, 2021) | Wondermine (Decentraland, 2020–) |
|---|---|---|
| **What works** | Skills that level while you are away, a crafting tree that turns gathered goods into gear, and combat that uses the gear: the full RuneScape loop with no 3D and no walking, playable in a browser tab. Proof that an idle gather-craft-fight loop holds players for years. | A gather-and-craft loop Decentraland players came back to daily: swing at meteors, bank gems, craft a better pickaxe. Everyone stood in the same field, so it was social without a party system. |
| **What does not fit** | Entirely private: nobody sees your gear, nothing you make exists outside the tab. The combat is a timer too. | The grind is standing in one parcel clicking, and the reward is a currency and a tool, not something you wear or a fight you win. |
| **What we do differently** | The idle half is a wearable that runs anywhere in a public world, and the gear is a Decentraland wearable on your avatar in every scene. The combat is a raid you fight in person with the stats the idle half levelled. | The grind happens wherever the player already is, through the ring; the hall is for spending, forging, questing and the raid, so the time in the World is the interesting part, not the waiting. |

---

## 9. 4 Week Plan (v1 scope)

*Team: one developer at about 20 hours a week, 80 hours across the four weeks. The ring and its backend are live and stay as they are; the World is a new scene on the authoritative server, in the `AntromAFK` repo, deployed to the KOA NAME from week 2 so the "live" milestone is met early. Proposed **V0 scope**: weeks 1–2, the hall with the Forge and the quest board against the live ledger. **V1** adds the undercroft raid and the touch layer.*

| Week | What is playable / done |
|---|---|
| 1 — Prototype definition (20 h) | Hall blockout from the Synty kit; authoritative server scaffold (`isServer()`, Storage, EnvVar); the **ledger bridge**: the server reads a wearer's Depot and hero from the ring backend and spends through one keyed endpoint; FREE RING pedestal wired to the existing dispenser. Playable: walk in, see your real Depot over the Forge. |
| 2 — Core interaction + first-group test (20 h) | **Forge**: one combat piece per hero class (collection created, Rewards dispenser per piece), cost shown and spent, mint to wallet, piece on the avatar. **Quest board**: Alara's chain, chapters 1–4, targets tracked by the ring's gather ticks, hand-in at an NPC. Deployed to the NAME. Milestone playtest: two ring wearers forge and hand in within one session; watch one newcomer take the ring at the pedestal. |
| 3 — Core systems refinement (20 h) | **Undercroft**: three rooms and the Bone-Warden, up to four heroes, bell every 20 minutes, hero stats from the ring (HP / ATTACK / SPEED / RECOVERY) driving the fight; Warden material drop; Forge tiers +1/+2 that consume it; hall board (Warden kills, pieces forged, by guild, Monday reset). Bell line posted to the ring's lobby chat. |
| 4 — Playable prototype, final design direction (20 h) | Chapters 5–6 of the chain (the guildmates-at-the-door quest); touch layer (stick, tap/hold attack, guard, roll; trigger-area panels); **mobile playtest** on the Galaxy Z Fold 8 at eight avatars in the hall; polish pass on the Forge and board UI; design direction locked from the week-2 and week-4 sessions. |

**What keeps the experience changing after launch**

- Without building a new room, the **featured Forge recipe and the board's featured stat** rotate every **Monday** (one server value each, alongside the ring's existing Monday guild-points reset).
- If an update is skipped, **the bell, the Monday board and the chain's gating on raid material** still create variation: a fresh board and a trim still unfinished.
- Progression never resets; **forged pieces are wearables and cannot be taken back**; a new player can contribute within **3 minutes** by taking the ring at the pedestal and standing in a Warden run on the first room, where the Knight's guard matters more than level.
- One player behaviour that would change what we build next: **guilds queuing at the door as a full four three bells running** would move guild wings (a hall per guild) to the front of V2.

**Not building in v1**

1. **Guild wings.** The hurtful cut: eight guilds would each want a door of their own, and the ring's HQ and tech tree are begging for a 3D home. Too much surface for 80 hours; first in V2.
2. **The Storm in 3D.** The ring's auto-battler stays on the ring; the undercroft is a different fight (real-time, in person) and does not try to replace it.
3. **Trading.** Resources and pieces move only ring → ledger → Forge → wallet. No player-to-player trade, so the ledger bridge stays one-way and auditable.

*Standing non-goal: never move the grind into the World. If the hall ever asks a player to stand and click for resources, the ring has lost its reason to exist.*

**Top risk + fallback.** The ledger bridge: two servers (the ring's backend and the World's authoritative server) agreeing on one Depot without double-spends or a stuck craft. Mitigation: every spend is a single keyed call to the ring backend that debits and returns the new balance in one Firestore transaction (the path that already mints suits), and the World server never holds a balance of its own. Fallback: if the bridge is not stable by mid-week 2, V0 ships the Forge as **read-only plus a hand-in queue** (the server records the craft, an admin settles it within the hour through the existing dashboard), and the quest board, which only reads, ships as designed.

---
