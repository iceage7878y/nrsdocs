# Events & Exports

No `lib.callback`/ox_lib-style RPC bridge is used — all client↔server communication is plain fire-and-forget events (request/response pairs, not synchronous callbacks).

## Client → Server

`fleet:server:requestData`, `requestSpawn`, `confirmSpawn`, `vehicleReturned`, `vehicleStored`, `toggleFavorite`, `requestKiosks`, `requestAdminData`, `adminSaveKiosk`, `adminDeleteKiosk`, `adminSaveVehicle`, `adminDeleteVehicle`.

## Server → Client

`fleet:client:receiveData`, `accessDenied`, `spawnResponse`, `setActiveVehicle`, `notify`, `open`, `close`, `openAdmin`, `initKiosks`, `kioskUpserted`, `kioskRemoved`, `toggleDebugDraw`.

## Local event

`fleet:update` — fired server-side on a confirmed spawn. Other resources can listen for this with `AddEventHandler` to react to fleet deployments.

## Exports

```lua
-- client
exports.fleet_kiosk:OpenFleet(kioskId)
exports.fleet_kiosk:CloseFleet()
exports.fleet_kiosk:SpawnVehicle(kioskId, model, options)
exports.fleet_kiosk:ReturnVehicle()

-- server
exports.fleet_kiosk:SetPlayerGrade(source, grade)
exports.fleet_kiosk:SetPlayerPermission(source, permission, bool)
exports.fleet_kiosk:SetPlayerProfile(source, { ... })
exports.fleet_kiosk:GetPlayerGrade(source)
exports.fleet_kiosk:HasFleetPermission(source, permission)
exports.fleet_kiosk:SpawnVehicle(src, kioskId, model, options)
exports.fleet_kiosk:ReturnVehicle(src)
exports.fleet_kiosk:GetActiveVehicle(source) --> { netId, model, plate } | nil
exports.fleet_kiosk:IsVehicleAllowed(source, model)
```

`SetPlayerGrade`/`SetPlayerPermission`/`SetPlayerProfile` are the exports you call yourself when running `Config.PermissionMode = 'standalone'`.
