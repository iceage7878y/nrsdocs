# FAQ

**A grade with the right permission flag on a lower rank doesn't inherit at higher ranks.**
Expected — permissions are checked against the officer's *exact* current grade, not inherited from lower grades. Every grade that should have a flag (`armoryTier2`, `manageWarrants`, `mdtAdmin`) needs it listed explicitly.

**Turning off `duty` doesn't stop officers from being "on duty."**
Correct, by design — `Config.Modules.duty = false` removes the ability to clock in/out; anyone with a matching job is simply always on duty, and station duty points disappear.

**The "Jail" target option is missing.**
Check `Config.Modules.cuffing` — jailing depends on the cuffed-state check, so it's silently unavailable if cuffing is disabled.

**`createBOLO`/`addCriminalRecord` events aren't doing anything.**
These require `Config.Modules.mdt = true`, since they write to MDT-owned tables.

**A player's jail sentence didn't shrink after a server restart.**
Intentional — jail time only ticks while the player is online ("time served while online"), so restarts and combat-logging never shorten a sentence.

**I get a MySQL error about a reserved word on the jail table.**
The `police_jail.escaped` column is named `is_escaped` because `ESCAPED` is a reserved word in MySQL/MariaDB. If you created the table before this fix, there's an inline `ALTER TABLE` migration comment in the SQL file to bring it up to date.

**Running this on Legacy vRP1 and something doesn't match.**
vRP is structurally different — jobs are vRP groups, grades are flat unless a department defines `vrpGrades`, and item use becomes `/`-prefixed chat commands. Every vRP bridge call is `pcall`-wrapped to fail safe since function names vary by fork; verify your fork's `Proxy.lua` functions before relying on this in production.

**The custom battle-cuffs prop in `stream/` isn't showing up.**
It ships but isn't wired in — the config currently references the vanilla `p_cs_cuffs_02` prop. Swapping to the custom one requires adding a matching `.ytyp` and a `DLC_ITYP_REQUEST` data_file entry yourself.

**Sounds/mugshots aren't playing/showing.**
Several assets (e.g. the cuffing sound) reference a file path the operator must supply under `web/public/sounds/`, then rebuild the NUI (`npm run build`) for it to take effect.

**Where's the garage?**
There isn't one, by design — this resource is spawn-only. Pair it with [Ice_fleetkiosk](../ice_fleetkiosk/index.md) or your own garage system.
