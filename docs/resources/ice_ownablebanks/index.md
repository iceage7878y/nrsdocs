# Ice_ownablebanks

Turns bank locations into ownable, income-generating assets for **QBox** and **ESX Legacy**. An admin assigns ownership of a bank to a player or organization, which then passively earns a cut of every NPC deposit/withdrawal processed through it, can be staffed with cashiers/managers who handle deposits and capped withdrawals, can be hardened against crime with a paid "secured" upgrade, and can be targeted for a skill-check-driven robbery with police-online gating and cooldowns.

A companion player loan system lets any player borrow against a bank's balance — auto-approved under a threshold, otherwise queued for admin review — repaid via a scheduled installment collector, with defaults tracked and (optionally) blocking future loans.

Three independent NUI surfaces are included: an admin dashboard, a player banking app, and an owner/staff management app.

!!! note "No player-driven purchase flow"
    Despite the name, there's no in-game "buy this bank" mechanic — ownership is assigned and removed only by an admin through the panel.

## Features

- **Passive income** — a configurable % skim off every NPC transaction routed through an owned bank.
- **Staff roles** — cashiers and managers with configurable withdrawal caps.
- **Robbery minigame** — skill-check stages, police-online gating, randomized cooldowns, optional "secured" hardening.
- **Player loans** — auto-approval threshold, scheduled installment collection, default tracking.
- **Org ownership** — maps to `qbx_core` gangs on QBox, ESX jobs on ESX Legacy.

## Compatibility

| | Supported |
|---|---|
| Frameworks | QBox, ESX Legacy |
| Required | ox_lib, oxmysql |
| Optional | ox_target/qb-target, ox_inventory/qb-inventory, cd_dispatch/ps-dispatch/qb-dispatch |

## Next steps

- [Installation](installation.md)
- [Configuration](configuration.md)
- [Events & Exports](events-exports.md)
- [FAQ](faq.md)
