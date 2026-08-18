# Installation

## Requirements

- `pma-voice` — only if `Config.VoiceBackend = 'pma-voice'` (the default)
- [Node.js](https://nodejs.org/) 18+ — only if `Config.VoiceBackend = 'standalone'` (advanced/optional — see [Configuration](configuration.md#standalone-voice-companion))
- [oxmysql](https://github.com/overextended/oxmysql) — optional, only needed for persistence (`Config.Persistence`)
- ESX, QBox, **or** QBCore
- ox_inventory (optional) — or wire the item hooks into ESX/QBCore/QBox directly

## Steps

1. Drop the `ice_radio` folder into your `resources` directory.
2. Add the radio items to your inventory:
      - **ox_inventory** — paste `install/ox_inventory_items.lua` into `data/items.lua`.
      - **ESX / QBCore / QBox / other** — copy the commented examples in `examples/esx.lua`, `examples/qbcore.lua`, `examples/qbox.lua`.
3. **Configure.** Open `config.lua` and set at minimum:
      - `Config.Framework` — leave as `'auto'` unless detection ever picks the wrong one.
      - `Config.VoiceBackend` — `'pma-voice'` or `'standalone'`.
      - `Config.StandaloneVoice.port` — only relevant when using `'standalone'`.
4. **Load order.** Add to `server.cfg`:

    ```cfg
    ensure oxmysql          # optional, for persistence
    ensure pma-voice        # only if Config.VoiceBackend = 'pma-voice'
    ensure ice_radio
    ```

5. If `Config.VoiceBackend = 'standalone'`, start the Node companion alongside the resource:

    ```bash
    cd voice_server
    npm install
    npm start
    ```

    See [Configuration → Standalone voice companion](configuration.md#standalone-voice-companion) for ports and tokens.

6. Restart the resource (or the server).

### Database

`Config.Persistence.autoImport = true` (the default) creates `ice_radio_battery`, `ice_radio_presets`, and `ice_radio_encryption_keys` automatically via oxmysql on first start. Only import `sql/schema.sql` manually if you set `autoImport = false`.

## Verifying it works

1. Give yourself the `radio` item (or temporarily set `Config.Items.requireEquipped = false` to skip this while testing).
2. Press `F3` (or run `/radio`) to open the handheld, power it on, and confirm it lands on `Config.Channels.defaultPrimary`.
3. Hold `N` to transmit — check the `pma-voice` or standalone voice server console for activity, and confirm a nearby player hears static / mic-click SFX.
4. Press `F7` to trigger panic and confirm the jobs in `Config.Panic.notifyJobs` see the tone and blip.

Set `Config.Debug = true` in `config.lua` if something doesn't behave as expected — it prints extra output server-side.
