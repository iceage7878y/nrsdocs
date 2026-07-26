# FAQ

**A leader can't `/leave` the faction.**
By design — a sole leader must promote a co-leader first. Leaders can hold up to 3 seats (`maxHolders = 3`); once at least 2 exist, either can leave.

**A member with `kick` permission can't kick a leader.**
Correct — only another leader can kick a leader, regardless of individual permission grants.

**Promoting a 4th member to Leader fails.**
Leader rank is capped at `maxHolders = 3` server-side; the 4th promotion is rejected.

**Standing in a territory zone isn't capturing it.**
Presence alone doesn't earn points — a member needs to trigger recent zone activity (the `/workterritory` keybind). If another faction is also present, the zone is contested and neither side progresses.

**FPS drops near territory zones.**
Each zone renders its own DUI through `MapZones`. With ~85 zones configured by default, trim `Config.Factions.territory.zones` for weaker client hardware.

**Do I need Ice_tablet installed?**
No — `/factionsadmin` is fully standalone. Ice_tablet is only required for the player-facing faction app; without it, players just won't have an in-game UI to manage their own faction (admins can still do everything via the panel).

**LB Phone SMS alerts aren't sending.**
The LB Phone integration in `server/lbphone.lua` is unverified against a real installation — double-check `sendUnknownSms` matches your lb-phone version's export signature.
