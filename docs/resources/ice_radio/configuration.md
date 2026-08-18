# Configuration

All configuration lives in `config.lua`. Sections below follow the same order as the file.

## Framework & voice backend

```lua title="config.lua"
Config.Framework = 'auto'           -- 'auto' | 'esx' | 'qbox' | 'qbcore'
Config.VoiceBackend = 'pma-voice'   -- 'pma-voice' | 'standalone'
Config.PmaVoice = {
    channelMode = 'id',             -- 'id' (recommended) | 'frequency'
}
Config.RadioTalksIngame = true
```

`'auto'` probes ESX, QBox, and QBCore via `shared/bridge.lua` at boot. Switching `VoiceBackend` doesn't require touching channel, UI, or admin code — it only changes which layer carries the audio. `Config.RadioTalksIngame = true` means holding radio PTT also transmits on proximity voice, not only the radio channel.

!!! note "channelMode collisions"
    `'frequency'` keys pma-voice channels off `floor(frequency)`, which can collide across trunked 851.x talkgroups that round to the same value. Use `'id'` unless you have a specific reason not to.

## Standalone voice companion

!!! warning "Advanced / optional"
    `pma-voice` is the supported default for most servers — pick `standalone` only if you're comfortable operating a separate Node.js process yourself: its own ports, its own secrets, and a from-scratch P25 IMBE codec instead of pma-voice's proven pipeline.

```lua title="config.lua"
Config.StandaloneVoice = {
    port = 30125,
    host = '0.0.0.0',
    publicHost = nil,
    codec = 'P25_IMBE',
    sampleRate = 8000,
    bitRate = 4400,
    proximityEnabled = true,
    proximityRange = 28.0,
    vehicleRangeMultiplier = 2.5,
    tokenSecret = 'change-me-ice-radio-standalone',
}
```

Only read when `Config.VoiceBackend = 'standalone'`. The Node companion (`voice_server/`) listens on `port` for WS audio + control HTTP, separately from `Config.API.socketPort` (Socket.IO dashboards). `tokenSecret` must match the `ICE_RADIO_TOKEN` environment variable on the Node side — see [Installation](installation.md) to start it.

The codec itself frames PCM at 8 kHz / 20 ms / 88-bit IMBE-sized frames — see the [FAQ](faq.md) for details and the native-codec drop-in option.

## Notifications & items

```lua title="config.lua"
Config.Notifications = {
    system = 'nrs_uipack',      -- 'auto' | 'ox_lib' | 'nrs_uipack' | 'esx' | 'qb' | 'gta'
    title = 'Radio',
    autoOrder = { 'ox_lib', 'nrs_uipack', 'esx', 'qb', 'gta' },
}

Config.Items = {
    radio = 'radio',
    battery = 'radio_battery',
    encryptionKey = 'radio_encryption_key',
    channelChip = 'radio_channel_chip',
    requireEquipped = true,
    loseOnDeath = false,
    radioSlots = 4,
    radioMaxWeight = 500,
}
```

Item names must match what's registered in your inventory — see [Installation](installation.md). Set `requireEquipped = false` to let anyone open the radio with `F3` / `/radio` with no item at all, which is useful while you're still wiring items up.

!!! note "Radio storage"
    `radioSlots` / `radioMaxWeight` size the radio's own mini-stash (battery, encryption key, channel chip), opened via the `openRadioStorage` export — see [Events & Exports](events-exports.md).

## Sounds & audio FX

```lua title="config.lua"
Config.Sounds = {
    usePmaVoiceClicks = 'auto',  -- 'auto' | true | false
    clickOn = 'sounds/mic_click_on.wav',
    static = 'sounds/static_loop.wav',
    alertTones = {
        bolo = 'sounds/tones/bolo.wav',
        panic = 'sounds/tones/panic.wav',
        -- ...
    },
    volumes = { click = 0.7, static = 0.4, tone = 0.85, radioFilter = 0.85 },
}

Config.AudioFX = {
    radioFilter = true,
    staticLayer = true,
    micClickLocal = true,
    micClickRemote = true,
    bonkDistortion = 0.15,
}
```

