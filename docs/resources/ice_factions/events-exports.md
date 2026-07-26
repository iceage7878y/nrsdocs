# Events & Exports

## Callback bridges

ice_factions uses two internal NUI-callback bridges (client asks, server validates and replies) plus a real RPC layer piggybacked on Ice_tablet:

| Bridge | Events | Used by |
|---|---|---|
| Admin | `ice_factions:server:adminCallback` → `ice_factions:client:adminCallbackResult` | `/factionsadmin` staff panel |
| Territory | `ice_factions:server:territoryCallback` → `ice_factions:client:territoryCallbackResult` | World blips/prompt in `client/territory.lua` |
| Player (via Ice_tablet) | `exports.Ice_tablet:RegisterServerCallback` | The player-facing tablet app — only active if Ice_tablet is installed |

Player-facing callback names (registered through Ice_tablet, prefixed `factions:`): `listMine`, `create`, `disband`, `listNearby`, `invite`, `leave`, `kick`, `promote`, `demote`, `setRank`, `ranks:list`, `ranks:create`, `ranks:update`, `ranks:delete`, `bank:deposit`, `bank:withdraw`, `bank:history`, `territory:list`.

Admin panel handler names (via the admin bridge): `factions:admin:list`, `disband`, `adjustBank`, `listOnlinePlayers`, `create`, `getFaction`, `addMember`, `removeMember`, `setMemberRank`, `listLinkableGangs`, `setLinkedGang`.

## Other events

| Event | Direction | Purpose |
|---|---|---|
| `ice_factions:server:doZoneActivity` | client → server | Fired by the `/workterritory` keybind; registers capture activity for the player's faction. |

## Exports

```lua
-- server-side
exports.ice_factions:AddTerritoryZone(id, label, coords, radius, income, heading)
-- adds or updates a territory zone at runtime; persists immediately.

exports.ice_factions:RegisterZoneActivity(source)
-- marks a player's recent in-zone activity for capture progress.
-- Rate-limited to once per 2 seconds per identifier.
```

## Extending it

If you want a custom notification hook (e.g. logging territory flips to your own dashboard), the cleanest spot is `AddEventHandler` on the internal territory-capture completion path in `server/territory.lua`, or simply set `Config.Factions.webhooks.url` and consume the Discord webhook payload from another service.
