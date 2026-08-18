# Events & Exports

Ice_radio exposes real `exports` for other resources to call — a dispatch resource, an MDT/tablet app, or a custom inventory — plus a REST + Socket.IO API for tools that live outside the FX process entirely.

## Lua exports

### Client & server

| Export | Description |
|--------|-------------|
| `exports.ice_radio:GetPlayerChannel([src])` | Primary channel id |
| `exports.ice_radio:GetPlayerSecondaryChannel([src])` | Secondary channel id |
| `exports.ice_radio:IsTransmitting([src])` | PTT active |
| `exports.ice_radio:GetVoiceBackend()` | `'pma-voice'` \| `'standalone'` |
| `exports.ice_radio:HasRadioEquipped([src])` | Item / powered check |
| `exports.ice_radio:GetRadioSignal([src])` | 0.0–1.0 strength |
| `exports.ice_radio:GetTalkersOnChannel(channelId)` | Active talkers |

### Client only

Item-use hooks, for wiring a custom inventory:

| Export | Description |
|--------|-------------|
| `exports.ice_radio:useRadio(data, slot)` | Use-item handler for the `radio` item |
| `exports.ice_radio:useBattery(data, slotInfo)` | Use-item handler for `radio_battery` |
| `exports.ice_radio:useChannelChip(data, slot)` | Use-item handler for `radio_channel_chip` |
| `exports.ice_radio:openRadioStorage(slot, ...)` | Opens the radio's Storage stash (battery/key/chip slots) |

### Server only

| Export | Description |
|--------|-------------|
| `ForceChannel(src, channelId)` | Force join |
| `SetChannelVolume(src, channelId, vol)` | 0.0–1.0 |
| `PatchChannels(a, b)` / `UnpatchChannels(a, b)` | Temporary link |
| `BroadcastAlertTone(channelId, tone)` | Play configured tone |
| `OpenPanic(src)` | Trigger panic flow |
| `GetChannelState()` / `GetAllZones()` | Dispatch snapshot |
| `AdminSpyChannel(src, channelId)` | Silent listen |
| `AdminJoinChannel(src, channelId)` | Join as dispatcher |
| `SetLiveSetting(key, value)` / `GetLiveSettings()` | Hot audio/range knobs |

```lua
exports.ice_radio:ForceChannel(target, 1)
exports.ice_radio:BroadcastAlertTone(1, 'bolo')
```

## Integration events

Beyond the exports above, `client/*.lua` and `server/*.lua` pass dozens of `ice_radio:client:*` / `ice_radio:server:*` events back and forth (channel join/leave, talker state, presets, GPS, admin spy/join, the standalone voice session handshake, …). Those are internal plumbing between this resource's own client and server halves, not a stable public contract — use the exports instead.

Three events are worth knowing if you're wiring a custom inventory rather than using the exports directly (this is exactly what `install/ox_inventory_items.lua` and the `examples/*.lua` snippets do):

| Event | Direction | Purpose |
|---|---|---|
| `ice_radio:client:useItem` | trigger → client | Fire from your inventory's usable-item handler for the `radio` item. Equivalent to calling the `useRadio` export. |
| `ice_radio:client:useBattery` | trigger → client | Same pattern for the `radio_battery` item. |
| `ice_radio:server:openRadioStorage` | trigger → server | Opens the radio's Storage stash. This is what ox_inventory's Storage button calls. |

Every server-originated player notification also funnels through one event, regardless of `Config.Notifications.system`:

```lua
RegisterNetEvent('ice_radio:client:notify', function(message, type)
    -- type: 'success' | 'error' | 'inform'
end)
```

It's handled in `shared/bridge.lua` — override it there if you need to route notifications somewhere none of the built-in `system` options cover.

## REST API

Mounted at FX `SetHttpHandler` path `/ice-radio/*` when available, and mirrored by the Node companion (`voice_server`).

Header: `X-Ice-Radio-Token: <Config.API.restToken>`

| Method | Path | Body | Notes |
|--------|------|------|--------|
| GET | `/channels` | — | Zone/channel snapshot |
| GET | `/gps` | — | GPS units |
| GET | `/settings` | — | Live settings |
| POST | `/alert` | `{ channelId, tone }` | Alert tone |
| POST | `/force-channel` | `{ playerId, channelId }` | Force join |
| POST | `/panic` | `{ playerId }` | Panic |
| POST | `/settings` | `{ bonkDistortion: 0.2, ... }` | Live tune |

## Socket.IO API

- URL: `http://<host>:30127`
- Path: `/ice-radio` (`Config.API.socketPath`)
- FiveM pushes via `POST http://127.0.0.1:30127/publish` with the REST token

Events: `state` (periodic full snapshot), `talk`, `gps`, `panic`, `alert`, `settings`, `patches`, `hello` (sent on connect).

```js
import { io } from 'socket.io-client';
const s = io('http://127.0.0.1:30127', { path: '/ice-radio' });
s.on('state', (snap) => console.log(snap.zones));
s.on('panic', (p) => console.log('PANIC', p));
```

!!! note "Where each event comes from"
    `state`, `alert`, `gps`, `panic`, and `patches` are pushed from Lua via `IceRadio.API.Broadcast`. `talk`, `settings`, and the initial `hello` come straight from the Node voice server (`voice_server/server.js`), since PTT state changes far too often to round-trip through FX.
