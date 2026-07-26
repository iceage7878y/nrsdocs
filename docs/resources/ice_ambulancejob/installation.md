# Installation

## Requirements

- oxmysql
- ox_lib (recommended — menus, progress bars, skill checks, callbacks)
- One framework: Qbox, QBCore, ESX Legacy, or Legacy vRP1 (auto-detected)
- Optional: rpemotes-reborn 2.1.2+ (falls back to native animations if absent)
- Node.js 18+ — **only** needed to build the NUI, not on the running server

## Steps

1. Copy `Ice_ambulancejob` into `resources/`. `fxmanifest.lua` declares no hard `dependency` lines — all framework/inventory/target detection happens at runtime, so load order relative to the framework isn't strict, but should still come after it and after `oxmysql`/`ox_lib`.

    ```cfg
    ensure oxmysql
    ensure ox_lib
    # your framework here
    ensure rpemotes-reborn   # optional
    ensure Ice_ambulancejob
    ```

2. **Database.** Run `sql/install.sql`, or skip it — `server/database.lua` auto-creates the same tables with `CREATE TABLE IF NOT EXISTS` on first boot.
3. **Items.** Add the 12 item definitions from `items.txt` to your inventory: `bandage`, `pressure_bandage`, `tourniquet`, `trauma_kit`, `gauze`, `suture_kit`, `chest_seal`, `splint`, `defibrillator`, `morphine`, `blood_pressure_cuff`, `stretcher`, `medbag` (the last two carry a `client.event` hook).
4. **Job.** Create the `ambulance` job (grades 0–4) in your framework, matching `Config.Job.grades` — the internal job name must exactly equal `Config.Job.name`.
5. **Disable the stock EMS job** (`qb-ambulancejob`/`esx_ambulancejob`), including its death/respawn loop — this resource owns death handling entirely. Running both causes conflicting revive/respawn behavior.
6. Adjust station coordinates in `config/stations.lua` for your map.
7. **Build the NUI** before first start — `ui_page` points at `html/dist/index.html`, which doesn't exist until built:

    ```bash
    cd html
    npm install
    npm run build
    ```

    Rebuild after any UI change.
8. Optional: body-part sprites in `html/images/body/` (copied to `dist` on build), MDT live-map tiles at `html/maps/atlas/{z}/{x}/{y}.jpg` (FiveM's CEF often blocks the CDN fallback, so self-hosting tiles is more reliable).
9. **Legacy vRP1**: set `Config.Framework = 'vrp'` (or leave `'auto'`) and map vRP group names to grade levels in `Config.VRP.groups` so they match `Config.Job.grades` keys.

## Verifying it works

1. Set your job to `ambulance` and go on duty.
2. Get injured, and confirm the bleed system and death screen trigger as expected.
3. Have another EMS player revive you with a defibrillator, then treat remaining bleeds with a trauma kit.
4. Open the MDT (default keybind `F7`) and confirm dispatch calls appear.
