# Configuration

All configuration lives in `config.lua`.

## Framework & voice backend

```lua title="config.lua"
Config.Framework = 'auto'          -- 'auto' | 'esx' | 'qbox' | 'qbcore'
Config.VoiceBackend = 'pma-voice'  -- 'pma-voice' | 'standalone'
Config.PmaVoice = { channelMode = 'id' }  -- 'id' (recommended) | 'frequency' (can collide on trunked 851.x)
Config.RadioTalksIngame = true     -- also talk on proximity while radio PTT is held
```

The two voice backends are mutually exclusive — switching doesn't touch channel/UI/admin code, but `pma-voice` mode only uses its radio-channel API, not its own PTT/NUI.

## Standalone voice

!!! warning "Advanced / optional"
    `pma-voice` is the supported default for most servers — only switch to `standalone` if you're comfortable operating a separate Node.js process yourself: its own ports, its own secrets, and a from-scratch P25 IMBE codec instead of pma-voice's proven pipeline. See [Installation](installation.md).

```lua title="config.lua"
Config.StandaloneVoice = {
    port = 30125,
    host = '0.0.0.0',
    codec = 'P25_IMBE',
    proximityRange = 28.0,
    vehicleRangeMultiplier = 2.5,
    tokenSecret = 'change-me-ice-radio-standalone',
}
```

Set `USE_NATIVE_IMBE=1` and provide `voice_server/codec/native.node` (an mbelib/DVSI binding) for a hardware-accurate vocoder — otherwise the bundled JS framer (`imbe.js`) is used.

## Notifications & items

```lua title="config.lua"
Config.Notifications = { system = 'nrs_uipack', title = 'Radio' }  -- 'auto' | 'ox_lib' | 'nrs_uipack' | 'esx' | 'qb' | 'gta'
Config.Items = {
    radio = 'radio', battery = 'radio_battery',
    encryptionKey = 'radio_encryption_key', channelChip = 'radio_channel_chip',
    requireEquipped = true,  -- false = anyone can open the radio with F3 / /radio, no item needed
    loseOnDeath = false,
    radioSlots = 4, radioMaxWeight = 500,  -- capacity of the radio's own Storage stash
}
```

Item names must match what's registered in your inventory — see [Installation](installation.md).

## Channels & scanning

```lua title="config.lua"
Config.Channels = { max = 99, encryptedByDefault = false, defaultPrimary = 1, defaultVolume = 0.8 }
Config.Scanning = { enabled = true, holdOnActiveSeconds = 5, resumeDelayMs = 500 }
```

Conventional channels use a flat `frequency`; trunked channels use a `zone` → `talkgroups` structure (softkeys change zone/talkgroup). Both gate access by `jobs` and an optional `encrypted` flag requiring a `radio_encryption_key`. Scan is a ghost-listen — the player stays joined to their primary channel to transmit, and only "holds" on a scanned channel while it has traffic.

## Panic & range realism

```lua title="config.lua"
Config.Panic = {
    keybind = 'F7', forceChannel = false, openMicSeconds = 10,
    cooldownSeconds = 60, tone = 'panic',
    notifyJobs = { 'police', 'sheriff', 'ambulance' },
}
Config.Range = { base = 400.0, falloffStart = 300.0, minSignal = 0.05 }
Config.Towers = { --[[ per-location boost multiplier ]] }
Config.DeadZones = { useInteriorCheck = true, interiorDegradation = 0.35 }
```

`forceChannel = false` is deliberate — panic never force-joins the player onto the panic channel. `notifyJobs` hear the tone and see the blip without the triggering player's channel changing.

## Battery, GPS & vehicle radio

```lua title="config.lua"
Config.Battery = { enabled = true, drainPerMinute = 1, lowThreshold = 15, criticalThreshold = 5 }
Config.GPS = { enabled = true, jobs = { 'police', 'sheriff', 'ambulance' }, updateIntervalMs = 3000, requireGpsCapableRadio = true }
Config.VehicleRadio = { enabled = false, policeEmsOnly = true, syncWithHandheld = true }
```

## UI, radio faces, admin & API

```lua title="config.lua"
Config.UI = { defaultLayout = 'ATX-8000', allowPlayerSelect = true, settingsCommand = 'radiosettings', requireManualPower = true }
Config.JobRadioLayouts = { police = 'XPR-6500', sheriff = 'XPR-6500S', ambulance = 'AFX-1500', firefighter = 'AFX-1500G' }
Config.Admin = { acePermission = 'ice_radio.admin', dispatchJobs = { 'police', 'sheriff', 'ambulance', 'dispatch' }, allowSpy = true, liveSettingsBroadcast = true, desktopWindow = true }
Config.API = { restEnabled = true, restPort = 30126, socketEnabled = true, socketPort = 30127, socketPath = '/ice-radio' }
Config.Persistence = { autoImport = true, tablePrefix = 'ice_radio_', schemaFile = 'sql/schema.sql' }
```

Ten PNG-based radio faces ship under `layouts/` (`AFX-1500`, `AFX-1500G`, `ARX-4000X`, `ATX-8000`, `ATX-8000G`, `ATX-8000H`, `ATX-NOVA`, `TXDF-9100`, `XPR-6500`, `XPR-6500S`). `defaultLayout` sets the fallback face; `JobRadioLayouts` overrides it per job. Players can switch their own face any time with `/radiosettings` when `allowPlayerSelect` is true.

!!! note "Adding a new face"
    Add a folder under `layouts/` with `config.json`, `ui.html`, `radio.png` (+ optional `radio-dark.png`, `tones.json`, `fonts/`, `icons/`, `sounds/`), then list its folder name in `layouts/index.json`. No Lua changes needed.

`liveSettingsBroadcast` lets audio/range tweaks pushed via the REST `/settings` endpoint or the `SetLiveSetting` export apply to connected clients without a restart. `desktopWindow` enables a CEF popup version of the dispatch panel inside the admin NUI — for a true external window, point a browser at the Socket.IO feed instead (see [Events & Exports](events-exports.md)).
