# Getting Started

General setup notes that apply across most Next Resource Studio resources. Resource-specific steps live under [Resources](resources/index.md).

## Requirements

- A FiveM server on a recent artifact build.
- [ox_lib](https://overextended.dev/ox_lib) — used by most resources for locales, callbacks, and UI helpers.
- [oxmysql](https://github.com/overextended/oxmysql) — required by any resource that persists data (leveling, stats, etc).
- One supported framework: **QBox** or **ESX Legacy**.
- One supported inventory: **ox_inventory** or **qb-inventory**.
- One supported targeting system: **ox_target** or **qb-target** (a built-in fallback interaction is used otherwise).

## Installation pattern

1. Download the resource and drop it into your `resources` folder.
2. Import any `database.sql` the resource ships with, if it uses persistent data.
3. Open `config.lua` and adjust it to your server (coordinates, item names, job names).
4. Add `ensure <resource-name>` to `server.cfg`, **after** `ox_lib`, `oxmysql`, and your inventory/target resources.
5. Restart the resource or restart the server.

## Framework / inventory / target detection

Most resources auto-detect your framework, inventory, and targeting system at boot via a `bridge/` folder, so no manual wiring is usually needed. If detection ever picks the wrong one, it can be pinned explicitly in that resource's `config.lua`.

## Locales

Resources that support multiple languages keep translations under `locales/`. Set the active locale in `config.lua`; contributions for new languages are welcome via pull request.
