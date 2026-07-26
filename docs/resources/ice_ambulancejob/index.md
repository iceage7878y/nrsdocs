# Ice_ambulancejob

A multi-framework EMS/ambulance job with a per-bodypart bleed system, a full death screen, check-in/duty flow with callsigns and units, built-in medical dispatch, a garage and equipment locker, and a Vue 3 medical MDT. It auto-detects **Qbox, QBCore, ESX Legacy, or Legacy vRP1** at startup.

Optional treatment realism layers in on top: trauma kit sub-treatments with skill checks, CPR, defibrillator revive-chance decay, morphine overdose, billing, payroll, shift reports, and Discord webhooks. Every module — duty, checkin, payroll, bleed, death screen, treatment, stretcher, garage, locker, dispatch, MDT, CPR, public heal beds, skeletal damage, medbag — can be toggled off independently.

## Features

- **Per-bodypart bleed system** with staged HP drain, blood loss, and eventual collapse.
- **Server-authoritative death/revive loop** — replaces the framework's default ambulance job entirely.
- **Treatment realism**: trauma kit skill checks, tourniquets (stop bleeding but impair the limb), CPR (delays but doesn't revive), defibrillator with time-based revive-chance decay.
- **Medical MDT** (Vue 3) with a live map, dispatch calls, and journal.
- **Built-in dispatch**, with optional cross-department alerts to [Ice_Policejob](../ice_policejob/index.md) on gunshot calls.
- **Style presets** (`realistic` vs `contentrp`) that retune death/bleed/treatment harshness in one setting.

## Compatibility

| | Supported |
|---|---|
| Frameworks | Qbox, QBCore, ESX Legacy, Legacy vRP1 (auto-detected, in that priority order) |
| Inventory | ox_inventory, qb-inventory, ESX inventory, vRP inventory |
| Target | ox_target, qb-target, keybind/command fallback |
| Required | oxmysql |
| Recommended | ox_lib, rpemotes-reborn 2.1.2+ |
| Optional | Ice_Policejob (cross-department dispatch), qb-management/qb-banking (billing) |

## Next steps

- [Installation](installation.md)
- [Configuration](configuration.md)
- [Events & Exports](events-exports.md)
- [FAQ](faq.md)
