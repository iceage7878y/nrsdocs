# Installation

## Requirements

- [ox_lib](https://overextended.dev/ox_lib)
- [oxmysql](https://github.com/overextended/oxmysql) — only actually needed if [`Config.Leveling.enabled`](configuration.md#leveling) is `true`
- QBox **or** ESX Legacy
- ox_inventory **or** qb-inventory
- ox_target **or** qb-target (optional — falls back to a built-in E-to-interact prompt)

## Steps

1. Drop the `Ice_crafting` folder into your `resources` directory.
2. Import the database (see below), if you need leveling.
3. **Configure.** Open `config.lua` and set at minimum:
      - `Config.Stations` — the two shipped stations use placeholder coordinates; move them to real locations on your map.
      - `Config.Categories` / `Config.Recipes` — item names in `result` / `ingredients` must exist in your inventory system.
      - `Config.ItemImagePath` — defaults to ox_inventory's image folder; the NUI shows a plain letter tile if an image is missing, so this is safe to leave even if you don't run ox_inventory.
4. **Load order.** Add to `server.cfg`:

    ```cfg
    ensure ox_lib
    ensure oxmysql
    # your inventory + target resources here
    ensure Ice_crafting
    ```

5. Restart the resource (or the server).

### Database

If `Config.Leveling.enabled = true`, import `database.sql` — it creates the `ice_crafting_levels` table used to persist per-player, per-category XP/levels. Skip this if you disable leveling.

## Verifying it works

1. Walk up to one of the two default stations (Legion Square workbench, or the Sandy Shores chemistry station).
2. Interact with it — the crafting NUI should open with the station's categories.
3. Craft a `lockpick` (only needs `money`, no other items) to confirm the full begin → progress bar → finish → inventory grant flow works end to end.

Set `Config.Debug = true` in `config.lua` if something doesn't behave as expected — it prints extra validation output server-side.
