# Configuration

All configuration lives in `config.lua`.

## Interaction & permissions

```lua title="config.lua"
Config.Interaction = 'target'      -- 'target' (ox_target/qb-target) | 'text' (DrawText3D + [E])
Config.PermissionMode = 'framework' -- 'framework' | 'standalone' | 'ace' | 'discord' | 'custom'
Config.LEOJobs = { 'police', 'lssd', 'sahp' }
Config.RequireJobToOpen = true
Config.PolicejobResource = 'auto'  -- pulls a real MDT callsign from Ice_Policejob if detected
```

!!! warning "Standalone and Discord modes need wiring"
    `Config.PermissionMode = 'standalone'` requires you to call the `SetPlayerGrade`/`SetPlayerPermission`/`SetPlayerProfile` exports yourself from your own login code — nothing is wired automatically. `'discord'` mode requires implementing `Permissions.HasDiscordRole` yourself (a bot token/guild id isn't shipped).

Permissions are **always re-checked server-side** (`server/permissions.lua`, `server/garage.lua`) regardless of mode, so NUI tampering can't bypass restrictions.

## Active vehicle rule

```lua title="config.lua"
Config.ActiveVehicle = {
    onePerPlayer = true,
    onDuplicateSpawn = 'prompt', -- what happens if you try to deploy a 2nd vehicle
    allowReturn = true,
    allowStore = true,
    allowDelete = true,
}
```

No teleport-to-vehicle action exists — officers must walk or drive to their unit.

## Spawn behavior & plates

```lua title="config.lua"
Config.SpawnDefaults = {
    fuel = 100.0, health = 1000.0, engineRunning = false, doorsLocked = false,
    radioPreset = 1, sirenOn = false, plateFormat = true,
}

Config.SpawnChecks = {
    checkBlocking = true, checkPlayerNear = true, checkAlreadyOut = true,
    groundSnap = true, maxRadius = 5.0,
}

Config.PlatePrefixes = { ['Mission Row Garage'] = 'LSPD' }
Config.PlateNumberLength = 3 -- e.g. LSPD-041
```

!!! note "Plates are session-unique only"
    Generated plates are unique in-memory per session (`UsedPlates`), not persisted across restarts.

## Vehicles & kiosks

```lua title="config.lua"
Config.Vehicles = {
    { model = 'police', label = 'Police Cruiser', division = 'patrol', class = 'sedan',
      grade = 0, job = 'police', permission = nil, seats = 4, stats = {} },
}

Config.Kiosks = {
    { id = 'mrpd_main', label = 'Mission Row Garage', division = 'patrol',
      agencyTheme = 'lspd', coords = vec4(0,0,0,0), heading = 0.0,
      cameraCoords = vec4(0,0,0,0), garageName = 'Mission Row',
      returnLocation = vec3(0,0,0), spawnPoints = { vec4(0,0,0,0) } },
}

Config.AgencyThemes = { lspd = { --[[ color/label/logo ]] } }
Config.DefaultAgencyTheme = 'lspd'
```

Grade/job/permission on a vehicle entry are re-validated server-side, matching whatever `Config.PermissionMode` you chose.

## Feature toggles

```lua title="config.lua"
Config.Features = {
    spawnCooldown = 5000,
    vehicleHistory = true,
    recentVehicles = true,
    pinnedVehicles = true,
    officerProfile = true,
}
```

!!! tip "In-game admin edits persist outside config.lua"
    Changes made via `/fleetadmin` are saved to `fleet_kiosk_kiosks.json` / `fleet_kiosk_vehicles.json`, layered on top of `config.lua`. Kiosk edits go live immediately for all connected players; vehicle edits apply the next time a kiosk is opened.
