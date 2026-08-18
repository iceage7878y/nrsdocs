# Events & Exports

Ice_radio exposes real `exports` for other resources — a dispatch resource, an MDT/tablet app, or a custom inventory — plus a REST + Socket.IO API for tools that live outside the FX process entirely.

## Exports

```lua
-- client (also mirrored server-side where noted)
GetPlayerChannel([src])
GetPlayerSecondaryChannel([src])
IsTransmitting([src])
GetVoiceBackend()
HasRadioEquipped([src])
GetRadioSignal([src])
GetTalkersOnChannel(channelId)
useRadio(data, slot) / useBattery(data, slotInfo) / useChannelChip(data, slot) / openRadioStorage(slot, ...)  -- client-only item-use hooks

-- server-only
ForceChannel(src, channelId)
SetChannelVolume(src, channelId, vol)
PatchChannels(a, b) / UnpatchChannels(a, b)
BroadcastAlertTone(channelId, tone)
OpenPanic(src)
GetChannelState() / GetAllZones()
AdminSpyChannel(src, channelId)
AdminJoinChannel(src, channelId)
SetLiveSetting(key, value) / GetLiveSettings()
```

```lua
exports.ice_radio:ForceChannel(target, 1)
exports.ice_radio:BroadcastAlertTone(1, 'bolo')
```

## Integration events

`client/*.lua` and `server/*.lua` pass dozens of `ice_radio:client:*` / `ice_radio:server:*` events back and forth internally (channel join/leave, talker state, presets, GPS, admin spy/join, the standalone session handshake, …). That's plumbing between this resource's own client and server halves, not a stable contract — use the exports above instead. Two exceptions worth knowing if you're wiring a custom inventory rather than calling the exports directly (this is what `install/ox_inventory_items.lua` and the `examples/*.lua` snippets do):

| Event | Direction | Purpose |
|---|---|---|
| `ice_radio:client:useItem` | trigger → client | Fire from your inventory's usable-item handler for the `radio` item. |
| `ice_radio:server:openRadioStorage` | trigger → server | Opens the radio's Storage stash — what ox_inventory's Storage button calls. |

Every server-originated player notification also funnels through `ice_radio:client:notify(message, type)`, regardless of `Config.Notifications.system` — handled in `shared/bridge.lua`, override it there to route notifications somewhere none of the built-in options cover.

## REST API

Mounted at FX `SetHttpHandler` path `/ice-radio/*` when available, and mirrored by the Node companion. Header: `X-Ice-Radio-Token: <Config.API.restToken>`.

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

URL `http://<host>:30127`, path `/ice-radio` (`Config.API.socketPath`). FiveM pushes via `POST http://127.0.0.1:30127/publish` with the REST token. Events: `state` (periodic full snapshot), `talk`, `gps`, `panic`, `alert`, `settings`, `patches`, `hello` (sent on connect).

```js
import { io } from 'socket.io-client';
const s = io('http://127.0.0.1:30127', { path: '/ice-radio' });
s.on('state', (snap) => console.log(snap.zones));
```

This is the same feed `Config.Admin.desktopWindow` uses internally — a third-party CAD tool can point at it directly instead of building a new admin surface.
