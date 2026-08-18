# Events & Exports

## Client → Server events

`ice_radio:server:joinChannel`, `leaveChannel`, `setTalking`, `setVolume`, `setScanList`, `savePresets`, `loadPresets`, `saveLayout`, `playerReady`, `gpsUpdate`, `proximityUpdate`, `standaloneAuth`, `replaceBattery`, `useChannelChip`, `openRadioStorage`, `prepareRadioUse`, `panic`, plus admin actions `adminOpen`, `adminSpy`, `adminJoin`, `adminForcePlayer`, `adminMute`, `adminPatch`, `adminUnpatch`, `adminLiveSetting`, `adminAlertTone`.

## Server → Client events

`ice_radio:client:init`, `channelJoined`, `channelLeft`, `members`, `talker`, `scanList`, `encryptedStatic`, `channelDenied`, `encryptionKeys`, `alertTone`, `liveSettings`, `presets`, `forceUntalk`, `notify`, `volume`, `battery`, `patchesUpdated`, `standaloneSession`, `standaloneTalk`, `panic`, `useItem`, `useBattery`, `useChannelChip`, `openRadioStorage`, `layoutSaved`, `adminOpen`, `adminChannel`, `adminPanic`, `adminGps`, `adminDispatchBadge`.

## Exports

```lua
-- client (also mirrored server-side where noted)
GetPlayerChannel()
GetPlayerSecondaryChannel()
IsTransmitting()
GetVoiceBackend()
HasRadioEquipped()
GetRadioSignal()
GetTalkersOnChannel(channelId)
useRadio() / useBattery() / useChannelChip() / openRadioStorage()

-- server-only
ForceChannel(src, channelId)
SetChannelVolume(src, channelId, vol)
PatchChannels(a, b) / UnpatchChannels(a, b)
BroadcastAlertTone(channelId, tone)
OpenPanic(src)
GetChannelState()
GetAllZones()
AdminSpyChannel(src, channelId)
AdminJoinChannel(src, channelId)
SetLiveSetting(key, value)
GetLiveSettings()
```

## External CAD / dispatch integration

With `Config.API.restEnabled = true`, a REST API on `Config.API.restPort` plus a Socket.IO feed on `Config.API.socketPort`/`socketPath` expose live channel/talker state for external dashboards — this is the same feed `Config.Admin.desktopWindow` uses internally, so a third-party CAD tool can point at it directly instead of building a new admin surface.
