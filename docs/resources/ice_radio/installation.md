# Installation

`fxmanifest.lua` declares no hard dependencies — everything is soft, runtime-detected. Pick a voice backend before you start configuring: `pma-voice` (if you already run it) or `standalone` (a separate Node.js process this resource talks to over HTTP).

## Requirements

- ESX, QBox, or QBCore (auto-detected) — or run standalone without a framework
- Optional: `ox_inventory` (preferred inventory integration), `oxmysql` (persistence), `pma-voice` (if using that voice backend)
- For standalone voice: Node.js ≥18, with `express`, `cors`, `ws`, `socket.io`

## Steps

1. Drop the folder into `resources/ice_radio`.
2. `server.cfg`:

    ```cfg
    ensure oxmysql       # optional, for persistence
    ensure pma-voice      # only if Config.VoiceBackend = 'pma-voice'
    ensure ice_radio
    ```

3. **Database.** No manual import needed by default — with `Config.Persistence.autoImport = true`, tables `ice_radio_battery`, `ice_radio_presets`, `ice_radio_encryption_keys` are created automatically (requires oxmysql). Manual import of `sql/schema.sql` is only needed if `autoImport` is disabled.
4. **Items.** Paste the commented item definitions from `install/ox_inventory_items.lua` into `ox_inventory`'s `data/items.lua` (or adapt for ESX/QBCore) and restart it: `radio`, `radio_battery`, `radio_encryption_key`, `radio_channel_chip`.
5. Edit `config.lua` — set `Config.Framework` and `Config.VoiceBackend`.
6. **If `Config.VoiceBackend = 'standalone'`** — this is a separate Node.js process, not a FiveM resource, and is not spawned automatically:

    ```bash
    cd voice_server
    npm install
    npm start
    ```

    It listens on `Config.StandaloneVoice.port` (default `30125`, WS audio + control HTTP) and `Config.API.socketPort` (default `30127`, Socket.IO dashboards). The FiveM server side talks to it over `PerformHttpRequest` calls to `http://127.0.0.1:<port>/v1/...`, authenticated with an `X-Ice-Radio-Token` header. Keep it alive independently (a process manager, not `ensure`), and set matching secrets in `config.lua` (`Config.StandaloneVoice.tokenSecret`, `Config.API.restToken`) or via env vars `ICE_RADIO_TOKEN` / `ICE_RADIO_REST_TOKEN`.

!!! danger "Change the default secrets"
    `tokenSecret`/`restToken` ship as `'change-me-...'` placeholders. Rotate them (and the matching env vars) before going live with standalone voice.

## Verifying it works

1. Equip a `radio` item and power it on.
2. Join a conventional channel and confirm another player on the same channel hears you.
3. If using `standalone` voice, confirm `voice_server` is running and check its console for a successful auth handshake when a player joins a channel.
4. Test the panic keybind (default `F7`) and confirm it broadcasts on the panic channel.
