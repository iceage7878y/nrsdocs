# Installation

## Requirements

- ox_lib, oxmysql
- QBox **or** ESX Legacy
- Optional: ox_target/qb-target, ox_inventory/qb-inventory, a dispatch resource (cd_dispatch/ps-dispatch/qb-dispatch)

## Steps

1. Place `Ice_ownablebanks` in `resources/`.
2. **Load order matters** — framework detection only retries for ~10 seconds on boot:

    ```cfg
    ensure ox_lib
    ensure oxmysql
    # your framework here
    ensure Ice_ownablebanks
    ```

3. **Database.** No manual import needed — `applyDatabaseSchema()` runs `database.sql` automatically on `onResourceStart`. Confirm in console: `[Ice_ownablebanks] Database schema verified/applied`. Upgrades also auto-run `applyMigrations()` every boot (currently widens the `transactions.type` ENUM) — safe to leave running.
4. Edit `config.lua` — set real coordinates in `Config.Banks` for your map/interior.
5. Grant admin access:

    ```
    add_ace group.admin ownablebanks.admin allow
    add_principal identifier.license:xxxx group.admin
    ```

6. `/banks admin` opens the admin NUI once permissioned — use it to assign a bank's first owner (there's no in-game purchase flow).

## Verifying it works

1. As admin, run `/banks admin`, assign yourself (or a test character) as the owner of a bank.
2. Visit the bank and confirm the owner/staff management app opens and shows the balance.
3. Trigger a test NPC deposit/withdrawal (or your own `ReportNpcTransaction` integration) and confirm the bank's balance increases by the configured income %.
4. If testing robbery, ensure enough police are online to satisfy `Config.Robbery.minPoliceOnline`, then attempt a robbery and confirm the skill-check flow and payout.
