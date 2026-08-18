# Ice_radio

<<<<<<< HEAD
Realistic handheld / mobile radio for FiveM with **ESX · QBox · QBCore** auto-detect and a **dual voice backend** (`pma-voice` or a bundled **standalone P25 IMBE** voice server). UX draws from tommy_radio, inpenel_radio, and Sonoran Radio — transceiver feel, trunked ZN/CH, scan, encryption, towers, a dispatch panel — without cloning any one of them.

## Features

- **Dual voice backend.** `Config.VoiceBackend` switches between `pma-voice`'s radio-channel API and a bundled standalone Node voice server with a P25 IMBE codec — channel, UI, and admin code don't change either way.
- **Conventional + trunked channels.** Flat channels and zoned trunked talkgroups (softkey ZONE/CH), multi-scan, patches, per-channel encryption, and job locks enforced server-side.
- **Swappable radio faces.** Ten PNG-based faces under `layouts/`, set globally or per job, with in-game switching via `/radiosettings`.
- **Admin & external CAD.** Dispatch zone view, spy/force-join, live audio/range tuning with no restart, and a REST + Socket.IO API for dispatch tools outside the FX process.
=======
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
>>>>>>> parent of 222bff7 (Update)

## Compatibility

| | Supported |
|---|---|
<<<<<<< HEAD
| Frameworks | ESX, QBox, QBCore |
| Voice backends | pma-voice (default), or the bundled standalone voice server (P25 IMBE) — advanced, see [Configuration](configuration.md#standalone-voice-companion) |
| Inventories | ox_inventory, or any framework's usable-item hook (ESX/QBCore/QBox examples included) |
| Optional dependencies | oxmysql (persistence), ox_lib / nrs_uipack (notifications) |
=======
| Frameworks | ESX, QBox, QBCore (auto-detected), or standalone |
| Voice backend | `pma-voice`, or bundled standalone Node.js service |
| Inventory | ox_inventory (preferred), ESX/QBCore native item counts |
| Persistence | oxmysql (optional — battery/presets/encryption keys) |
>>>>>>> parent of 222bff7 (Update)

## Next steps

- [Installation](installation.md) — get it running.
- [Configuration](configuration.md) — voice, channels, range, UI, and everything else in `config.lua`.
- [Events & Exports](events-exports.md) — exports, integration events, and the REST/Socket.IO API.
- [FAQ](faq.md) — common questions.