Paths in `Config.Sounds` are relative to `html/`; swap the shipped `.wav` files under `html/sounds/` for your own pack any time. `Config.AudioFX.bonkDistortion` (interference distortion) is tunable live without a restart — see [Admin & live tuning](#admin-live-tuning).

## Channels

```lua title="config.lua"
Config.Channels = {
    max = 99,
    encryptedByDefault = false,
    defaultPrimary = 1,
    conventional = {
        { id = 1, name = 'DISP', label = 'Los Santos DISP', frequency = 354.68, nac = '293',
          jobs = { 'police', 'sheriff', 'ambulance' }, encrypted = false },
    },
    trunked = {
        {
            zone = 'Statewide',
            nac = '293',
            talkgroups = {
                { id = 101, name = 'DISP', label = 'DSP CONTROL', frequency = 851.0125,
                  jobs = { 'police', 'sheriff', 'ambulance' } },
            },
        },
    },
}
```

`conventional[]` is a flat list. `trunked[]` groups talkgroups into zones — the handheld's softkey `ZONE` moves between zones, `CH` moves between talkgroups in the current zone. An empty or missing `jobs` means anyone can join. Set `encrypted = true` on any entry to require the matching key item.

!!! note "Ids share one namespace"
    Trunked talkgroup `id`s and conventional channel `id`s share the same id space — don't reuse a number between them.

## Scanning & panic

```lua title="config.lua"
Config.Scanning = {
    enabled = true,
    holdOnActiveSeconds = 5,
    resumeDelayMs = 500,
}

Config.Panic = {
    keybind = 'F7',
    forceChannel = false,      -- never force-joins the panic channel
    openMicSeconds = 10,
    cooldownSeconds = 60,
    notifyJobs = { 'police', 'sheriff', 'ambulance' },
    blip = { sprite = 161, colour = 1, scale = 1.25, label = 'PANIC', durationSeconds = 60 },
}
```

Scan is a ghost-listen: the player stays joined to their primary channel for transmitting, and only "holds" on a scanned channel to listen while it has traffic, resuming after `resumeDelayMs`.

Panic never force-joins a channel — `notifyJobs` hear the tone and see the blip on their map, but the triggering player keeps talking on whatever channel they were already on. Their own radio still has to be powered on to receive the tone.

## Range, towers & dead zones

```lua title="config.lua"
Config.Range = {
    base = 400.0,
    falloffStart = 300.0,
    minSignal = 0.05,
}

Config.Towers = {
    { coords = vector3(449.0, -985.0, 43.0), radius = 500.0, boost = 2.0, label = 'Mission Row' },
}

Config.DeadZones = {
    { coords = vector3(215.0, -999.0, -98.0), radius = 40.0, degradation = 0.0, label = 'MRPD cells' },
    useInteriorCheck = true,
    interiorDegradation = 0.35,
}
```

Signal strength is 1.0 out to `falloffStart`, then falls off toward `minSignal` at `base` distance. `Towers` boost effective range near real dispatch buildings; `DeadZones` do the opposite (`degradation = 0.0` mutes it entirely inside `radius`). `useInteriorCheck` applies `interiorDegradation` to *any* interior, not only the listed dead zones.

## GPS & battery

```lua title="config.lua"
Config.GPS = {
    enabled = true,
    jobs = { 'police', 'sheriff', 'ambulance' },
    updateIntervalMs = 3000,
    requireGpsCapableRadio = true,
}

Config.Battery = {
    enabled = true,
    drainPerMinute = 1,
    lowThreshold = 15,
    criticalThreshold = 5,
    warnIntervalMs = 60000,
}
```

GPS blips only broadcast for `jobs`, and only while their radio is powered on. Battery only drains while the radio is powered on; replace it with the `radio_battery` item via the radio's Storage stash.

## UI & radio faces

```lua title="config.lua"
Config.UI = {
    defaultLayout = 'ATX-8000',
    allowPlayerSelect = true,
    settingsCommand = 'radiosettings',
    requireManualPower = true,
    darkTheme = false,
}

Config.JobRadioLayouts = {
    police = 'XPR-6500',
    sheriff = 'XPR-6500S',
    ambulance = 'AFX-1500',
    firefighter = 'AFX-1500G',
}
```

Ten PNG-based faces ship under `layouts/`: `AFX-1500`, `AFX-1500G`, `ARX-4000X`, `ATX-8000`, `ATX-8000G`, `ATX-8000H`, `ATX-NOVA`, `TXDF-9100`, `XPR-6500`, `XPR-6500S`. `defaultLayout` sets the fallback face; `JobRadioLayouts` (alias `Config.JobRadioModels`) overrides it per job. Players can switch their own face any time with `/radiosettings` (the `settingsCommand` value) when `allowPlayerSelect` is true.

!!! note "Adding a new face"
    Add a folder under `layouts/` containing `config.json`, `ui.html`, `radio.png` (+ optional `radio-dark.png`, `tones.json`, `fonts/`, `icons/`, `sounds/`), then list its folder name in `layouts/index.json`. No Lua changes needed.

Animations (holding pose / prop) are separate from faces:

```lua title="config.lua"
Config.Animations = {
    default = 'handheld_standard',
    list = {
        handheld_standard = {
            dict = 'anim@male@holding_radio', clip = 'holding_radio_clip',
            prop = 'prop_cs_hand_radio', bone = 28422,
        },
    },
}
```

## Vehicle radio

```lua title="config.lua"
Config.VehicleRadio = {
    enabled = false,
    policeEmsOnly = true,
    whitelist = { 'police', 'sheriff', 'ambulance', 'firetruk' },
    seats = { -1, 0 },
    syncWithHandheld = true,
}
```

Disabled by default. `whitelist` only applies when `policeEmsOnly = true`; `seats` controls which seat indices (`-1` driver, `0` front passenger, …) can open the head unit.

## Admin & live tuning

```lua title="config.lua"
Config.Admin = {
    acePermission = 'ice_radio.admin',
    dispatchJobs = { 'police', 'sheriff', 'ambulance', 'dispatch' },
    allowSpy = true,
    allowForceJoin = true,
    liveSettingsBroadcast = true,
    desktopWindow = true,
}
```

Grant access with `add_ace group.admin ice_radio.admin allow` (or your own ACE group). `liveSettingsBroadcast` lets audio/range tweaks pushed via the REST `/settings` endpoint or the `SetLiveSetting` export apply to connected clients without a restart. `desktopWindow` enables a CEF popup version of the dispatch panel — for a true external window instead, point a browser at the Socket.IO dashboard feed (see [Events & Exports](events-exports.md#socketio-api)).

## API & persistence

```lua title="config.lua"
Config.API = {
    restEnabled = true,
    restPort = 30126,
    restToken = 'change-me-ice-radio-rest',
    socketEnabled = true,
    socketPort = 30127,
    socketPath = '/ice-radio',
}

Config.Persistence = {
    presets = true,
    battery = true,
    encryptionKeys = true,
    tablePrefix = 'ice_radio_',
    autoImport = true,
    schemaFile = 'sql/schema.sql',
}
```

See [Events & Exports](events-exports.md#rest-api) for the actual REST/Socket.IO surface. `Persistence.autoImport` creates the tables automatically via oxmysql on first start — see [Installation](installation.md#database) to disable it and import manually instead.

!!! warning "Change the default tokens"
    `Config.StandaloneVoice.tokenSecret` and `Config.API.restToken` ship with placeholder values. Change both before exposing either port publicly.
