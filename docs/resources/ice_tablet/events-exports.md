# Events & Exports

## Exports

```lua
-- client
exports.Ice_tablet:RegisterApp(appDef)      -- plug a third-party app into the dock/desktop
exports.Ice_tablet:OpenApp(appId)           -- returns false if the device isn't open
exports.Ice_tablet:CloseDevice()
exports.Ice_tablet:IsDeviceOpen()           -- boolean

-- server
exports.Ice_tablet:RegisterServerCallback(name, handler)  -- register an NUI-reachable, server-authoritative callback
```

`server/apps/terminal.lua` also exposes a reusable hack-minigame trigger: `exports.Ice_tablet:startHack(source)`.

## Callback bridge (RPC pattern)

`server/callbacks.lua` implements a generic request/response framework, not `lib.callback`:

1. Client calls `TriggerServerEvent('ice_tablet:server:callback', name, requestId, payload)`.
2. Server looks up `ServerCallbacks[name]`, calls it in a `pcall`.
3. Server replies via `TriggerClientEvent('ice_tablet:client:callbackResult', ...)`.

All ~55 built-in app callbacks (Boosting, Boss, Gang, Files, Documents, WiFi, Terminal, Settings, Browser) register through `RegisterServerCallback` — the exact same mechanism exposed to third parties via the export above.

## Other events

**Client → Server:** `ice_tablet:useDevice`, `ice_tablet:useUsb` (item-use handlers), `boosting:requestEntities`, `boosting:relayEntities`, `boosting:reportAlarm`.

**Server → Client:** `ice_tablet:client:openDevice`, `openUsbManager`, `documentShared`, `hackResult`, `externalHackStart`, `boostingCrewJoined`, `boostingRebroadcastRequest`, `boostingEntities`, `boostingAdminStop`, `boostingEscapeStart`, `boostingReadyDeliver`, `requestClose`.

See [Custom Apps](custom-apps.md) for how to build against this bridge from your own resource.
