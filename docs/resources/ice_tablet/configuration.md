# Configuration

Core settings live in `config.lua`; Boosting has its own file, `config/boosting.lua`.

## General

```lua title="config.lua"
Config.Framework = 'auto'          -- 'auto' | 'qbox' | 'esx'
Config.Inventory = 'ox_inventory'
Config.Debug = true                -- verbose chat/console logging — set false in production
Config.Items = { tablet = 'ice_tablet', usb_stick = 'ice_usb' }
Config.Locale = 'en'
```

## Use animation

```lua title="config.lua"
Config.UseAnimation = {
    enabled = true,
    dict = 'amb@world_human_stand_mobile@male@text@base', clip = 'base', flag = 49,
    prop = { enabled = false, model = 'prop_cs_tablet' },
}
```

## Performance

```lua title="config.lua"
Config.Performance = {
    closeOnDistance = true,
    nuiCullWhenClosed = true,
    notificationLimit = 5,
    fileListPageSize = 40,
}
```

## Apps & Boss Menu

```lua title="config.lua"
Config.Apps = {
    files = { enabled = true, label = 'Files', icon = '...', dock = true },
    -- documents, wifi, terminal, browser, calculator, settings, boss, gang, boosting...
}

Config.BossJobs = {
    police = { minGrade = 4 },
    mechanic = { minGrade = 3 },
}
```

Boss Menu works on both frameworks via grade thresholds. Gang Menu is QBox-only — on ESX it shows as unsupported since ESX Legacy has no native gang equivalent.

## WiFi, Browser, Terminal

```lua title="config.lua"
Config.WifiNetworks = {
    { label = 'PD-Secure', type = 'admin', job = 'police', coords = vec3(0,0,0), range = 50.0,
      password = '****', unlocksApps = { 'mdt' } },
}

Config.BrowserHomepage = 'icesearch'
Config.BrowserSites = { --[[ static searchable "websites" ]] }

Config.Terminal = {
    prompt = 'ice@device',
    commands = { --[[ whitelisted commands ]] },
    hackMinigame = { gridSize = 5, timeLimit = 15, attemptsAllowed = 3 },
}
```

## Device defaults

```lua title="config.lua"
Config.DeviceDefaults = {
    wallpaper = 'default', theme = 'dark', deviceName = "Owner's Device", lockEnabled = false,
}
```

## Boosting

```lua title="config/boosting.lua"
Config.Boosting = {
    tiers = { --[[ XP thresholds ]] },
    maxCrew = 3,
    escapeSeconds = 90,
    escapeRadius = 150.0,
    alarmSeconds = 20,
    dispatch = { enabled = true, resource = 'ice-policejob' },
    contracts = {
        { id = 'sedan_01', tier = 1, vehicleModelPool = {'tailgater'}, npcCoords = vec3(0,0,0),
          deliveryCoords = vec3(0,0,0), vinScratchCoords = vec3(0,0,0), rewards = { cash = 1500, xp = 50 } },
    },
}
```

!!! note "Trust boundary in Boosting"
    NPC-kill/escape steps are client-reported and server-friction-checked (time/distance), not cryptographically verified — an accepted design limitation. Vehicle identity (plate + model + distance), however, *is* server-verified.

!!! warning "Perks don't spend XP"
    Spending XP on a perk would relock XP-gated contract tiers, so perks are checked against a permanent high-water-mark of XP earned, not a spendable currency.
