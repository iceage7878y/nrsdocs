# Installation

## Requirements

- oxmysql, ox_lib (must start before Ice_tablet — ox_lib also powers Boosting's world prompts)
- QBox **or** ESX Legacy
- ox_inventory (fully implemented) — other inventories (qb-inventory, origen_inventory, quasar_inventory, codem-inventory, tgiann-inventory) have bridge stub files with `TODO`s that need filling in
- Optional: `qbx_vehiclekeys` (real vehicle keys on successful hotwire), a police-job resource for Boosting dispatch alerts (defaults to `ice-policejob`)

## Steps

1. Copy `Ice_tablet` into `resources/`.
2. **Items.** Add `ice_tablet` and `ice_usb` to your inventory. For ox_inventory, set `client = { event = 'ice_tablet:useDevice' }` on the tablet item and `'ice_tablet:useUsb'` on the USB item — the exact snippet is in `Items.txt`. Other inventories need the `TODO`s in `bridge/inventory/<name>.lua` filled in first.
3. `server.cfg` load order:

    ```cfg
    ensure oxmysql
    ensure ox_lib
    ensure Ice_tablet
    ensure Ice_tablet_example_app   # optional — reference implementation
    ```

4. **Database.** No manual import needed — `server/database.lua` auto-runs every `CREATE TABLE IF NOT EXISTS`/`ALTER TABLE` in `database.sql` on first start.
5. Edit `config.lua` for framework/inventory choice, WiFi networks, browser sites, terminal commands, and app access rules; edit `config/boosting.lua` for contract coordinates/tuning.
6. Set `Config.Locale` (`'en'` or `'da'`) and consider setting `Config.Debug = false` — it defaults to `true` (verbose chat/console logging).
7. If you plan to build custom apps against the SDK, `ensure Ice_tablet_example_app` after `Ice_tablet` as a working reference.
8. Grant admin commands as needed: `add_ace group.admin command.stopboosts allow`, `add_ace group.admin command.fixboostingdb allow`.

!!! warning "Load order isn't enforced by the manifest"
    Custom apps only work if `ensure Ice_tablet` precedes them in `server.cfg` — there's no `dependency` check, so getting the order wrong fails silently (or with an export error) rather than at startup.

## Verifying it works

1. Give yourself an `ice_tablet` item and use it — confirm the lock screen and dock appear.
2. Open a couple of core apps (Files, Browser, Calculator) to confirm the desktop shell works.
3. If your job/grade matches `Config.BossJobs`, confirm the Boss Menu appears.
4. If `Ice_tablet_example_app` is running, run `/opennotecounter` and confirm the "Note Counter" app opens and increments.
