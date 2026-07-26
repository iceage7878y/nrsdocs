# Events & Exports

## Exports

```lua
IsOnDuty(source)
GetCallsign(source)
GetOfficerCount(department)
SetBAC(source, value)
CreateDispatchAlert(department, code, label, coords)  -- used by Ice_ambulancejob and Ice_fleetkiosk
CreateEvidence(evidenceType, coords, meta)
JailPlayer(...) / UnjailPlayer(...) / IsJailed(...) / GetJailedPlayers()
```

## Callback bridge

Feature code never calls `lib.callback` directly — everything wraps through `Bridge.RegisterCallback`/`Bridge.TriggerCallback` (`bridge/server.lua`/`bridge/client.lua`), which uses ox_lib's `lib.callback` when present, or falls back to a manual `ice-policejob:server:triggerCallback` event + request-id shim otherwise. Around 50 named RPCs exist, grouped by feature:

| Group | Example callbacks |
|---|---|
| MDT | `mdt:login`, `mdt:searchCitizens`, `mdt:getCitizen`, `mdt:createWarrant`, `mdt:createReport`, `mdt:createBOLO`, `mdt:getActiveUnits`, `mdt:admin:*` |
| Prison MDT | `mdt:prison:getData/jail/unjail/setTime/setNotes/removeEscaped/removeMonitor/setMonitorNotes` |
| Armory | `armory:getData`, `armory:buyItem` |
| Evidence | `getNearbyEvidence`, `collectEvidence`, `analyzeEvidence`, `tagEvidence`, `bagEvidence`, `dustPrints` |
| Field tools | `checkPlate`, `breathalyze`, `takeVest`, `vehicleInfo`, `issueFine`, `idCheck`, `fingerprint`, `searchPlayer`, `gsrTest`, `getDeployables`, `getRoster` |

## Client-facing events (server → client)

Grouped by feature: duty/roster (`dutyChanged`, `officerOnDuty`/`OffDuty`, `callsignChanged`, `rosterUpdated`), cuffing/escort (`setCuffed`, `escortingChanged`, `beEscorted`, `putInVehicle`, `outOfVehicle`), jail (`jailed`, `jailTimeSync`, `released`, `escaped`), ankle monitor (`monitorCoords`, `monitorRemoved`), bodycam (`bodycamChanged`, `officerBodycam`), dispatch (`dispatchAlert`), deployables (`deployableAdded`/`Removed`, `startPlacement`), equipment (`equipGoggles`, `toggleShield`, `getTackled`), MDT (`openMDT`, `newBolo`, `mdt:prefillCitizen`), plus `applyUniform`, `showCitizenCard`, `showSearchResults`.

## Server-facing events (client → server)

`toggleDuty`, `requestUniform`, `updateCoords`, `setCuffed`, `breakFree`, `setEscort`, `putInVehicle`/`takeOutOfVehicle`, `toggleBodycam`, `bodycamShots`, `tenCode`, `tackle`, `evidenceShot`/`Blood`/`VehiclePrints`, `gsrMark`/`Wash`, `checkJail`, `jailPlayer`, `placeDeployable`/`pickupDeployable`, `applyAnkleMonitor`/`removeAnkleMonitor`, `registerWeapon`.

## Public integration events

Two events are meant to be fired directly by other resources, mirroring the corresponding callback names:

```lua
TriggerEvent('ice-policejob:server:createBOLO', { ... })
TriggerEvent('ice-policejob:server:addCriminalRecord', { ... })
```

`CreateDispatchAlert` is the export [Ice_ambulancejob](../ice_ambulancejob/index.md) and [Ice_fleetkiosk](../ice_fleetkiosk/index.md) call for cross-department alerts.
