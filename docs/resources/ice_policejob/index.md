# Ice_Policejob

A full-featured, multi-framework police job built to run unmodified on **Qbox, QBCore, ESX (legacy + latest), or Legacy vRP1** from a single codebase, with auto-detection of framework, inventory, target, and dispatch resources via a `bridge/` layer.

Covers the complete on-duty officer loop: duty toggle, multi-department/rank-gated permissions, locker-room uniforms, tiered armory loadouts plus a shared armory stash, and a spawn-only vehicle spawner (no garage, by design). Restraint tools include soft/hard cuffs and zip ties, escort, put-in/out-of-vehicle, tackle, and self-service `/breakfree`. Investigative tooling spans fingerprinting, ID checks, player search, gunshot residue (GSR) detection, a realistic in-world evidence system (casings, blood, prints, bullet holes) with lab analysis and evidence lockers, plate reader/ANPR with stolen/BOLO cross-referencing, and weapon-serial tracking with citizen self-registration.

A persistent two-tier jail system (timed "prison" and indefinite "lockup") includes escape detection, mugshots, bed healing, and ankle monitors. Deployables (cones, barriers, worklights, spike strips, speed cameras), an in-vehicle radar, bodycams with Discord logging, and a lightweight built-in dispatch (10-codes, panic button, backup blips) round out the field tools. The centerpiece is a full React/TypeScript MDT covering citizen/vehicle/criminal lookups, warrants, incident reports, active units, BOLO/bulletin boards, and a rank-gated admin tab with audit logging.

!!! note "What this resource deliberately excludes"
    No garages, no housing, no phone integration. The vehicle spawner is spawn-only — pair it with [Ice_fleetkiosk](../ice_fleetkiosk/index.md) or your own garage if you need one.

## Features

- **Runs unmodified on 4 frameworks** — Qbox, QBCore, ESX, and Legacy vRP1.
- **~25 independently toggleable modules** — turn off anything you don't need; disabled modules remove their commands/events entirely.
- **Full evidence & investigation suite** — GSR, fingerprints, evidence collection/analysis, plate reader, weapon serials.
- **Two-tier jail** — timed prison + indefinite lockup, with escape detection and ankle monitors.
- **React/TypeScript MDT** — citizen/vehicle/criminal lookups, warrants, reports, BOLOs, rank-gated admin tab.
- **Deployables, radar, bodycams, built-in dispatch.**

## Compatibility

| | Supported |
|---|---|
| Frameworks | Qbox, QBCore, ESX (legacy + latest), Legacy vRP1 (auto-detected) |
| Inventory | ox_inventory (needed for several features), qb-inventory, framework-native |
| Target | ox_target, qb-target, or proximity + `[E]` fallback |
| Dispatch | ps-dispatch, cd_dispatch, linden_outlawalert, or built-in fallback |
| Optional | ox_lib, oxmysql (or mysql-async) |

## Next steps

- [Installation](installation.md)
- [Configuration](configuration.md)
- [Events & Exports](events-exports.md)
- [FAQ](faq.md)
