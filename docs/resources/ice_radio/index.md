# Ice_radio

A realistic handheld/mobile radio system with auto-detected **ESX, QBox, and QBCore** support and a **dual voice backend**: ride on top of `pma-voice`'s radio-channel APIs, or run fully standalone using a bundled Node.js companion service with a P25 IMBE-style vocoder.

Delivers conventional and trunked (zone/channel) radio traffic, channel patches, multi-channel scanning, encrypted channels gated by a key item, panic/priority alerting, primary + secondary channel slots with per-channel volume, realistic range falloff with repeater towers and dead zones, optional GPS tracking, battery drain/replacement, a full handheld NUI (frequency/NAC/talker list/signal bars) plus a corner HUD and vehicle head-unit, ten swappable radio face layouts, an admin/dispatch panel (spy, force-join, live tuning), and a REST + Socket.IO bridge for external CAD/dispatch tools.

## Features

- **Dual voice backend** — `pma-voice` integration, or a standalone Node.js voice service (no pma-voice required).
- **Conventional & trunked channels**, with patches and multi-channel scanning.
- **Encrypted channels** gated by a key item.
- **Realistic range** — falloff, repeater towers, dead zones (with interior degradation).
- **Battery economy** and **GPS tracking** (job-gated).
- **10 swappable radio face layouts**, selectable globally or per job.
- **Admin/dispatch panel** — spy, force-join, live tuning of settings without a restart.
- **REST + Socket.IO API** for external CAD/dispatch integration.

## Compatibility

| | Supported |
|---|---|
| Frameworks | ESX, QBox, QBCore (auto-detected), or standalone |
| Voice backend | `pma-voice`, or bundled standalone Node.js service |
| Inventory | ox_inventory (preferred), ESX/QBCore native item counts |
| Persistence | oxmysql (optional — battery/presets/encryption keys) |

## Next steps

- [Installation](installation.md)
- [Configuration](configuration.md)
- [Events & Exports](events-exports.md)
- [FAQ](faq.md)
