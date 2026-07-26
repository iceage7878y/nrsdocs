# Configuration

All configuration lives in `config.lua`.

## Framework & voice backend

```lua title="config.lua"
Config.Framework = 'auto'          -- 'auto' | 'esx' | 'qbox' | 'qbcore'
Config.VoiceBackend = 'pma-voice'  -- or 'standalone'
Config.RadioTalksIngame = true     -- also talk on proximity while radio PTT is held
```

The two voice backends are mutually exclusive — switching doesn't touch channel/UI/admin code, but `pma-voice` mode only uses its radio-channel API, not its own PTT/NUI.

## Standalone voice

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

Set `USE_NATIVE_IMBE=1` and provide `voice_server/codec/native.node` (an mbelib/DVSI binding) for a hardware-accurate vocoder — otherwise a JS framer (`imbe.js`) is used.

## Items & channels

```lua title="config.lua"
Config.Items = { radio = 'radio', requireEquipped = true, loseOnDeath = false, radioSlots = 4 }
Config.Channels = { max = 99, encryptedByDefault = false, defaultPrimary = 1, defaultVolume = 0.8 }
Config.Scanning = { enabled = true, holdOnActiveSeconds = 5, resumeDelayMs = 500 }
```

Conventional channels use a `frequency`; trunked channels use a `zone` → `talkgroups` structure (softkeys change zone/talkgroup). Both gate access by `jobs` and an optional `encrypted` flag requiring a `radio_encryption_key`.

## Panic & range realism

```lua title="config.lua"
Config.Panic = { keybind = 'F7', channel = 'PANIC', openMicSeconds = 10, tone = 'panic' }
Config.Range = { base = 400.0, falloffStart = 300.0, minSignal = 0.05 }
Config.Towers = { --[[ per-zone boost multiplier ]] }
Config.DeadZones = { useInteriorCheck = true, interiorDegradation = 0.35 }
```

## Battery, GPS & vehicle radio

```lua title="config.lua"
Config.Battery = { enabled = true, drainPerMinute = 1, lowThreshold = 15, criticalThreshold = 5 }
Config.GPS = { enabled = true, jobs = { 'police', 'sheriff', 'ambulance' }, updateIntervalMs = 3000 }
Config.VehicleRadio = { enabled = false, policeEmsOnly = true, syncWithHandheld = true }
```

## UI, admin & API

```lua title="config.lua"
Config.UI = { defaultLayout = 'ATX-8000', requireManualPower = true }
Config.JobRadioLayouts = { police = 'XPR-6500', ambulance = 'AFX-1500' }
Config.Admin = { acePermission = 'ice_radio.admin', allowSpy = true, desktopWindow = true }
Config.API = { restEnabled = true, restPort = 30126, socketPort = 30127, socketPath = '/ice-radio' }
Config.Persistence = { autoImport = true, tablePrefix = 'ice_radio_', schemaFile = 'sql/schema.sql' }
```

Radio face layouts are **data, not code** — each lives under `layouts/<name>/` (`config.json`, `ui.html`, icons, fonts, optional sounds). Adding a new face needs a new folder + `layout.css`, no Lua changes.
