# ice_factions

A standalone, database-backed gang/organization system for **QBox** and **ESX Legacy**. Factions get tiered ranks with a granular permission matrix, up to 3 co-leaders, and a shared faction bank — all enforced server-side.

Factions can capture map zones through a server-authoritative, points-based territory system (rendered via the [`MapZones`](../index.md) resource) and earn passive income from owned territory. Two UI surfaces are included: a player-facing tablet app that plugs into [Ice_tablet](../ice_tablet/index.md)'s Custom App SDK, and a self-contained `/factionsadmin` staff panel that works with or without the tablet installed.

## Features

- **Tiered ranks & permissions.** Granular permission matrix (`invite`, `kick`, `promote`, `manage_bank`, etc.), up to 3 leader slots per faction.
- **Shared faction bank**, with deposit/withdraw/history.
- **Territory capture.** Points-based, server-authoritative zone control rendered through `MapZones`, with passive income for owned zones.
- **Optional Qbox gang sync** — mirrors faction rank/membership onto a linked `qbx_core` gang.
- **Discord webhooks** and **LB Phone SMS alerts** for faction/territory events.
- **Works with or without Ice_tablet** — the admin panel (`/factionsadmin`) is fully standalone.

## Compatibility

| | Supported |
|---|---|
| Frameworks | QBox, ESX Legacy |
| Hard dependencies | oxmysql, ox_lib, **MapZones** |
| Optional | Ice_tablet (player app), qbx_core gang sync, lb-phone (SMS alerts), Discord webhooks |

## Next steps

- [Installation](installation.md)
- [Configuration](configuration.md)
- [Events & Exports](events-exports.md)
- [FAQ](faq.md)
