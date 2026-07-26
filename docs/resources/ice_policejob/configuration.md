# Configuration

`config.lua` has ~24 sections. The ones below are the most important to review before going live; everything else has sane defaults.

## Framework & integrations

```lua title="config.lua"
Config.Framework = 'auto'   -- auto-detect: qbx_core -> qb-core -> es_extended -> vrp
Config.Inventory = 'auto'
Config.Target = 'ox_target' -- default is explicit, unlike Framework/Inventory
Config.Dispatch = 'built-in'
```

## Modules

```lua title="config.lua"
Config.Modules = {
    duty = true, lockerRoom = true, armory = true, cuffing = true,
    jail = true, mdt = true, gsr = true, bodycam = true,
    vehicleSpawner = false, -- off by default — pair with a garage resource if needed
    -- ~25 total toggles
}
```

Disabling a module fully removes its commands/events, not just its UI.

!!! warning "Module dependencies aren't always obvious"
    `jail = true` with `cuffing = false` silently disables the "Jail" target option, since jailing depends on the cuffed-state check. `mdt = false` also disables the public `createBOLO`/`addCriminalRecord` events, since they write to MDT-owned tables.

## Departments & grades

```lua title="config.lua"
Config.Departments = {
    police = {
        job = 'police', callsignPrefix = '1L',
        grades = {
            [0] = { label = 'Cadet', permissions = {} },
            [4] = { label = 'Sergeant', permissions = { armoryTier2 = true, cuffOthers = true } },
            -- LSPD alone spans 18 grades, Cadet through Chief
        },
    },
}
```

!!! danger "Permissions are exact-grade, not cumulative"
    `HasPermission` looks up the officer's *exact current grade* — it does not inherit from lower grades. Every grade that should have `armoryTier2`, `manageWarrants`, or `mdtAdmin` must list it explicitly, the way the shipped config does for every rank from the tier upward.

## Stations & loadouts

```lua title="config.lua"
Config.Stations = {
    police = { blip = {...}, dutyPoint = vec4(0,0,0,0), lockerRoom = vec4(0,0,0,0),
               armory = vec4(0,0,0,0), vehicleSpawn = vec4(0,0,0,0), jailPoint = vec4(0,0,0,0) },
}

Config.Loadouts = {
    [1] = { label = 'Standard Issue', items = { 'stungun', 'handcuffs', 'zipties', 'fingerprint_kit', 'plate_reader' } },
    [2] = { label = 'Advanced Issue', permission = 'armoryTier2', items = { 'pistol', 'carbine' } },
}
```

No garage coordinates exist by design — this resource is spawn-only.

## Jail

```lua title="config.lua"
Config.Jail = {
    defaultMinutes = 5,
    openCommand = 'prisonmdt',
    escapeCheckIntervalMs = 10000,
    tickSeconds = 60,
    facilities = {
        prison = { center = vec3(0,0,0), radius = 220.0, releasePoint = vec3(0,0,0), cells = {...} },
        lockup = { center = vec3(0,0,0), radius = 60.0 },
    },
}
```

!!! note "Time only ticks while online"
    Jail time persists on every tick and on disconnect — restarts and combat-logging never shorten a sentence. This is deliberate ("time served while online").

## Evidence & GSR

```lua title="config.lua"
Config.Evidence = {
    requireFlashlight = true, viewDistance = 20.0, despawnMinutes = 30,
    casingChance = 0.8, bulletHoleChance = 0.6, fragmentChance = 0.3,
    bloodDamageThreshold = 20,
    analysisStations = {...},
}

Config.GSR = { decayMinutes = 60, washOffSeconds = 10, testKitItem = 'gsr_kit', consumeKit = true }
Config.WeaponRegistration = { command = 'registerweapon', fee = 250 }
```

## MDT & webhooks

```lua title="config.lua"
Config.MDT = { showCitizenAddresses = true, adminRankRequired = 'mdtAdmin', penalCodeFile = 'data/penalcode.json' }

Config.Webhooks = {
    arrests = '', warrants = '', bolos = '', mdtAdmin = '', jailRelease = '', bodycam = '', prison = '',
    -- all empty (disabled) by default
}
```

## Legacy vRP1 note

vRP is structurally different: jobs are vRP groups (not job/grade fields), grades are flat unless a department defines a `vrpGrades` map, and usable items become `/`-prefixed chat commands. Every vRP bridge call is `pcall`-wrapped to fail safe since function names vary by fork — verify your fork's `Proxy.lua` functions before relying on this in production.
