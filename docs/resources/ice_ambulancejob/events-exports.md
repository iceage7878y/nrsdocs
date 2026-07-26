# Events & Exports

## Exports

```lua
-- server-side, exports['Ice_ambulancejob']:...
IsPlayerDown(source)
ReviveEntity(source)
GetOnDutyEMS()
GetEMSCount()
IsOnDuty(source)
CreateMedicalCall({ caller, coords, location, description, priority, cause })
```

## Public integration events

```lua
-- external resource -> Ice_ambulancejob
TriggerEvent('ambulancejob:server:createMedicalCall', { ... })
```

Handlers you can hook into from another resource:

- `ambulancejob:server:playerDown`
- `ambulancejob:server:playerRevived`
- `ambulancejob:server:newMedicalCall`

## Internal architecture

Roughly 40 `ice-ambulancejob:client:*` / `ice-ambulancejob:server:*` net events cover duty, dispatch, MDT, medbag, stretcher, treatment sync, and death/respawn, plus ~34 request/response RPCs registered via `Bridge.RegisterCallback(name, handler)` across `server/*.lua` (checkin, garage, mdt, treatment, calls, locker, medbag, healbed).

**Callback bridge:** `bridge/server.lua` wraps `lib.callback.register` when ox_lib is present. Without ox_lib, a shim fires `RegisterNetEvent('ice-ambulancejob:server:triggerCallback', ...)` and replies via `TriggerClientEvent('ice-ambulancejob:client:callbackResult', src, requestId, ...)`, matched client-side by `Bridge.TriggerCallback`/`Bridge.TriggerCallbackAwait` in `bridge/client.lua`. This plays the same role as Ice_crafting's begin/finish bridge, but is a generic named-callback system rather than a fixed pair.

## Cross-department dispatch

If `Ice_Policejob` is running, gunshot-triggered medical calls call its `CreateDispatchAlert` export directly — no config needed beyond both resources being installed and `Config.Dispatch.notifyPoliceOnGunshot = true`.
