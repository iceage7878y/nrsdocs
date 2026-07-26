# Configuration

All configuration lives in `config/factions.lua`.

## Framework & access

```lua title="config/factions.lua"
Config.Framework = 'auto'                    -- 'auto' | 'qbox' | 'esx'
Config.FactionsAdminAce = 'command.factionsadmin'
```

`/factionsadmin` is gated by the ACE above — grant it with `add_ace group.admin command.factionsadmin allow`. It works standalone, with or without Ice_tablet installed.

## Factions

```lua title="config/factions.lua"
Config.Factions = {
    maxMembers = 20,
    permissions = {
        { key = 'invite', label = 'Invite Members' },
        { key = 'kick', label = 'Kick Members' },
        { key = 'promote', label = 'Promote' },
        { key = 'demote', label = 'Demote' },
        { key = 'manage_ranks', label = 'Manage Ranks' },
        { key = 'manage_bank', label = 'Manage Bank' },
        { key = 'edit_faction', label = 'Edit Faction' },
        -- reserved for future phases:
        { key = 'start_wars', label = 'Start Wars' },
        { key = 'manage_territory', label = 'Manage Territory' },
    },
    defaultRanks = {
        { name = 'Recruit', level = 0 },
        { name = 'Member', level = 1 },
        { name = 'Officer', level = 2, permissions = { 'invite', 'kick', 'promote' } },
        { name = 'Leader', level = 3, isLeader = true, maxHolders = 3, permissions = 'all' },
    },
}
```

Every new faction is seeded with `defaultRanks`. Leader is capped at `maxHolders = 3` — a 4th promotion is rejected server-side.

## Qbox gang sync

```lua title="config/factions.lua"
Config.Factions.qboxGangSync = { enabled = true }
```

Qbox-only. Mirrors a faction's rank/membership onto a linked `qbx_core` gang. Linking is set per-faction from the admin panel (`factions:admin:setLinkedGang`).

## Integrations

```lua title="config/factions.lua"
Config.Factions.webhooks = {
    url = '', -- Discord webhook URL; leave empty to disable
    events = { factionCreate = true, factionDisband = true, territoryCapture = true },
}
Config.Factions.lbPhoneAlerts = { enabled = true } -- requires lb-phone running
```

## Territory

```lua title="config/factions.lua"
Config.Factions.territory = {
    tickSeconds = 20,             -- how often capture progress is evaluated
    pointsPerTick = 25,           -- points awarded per tick to the contesting faction
    ticksToCapture = 20,          -- 25 * 20 = 500 points needed to flip a zone
    incomeIntervalSeconds = 300,  -- passive income payout interval for owned zones
    activityWindowSeconds = 40,   -- how recently a member must have been active in-zone
    zones = {
        -- ~85 entries by default:
        { id = 'downtown_ls', label = 'Downtown Los Santos', coords = vec3(0,0,0), radius = 120.0, heading = 0.0, income = 500 },
        -- ...
    },
}
```

!!! note "Presence alone doesn't capture a zone"
    A faction needs *recent* activity (`RegisterZoneActivity`, fired by the `/workterritory` keybind) inside the zone, not just a member standing in it. If two or more factions are present at once, the zone is contested and neither gains progress.

!!! warning "Zone count vs. performance"
    Each territory zone renders as its own DUI via `MapZones`. ~85 zones is the shipped default — trim `Config.Factions.territory.zones` if players on weaker hardware see FPS drops.
