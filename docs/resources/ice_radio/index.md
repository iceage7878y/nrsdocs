# Ice_radio

Realistic handheld / mobile radio for FiveM with **ESX · QBox · QBCore** auto-detect and a **dual voice backend** (`pma-voice` or a bundled **standalone P25 IMBE** voice server). UX draws from tommy_radio, inpenel_radio, and Sonoran Radio — transceiver feel, trunked ZN/CH, scan, encryption, towers, a dispatch panel — without cloning any one of them.

## Features

- **Dual voice backend.** `Config.VoiceBackend` switches between `pma-voice`'s radio-channel API and a bundled standalone Node voice server with a P25 IMBE codec — channel, UI, and admin code don't change either way.
- **Conventional + trunked channels.** Flat channels and zoned trunked talkgroups (softkey ZONE/CH), multi-scan, patches, per-channel encryption, and job locks enforced server-side.
- **Swappable radio faces.** Ten PNG-based faces under `layouts/`, set globally or per job, with in-game switching via `/radiosettings`.
- **Admin & external CAD.** Dispatch zone view, spy/force-join, live audio/range tuning with no restart, and a REST + Socket.IO API for dispatch tools outside the FX process.

## Compatibility

| | Supported |
|---|---|
| Frameworks | ESX, QBox, QBCore |
| Voice backends | pma-voice (default), or the bundled standalone voice server (P25 IMBE) — advanced, see [Configuration](configuration.md#standalone-voice-companion) |
| Inventories | ox_inventory, or any framework's usable-item hook (ESX/QBCore/QBox examples included) |
| Optional dependencies | oxmysql (persistence), ox_lib / nrs_uipack (notifications) |

## Next steps

- [Installation](installation.md) — get it running.
- [Configuration](configuration.md) — voice, channels, range, UI, and everything else in `config.lua`.
- [Events & Exports](events-exports.md) — exports, integration events, and the REST/Socket.IO API.
- [FAQ](faq.md) — common questions.
