# Ice_tablet

A modular, in-game "tablet OS" for **QBox** and **ESX Legacy** — lock screen, dock, notifications, personalization, and a multi-window desktop shell. Ships with 7 core apps (Files, Documents, WiFi, Terminal, Browser, Calculator, Settings), a grade-gated Boss Menu (QBox + ESX), a QBox-only Gang Menu backed by `qbx_core`'s native gang system, and a full Boosting minigame (car-theft contracts with hotwire/VIN-scratch minigames, crew play, perks, and an optional police-dispatch hook).

Its standout feature is the **Custom App Integration SDK** — any resource can inject its own app into the dock/desktop with `exports.Ice_tablet:RegisterApp`, no core files touched. All server reads/writes for a custom app go through a validated NUI callback bridge, not direct client/database access. See [Custom Apps](custom-apps.md) and the companion `Ice_tablet_example_app` resource for a working reference.

## Features

- **Lock screen, dock, notifications, personalization** — a real device shell, not just a menu.
- **7 built-in apps**, each independently toggleable.
- **Boss Menu** (hire/fire/promote) on both QBox and ESX; **Gang Menu** on QBox only.
- **Boosting minigame** — car-theft contracts, hotwire/VIN-scratch skill checks, crew play, perks, and optional police dispatch alerts.
- **Custom App SDK** — third-party apps register without editing any core file.

## Compatibility

| | Supported |
|---|---|
| Frameworks | QBox, ESX Legacy |
| Required | oxmysql, ox_lib |
| Inventory | ox_inventory (fully implemented); qb-inventory and others are stubbed/TODO |
| Optional | qbx_vehiclekeys (real keys on hotwire), a police-job resource for Boosting dispatch (defaults to `ice-policejob` / [Ice_Policejob](../ice_policejob/index.md)) |

## Next steps

- [Installation](installation.md)
- [Configuration](configuration.md)
- [Events & Exports](events-exports.md)
- [Custom Apps](custom-apps.md)
- [FAQ](faq.md)
