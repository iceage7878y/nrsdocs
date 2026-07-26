# Ice_fleetkiosk

A standalone police vehicle fleet/garage kiosk styled after a real in-car MDT laptop terminal — a bordered, "Windows-style" application (titlebar, menu bar, toolbar, status bar) rather than a glossy modern UI. Officers walk up to a laptop prop, interact with it, and get a full terminal to browse/filter department vehicles by division, deploy a vehicle, and manage a single "active" unit (return/store/delete).

Supports multiple agencies (LSPD/LSSD/CHP-style presets) each with their own color theme and logo, live officer profile/callsign display, favorites/recents/pinned vehicles, an in-game admin panel (`/fleetadmin`) for managing kiosks and vehicles without touching config, and a 3D DUI-projected screen on the laptop prop.

## Features

- **Terminal-style UI** — deliberately utilitarian, not a modern glossy menu.
- **Single active-vehicle rule** — one deployed unit per officer at a time (no teleport-to-vehicle by design).
- **Multi-agency theming** — per-department color/logo presets.
- **In-game admin panel** (`/fleetadmin`) — edit kiosks and vehicles live, no config redeploy needed.
- **Auto-generated plates** — per-station prefix + sequential number.
- Works fully **standalone** — no hard dependency on a framework or police job resource.

## Compatibility

| | Supported |
|---|---|
| Frameworks (optional) | ESX, QBCore, Qbox — only used in `framework` permission mode |
| Targeting (optional) | ox_target, qb-target, or a built-in `[E]` prompt |
| Optional integrations | `qbx_vehiclekeys` (auto key-grant), [Ice_Policejob](../ice_policejob/index.md) (real MDT callsign via its `GetCallsign` export) |

## Next steps

- [Installation](installation.md)
- [Configuration](configuration.md)
- [Events & Exports](events-exports.md)
- [FAQ](faq.md)
