# FAQ

**The kiosk UI shows broken images / no sound.**
Expected out of the box — the resource ships with zero binary assets by design. Drop your own into `html/images/vehicles/`, `html/images/logos/`, and `html/sounds/`.

**Standalone permission mode isn't gating anything.**
It requires you to call `SetPlayerGrade`/`SetPlayerPermission`/`SetPlayerProfile` yourself from your own login flow — nothing is wired automatically in that mode.

**Officers can teleport to their vehicle — is that expected?**
No — there's no teleport-to-vehicle action in this resource; officers must walk or drive to their unit. If you're seeing teleport behavior, it's coming from another resource.

**A vehicle spawns without keys / the officer can't drive it.**
Fleet vehicles are ownerless job spawns. If `qbx_vehiclekeys` is running, the server auto-unlocks and grants keys; without it, make sure your own vehicle-keys resource handles ownerless spawns.

**Plates repeat after a restart.**
Plates are only unique in-memory per session (`UsedPlates`) — they are not persisted across restarts.

**The MDT callsign shows a placeholder (`1L-1`).**
Set `Config.PolicejobResource` to `'auto'` (or your police resource's name) with [Ice_Policejob](../ice_policejob/index.md) installed — the kiosk pulls a real callsign via its `GetCallsign` export when detected.

**Editing `config.lua` doesn't reflect in-game.**
Check whether `/fleetadmin` was used previously — in-game admin edits persist to `fleet_kiosk_kiosks.json`/`fleet_kiosk_vehicles.json` and are layered on top of `config.lua`, so they can shadow your file changes until also edited (or deleted) via the admin panel.

**`npm run build` fails resolving `/src/main.ts`.**
A known Vite quirk inside folder paths containing brackets (`[Scripts]`, `[Police]`). Build outside a bracketed path, then copy `html/assets` + `html/index.html` back in.
