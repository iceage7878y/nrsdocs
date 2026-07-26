# FAQ

**My custom app doesn't show up / throws an export error.**
`Ice_tablet` must `ensure` before your resource in `server.cfg` — there's no manifest dependency check, only load order, so this fails silently or with an export error rather than at startup.

**My custom app's script/style 404s.**
`scriptUrl`/`styleUrl` must also be listed in *your own* resource's `fxmanifest.lua` `files{}` — a very common miss.

**`ALTER TABLE` errors on boot related to Boosting.**
Run `/fixboostingdb` — it retro-adds columns (`vehicle_net_id`, `vehicle_plate`, `vehicle_model`) that silently failed to auto-add if your DB user lacks `ALTER` rights.

**A Boosting contract is stuck and won't complete.**
If the stolen vehicle despawns before delivery, the contract can't finish and there's no automatic recovery — clear it manually from the `ice_boosting_contracts` table.

**Gang Menu doesn't work on ESX.**
Expected — it's QBox-only, backed by `qbx_core`'s native gang system. ESX Legacy has no equivalent, so the app shows "unsupported" there.

**Can a hotwired vehicle be locked with real keys?**
Only if `qbx_vehiclekeys` is running — it's an optional integration, not required.

**Should I leave `Config.Debug = true`?**
No — it ships `true` by default for development visibility (verbose chat/console logging) and should be set `false` for production.

**A crew member's Boosting HUD looked broken/unreadable.**
Fixed in current versions via a static `data-theme="dark"` default — previously, a crew member who joined a contract without ever having opened their own tablet saw an unstyled HUD because theme CSS variables only resolved on first tablet open.
