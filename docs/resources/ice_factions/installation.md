# Installation

## Requirements

- oxmysql
- ox_lib
- **[MapZones](../index.md)** — hard dependency, renders territory capture zones
- QBox **or** ESX Legacy
- Optional: [Ice_tablet](../ice_tablet/index.md) (player-facing app), `qbx_core` (gang sync), `lb-phone` (SMS alerts)

## Steps

1. Copy `ice_factions` into `resources/`.
2. **Load order matters.** `MapZones` must start *before* `ice_factions` — it's a hard dependency for territory rendering. If you're also running Ice_tablet, start it before `ice_factions` too so the player app registers correctly.

    ```cfg
    ensure ox_lib
    ensure oxmysql
    ensure MapZones
    ensure Ice_tablet      # optional — player-facing faction app
    ensure ice_factions
    ```

3. **Database.** No manual import needed — `server/database.lua` runs `database.sql` automatically on first start (idempotent `CREATE TABLE IF NOT EXISTS`, plus safe `ALTER TABLE` migrations for upgrades).
4. Edit `config/factions.lua` — at minimum review `Config.Factions.permissions`, `defaultRanks`, `maxMembers`, and the ~85 `territory.zones` entries if you want to trim or retarget them for your map.
5. Grant the admin panel ACE:

    ```
    add_ace group.admin command.factionsadmin allow
    ```

6. `/factionsadmin` works immediately, standalone — no tablet item required. The player-facing app only appears if Ice_tablet is installed and running.

## Verifying it works

1. As an admin, run `/factionsadmin` and create a test faction.
2. Add yourself as a member and confirm rank permissions apply (e.g. a `Recruit` can't invite/kick).
3. If Ice_tablet is installed, open it and confirm the faction app shows your membership, bank, and roster.
4. Walk into a configured territory zone and hold the capture prompt (`/workterritory` keybind) — confirm a `MapZones` blip/overlay reflects progress.
