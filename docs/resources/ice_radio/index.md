# Ice_radio

Realistic handheld/mobile radio for FiveM with auto-detected **ESX, QBox, and QBCore** support and a **dual voice backend**: ride on top of `pma-voice`'s radio-channel API, or run fully standalone on a bundled Node.js voice server with a P25 IMBE-style vocoder — channel, UI, and admin code don't change either way. UX draws from tommy_radio, inpenel_radio, and Sonoran Radio — transceiver feel, trunked ZN/CH, scan, encryption, towers, a dispatch panel — without cloning any one of them.

Covers conventional and trunked (zone/talkgroup) channels, patches, multi-channel scanning, encrypted channels gated by a key item, panic/priority alerting, primary + secondary channel slots with per-channel volume, realistic range falloff with repeater towers and dead zones, optional job-gated GPS, battery drain/replacement, ten swappable radio face layouts, a vehicle head unit, an admin/dispatch panel (spy, force-join, live tuning with no restart), and a REST + Socket.IO bridge for external CAD/dispatch tools.

## Features

- **Dual voice backend.** `Config.VoiceBackend` switches between `pma-voice`'s radio-channel API and a bundled standalone Node voice server with a P25 IMBE codec.
- **Conventional + trunked channels** — flat channels and zoned trunked talkgroups (softkey ZONE/CH), multi-scan, patches, per-channel encryption, and job locks enforced server-side.
- **Realistic range** — falloff, repeater towers, dead zones (with interior degradation), and optional job-gated GPS.
- **Ten swappable radio faces** under `layouts/`, set globally or per job, with in-game switching via `/radiosettings`.
- **Admin & external CAD** — dispatch zone view, spy/force-join, live audio/range tuning with no restart, and a REST + Socket.IO API for dispatch tools outside the FX process.

## Compatibility

| | Supported |
|---|---|
| Frameworks | ESX, QBox, QBCore (auto-detected) |
| Voice backend | `pma-voice` (default), or the bundled standalone Node voice server — advanced, see [Configuration](configuration.md#standalone-voice) |
| Inventory | ox_inventory, or any framework's usable-item hook (ESX/QBCore/QBox examples included) |
| Optional | oxmysql (persistence), ox_lib / nrs_uipack (notifications) |

## Next steps

- [Installation](installation.md)
- [Configuration](configuration.md)
- [Events & Exports](events-exports.md)
- [FAQ](faq.md)
