# FAQ

**"You must be on duty" even though I'm clocked in.**
`Config.Job.name` must exactly equal your framework's *internal* job name, not its display label. A mismatch makes every duty/MDT/treatment check silently fail. Compare with `/emsdebug`.

**A grade shows max trauma-fail chance and no permissions.**
Grade keys in `Config.Job.grades` must be numeric and match the framework's actual grade levels — any grade without an explicit entry falls back to the harshest defaults.

**The UI won't load / blank screen on open.**
`ui_page` points at `html/dist/index.html`. If you haven't run `npm install && npm run build` inside `html/`, that file doesn't exist yet.

**Both my old EMS job and this one are fighting over death/revive.**
Disable the framework's stock ambulance job (`qb-ambulancejob`/`esx_ambulancejob`) including its death/respawn loop — this resource fully owns the death loop.

**A tourniquet stopped the bleed but the leg feels wrong.**
Intentional — tourniquets stop bleeding but impair the limb (movement penalty / disabled sprint on a leg, aim sway on an arm) until a medic removes it.

**CPR isn't reviving my patient.**
CPR never revives by itself — it only pushes back the "time down" counter, slowing defibrillator revive-chance decay and delaying permanent death (if enabled).

**Billing is on but the money just disappears.**
`Config.Billing.societyAccount` is `nil` by default — set a real destination account before enabling billing, otherwise charged funds have nowhere to go.

**Stretcher/vehicle carry looks off in non-ambulance vehicles.**
Only the `ambulance` model has a tuned `vehicleOffsets` entry; other vehicles fall back to a rough `defaultVehicleOffset` and may need manual per-model tuning.

**Players can't see their own vitals.**
By default `selfVitalsRequireItem = true` — non-EMS players need a blood pressure cuff to see their own blood loss.
