# Configuration

All configuration lives under `config/`.

## Framework & detection

```lua title="config/*.lua"
Config.Framework = 'auto'   -- detection order: qbox -> qbcore -> esx -> vrp
Config.Inventory = 'auto'
Config.Target = 'auto'
Config.UseOxLib = 'auto'
```

## Job & grades

```lua title="config/job.lua"
Config.Job = {
    name = 'ambulance',
    callsignPrefix = 'M',
    grades = {
        [0] = { label = 'Trainee', salary = 250, traumaFailChance = 0.35 },
        -- ...
        [4] = { label = 'Chief', salary = 900, traumaFailChance = 0.05, mdtAdmin = true },
    },
}
```

Grade flags gate permissions: `morphineAccess`, `seeAllJournals`, `supervisor`, `mdtAdmin`. `traumaFailChance` scales down with rank — higher grades fail trauma-kit skill checks less often.

## Bleed & death

```lua title="config/bleed.lua"
Config.Bleed = {
    stageDrain = { 1, 2, 5, 9 },          -- HP/tick per bleed stage
    stageBloodLoss = { 0.2, 0.6, 1.5, 3.0 }, -- %/tick per stage
    stage4CollapseSec = 45,
    bloodLossCollapse = 85,
}

Config.Death = {
    respawnCooldownSec = 300,
    noEmsRespawnSec = 120,
    permanentDeath = { enabled = false, seconds = 1200 },
    reviveHealthPct = 0.35,
    hospitalReviveHealthPct = 1.0,
}
```

!!! warning "Permanent death is off by default"
    When `permanentDeath.enabled = true`, revival becomes impossible once a player has been down longer than `seconds`.

## Treatment

```lua title="config/treatment.lua"
Config.Treatment = {
    defib = { baseChance = 0.95, decayPerMinute = 0.10, minChance = 0.25 },
    civilian = { bandage = true, pressure = false, tourniquet = false, traumaKit = false, defib = false },
}
```

Defibrillator revive odds decay the longer a patient stays down — CPR doesn't revive on its own, but resets the "time down" clock, slowing that decay. `civilian` gates which treatments non-EMS players may perform on themselves/others.

## Dispatch & billing

```lua title="config/dispatch.lua"
Config.Dispatch = { autoCallOnDown = true, escalateAfterSec = 300, maxPriority = 3, notifyPoliceOnGunshot = true }

Config.Billing = { enabled = false, requireFunds = false, prices = { bandage = 50, revive = 500, healbed = 250 } }
```

!!! danger "Billing has no default payout destination"
    `Config.Billing` ships disabled with `societyAccount = nil`. Enabling billing without setting a society account destination just deletes the money charged — set one first.

## Style presets

```lua title="config.lua"
Config.Style = 'realistic'  -- or 'contentrp'
```

A preset merged over the baseline config at load time (`deepMerge`), retuning Death/Bleed/Treatment/Skeletal harshness in one switch.

## Garage & MDT

```lua title="config/garage.lua"
Config.Garage.location.management.mode = 'npc'  -- 'npc' | 'target' | 'textui' | 'none'
Config.Garage.location.store.mode = 'textui'

Config.MDT = { keybind = 'F7', commandName = 'emsmdt', mapTilesUrl = 'maps/atlas' }
```
