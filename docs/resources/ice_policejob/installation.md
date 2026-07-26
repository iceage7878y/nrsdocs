# Installation

## Requirements

- One framework: Qbox, QBCore, ESX, or Legacy vRP1 (auto-detected)
- Optional: ox_inventory (needed for armory stash, weapon serials/registration, evidence metadata items), ox_target/qb-target, a dispatch resource, ox_lib, oxmysql (or mysql-async via `Config.MySQL`)

## Steps

1. Copy the folder into `resources/`.
2. **Database.** Import `install.sql` (adjust the `police_` table prefix first if it collides with an existing schema — all tables use `CREATE TABLE IF NOT EXISTS`, safe to re-run).
3. Add to `server.cfg` **after** the framework, inventory, target, and (optionally) dispatch resources:

    ```cfg
    ensure oxmysql
    # your framework, inventory, target, dispatch here
    ensure ice-policejob
    ```

4. **Items.** Add the custom items from `items.txt` (root, mirrored in `setup/items.txt`) to your inventory: `id_card`, `handcuffs`, `zipties`, `handcuffkey`, `fingerprint_kit`, `plate_reader`, `evidence_bag`, the five collected-evidence items, `gsr_kit`/`gsr_cloth`, `ankle_monitor`/`powersaw`, breathalyzer/NVG/thermal/shields, and deployables. Weapon items already exist in ox_inventory's default `weapons.lua`.

    !!! note "Icons aren't included"
        `setup/images/` is intentionally empty — source your own item icons or reuse ox_inventory's defaults.

5. Edit `config.lua` — departments, stations, loadouts, uniforms, webhooks, jail, etc.
6. Edit `data/penalcode.json` to match your server's charges (or edit live from the MDT admin tab, then `/reloadpenalcode`).
7. **Uniforms are decoupled from any specific clothing resource** — hook `ice-policejob:client:setUniform` (in `client/main.lua`) into whatever clothing system you run (e.g. `illenium-appearance`).
8. The MDT ships pre-built in `html/` — no Node.js needed to run as-is. Only build `web/` (`npm install && npm run build`) if customizing the UI; this overwrites `html/`.

## Verifying it works

1. Go on duty as an officer and confirm the locker room / uniform flow works.
2. Draw a loadout from the armory and confirm tier-gated items match your grade's permissions.
3. Cuff and escort a test player, then confirm `/breakfree` works as expected for them.
4. Open the MDT and run a citizen/vehicle lookup.
5. If evidence/GSR is enabled, fire a weapon, collect a casing/GSR sample, and confirm lab analysis works.
6. If jail is enabled, jail a test player and confirm the timer, mugshot, and release flow.
