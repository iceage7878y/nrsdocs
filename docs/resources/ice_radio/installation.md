# Installation

<<<<<<< HEAD
## Requirements

- `pma-voice` — only if `Config.VoiceBackend = 'pma-voice'` (the default)
- [Node.js](https://nodejs.org/) 18+ — only if `Config.VoiceBackend = 'standalone'` (advanced/optional — see [Configuration](configuration.md#standalone-voice-companion))
- [oxmysql](https://github.com/overextended/oxmysql) — optional, only needed for persistence (`Config.Persistence`)
- ESX, QBox, **or** QBCore
- ox_inventory (optional) — or wire the item hooks into ESX/QBCore/QBox directly
=======
`fxmanifest.lua` declares no hard dependencies — everything is soft, runtime-detected. Pick a voice backend before you start configuring: `pma-voice` (if you already run it) or `standalone` (a separate Node.js process this resource talks to over HTTP).

## Requirements

- ESX, QBox, or QBCore (auto-detected) — or run standalone without a framework
- Optional: `ox_inventory` (preferred inventory integration), `oxmysql` (persistence), `pma-voice` (if using that voice backend)
- For standalone voice: Node.js ≥18, with `express`, `cors`, `ws`, `socket.io`
>>>>>>> parent of 222bff7 (Update)

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
<<<<<<< HEAD
    ensure oxmysql          # optional, for persistence
    ensure pma-voice        # only if Config.VoiceBackend = 'pma-voice'
    ensure ice_radio
    ```

5. If `Config.VoiceBackend = 'standalone'`, start the Node companion alongside the resource:
=======
    ensure oxmysql       # optional, for persistence
    ensure pma-voice      # only if Config.VoiceBackend = 'pma-voice'
    ensure ice_radio
    ```

3. **Database.** No manual import needed by default — with `Config.Persistence.autoImport = true`, tables `ice_radio_battery`, `ice_radio_presets`, `ice_radio_encryption_keys` are created automatically (requires oxmysql). Manual import of `sql/schema.sql` is only needed if `autoImport` is disabled.
4. **Items.** Paste the commented item definitions from `install/ox_inventory_items.lua` into `ox_inventory`'s `data/items.lua` (or adapt for ESX/QBCore) and restart it: `radio`, `radio_battery`, `radio_encryption_key`, `radio_channel_chip`.
5. Edit `config.lua` — set `Config.Framework` and `Config.VoiceBackend`.
6. **If `Config.VoiceBackend = 'standalone'`** — this is a separate Node.js process, not a FiveM resource, and is not spawned automatically:
>>>>>>> parent of 222bff7 (Update)

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

<<<<<<< HEAD
1. Give yourself the `radio` item (or temporarily set `Config.Items.requireEquipped = false` to skip this while testing).
2. Press `F3` (or run `/radio`) to open the handheld, power it on, and confirm it lands on `Config.Channels.defaultPrimary`.
3. Hold `N` to transmit — check the `pma-voice` or standalone voice server console for activity, and confirm a nearby player hears static / mic-click SFX.
4. Press `F7` to trigger panic and confirm the jobs in `Config.Panic.notifyJobs` see the tone and blip.

Set `Config.Debug = true` in `config.lua` if something doesn't behave as expected — it prints extra output server-side.
=======
1. Equip a `radio` item and power it on.
2. Join a conventional channel and confirm another player on the same channel hears you.
3. If using `standalone` voice, confirm `voice_server` is running and check its console for a successful auth handshake when a player joins a channel.
4. Test the panic keybind (default `F7`) and confirm it broadcasts on the panic channel.
>>>>>>> parent of 222bff7 (Update)
