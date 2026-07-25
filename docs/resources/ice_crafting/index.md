# Ice_crafting

Prop-based crafting stations for **QBox** and **ESX Legacy**, with a dark/minimal NUI. Players interact with a station prop (via `ox_target`, `qb-target`, or a built-in fallback) to open the crafting panel: pick a category, pick a recipe, craft.

## Features

- **Stations are props in the world.** `Config.Stations` can spawn its own prop at a coordinate (`spawnProp = true`) or just add an interaction zone to an existing map prop.
- **Server-authoritative crafting.** The client only asks to *begin* a craft; the server times it, and only consumes ingredients / grants the result when the client reports back — re-validating job, required item, level, and ingredients at that point too.
- **Optional per-category leveling.** XP per craft, `xp / xpPerLevel` = level, gates recipes via `requiredLevel`. Persisted in `ice_crafting_levels` (see [`database.sql`](installation.md#database)).
- **Dual framework / inventory / target support** via the `bridge/` folder, auto-detected at boot (or pinned in `config.lua`).

## Compatibility

| | Supported |
|---|---|
| Frameworks | QBox, ESX Legacy |
| Inventories | ox_inventory, qb-inventory |
| Targeting | ox_target, qb-target, built-in fallback |
| Dependencies | ox_lib, oxmysql |

## Next steps

- [Installation](installation.md) — get it running.
- [Configuration](configuration.md) — stations, categories, recipes, leveling.
- [Events & Exports](events-exports.md) — the NUI callback bridge, for anyone extending it.
- [FAQ](faq.md) — common questions.
