# Configuration

All configuration lives in `config.lua`.

## Framework / dependencies

```lua title="config.lua"
Config.Framework = 'auto'   -- 'auto' | 'qbox' | 'esx'
Config.Inventory = 'auto'   -- 'auto' | 'ox_inventory' | 'qb-inventory'
Config.Target = 'auto'      -- 'auto' | 'ox_target' | 'qb-target' | 'none'
Config.Locale = 'en'        -- 'en' | 'da' — falls back to 'en' for missing keys
Config.Debug = false
```

`'auto'` detects what's running via the `bridge/` folder at boot. Pin an explicit value if auto-detection ever picks the wrong system.

## Camera

The crafting UI uses a scripted camera positioned in front of the station, looking down at the tabletop.

```lua title="config.lua"
Config.Camera = {
    enabled = true,
    offset = vector3(0.0, 0.0, 1.70),      -- eye height above the station
    pointOffset = vector3(0.0, 0.0, 0.90), -- look-at height (tabletop)
    frontDistance = 1.25,                  -- meters out from station toward the player
    fov = 48.0,
    transitionMs = 420,
}
```

Set `enabled = false` to skip the camera entirely and just open the NUI in place.

## Craft progress

```lua title="config.lua"
Config.CraftProgress = {
    canCancel = false, -- allow cancelling the progress bar with X
    anim = {
        dict = 'mini@repair',
        clip = 'fixing_a_ped',
        flag = 49,
    },
}
```

## Leveling

Optional per-category XP/levels, gating recipes via `requiredLevel`.

```lua title="config.lua"
Config.Leveling = {
    enabled = true,
    xpPerLevel = 100, -- level = floor(xp / xpPerLevel)
    xpPerCraft = 10,  -- default XP per craft, overridable per-recipe via Recipes[].xp
}
```

Requires importing `database.sql` (`ice_crafting_levels` table). See [Installation](installation.md#database).

## Stations

Each station is a physical prop in the world.

```lua title="config.lua"
Config.Stations = {
    {
        id = 'workbench_legion',
        label = 'Workbench',
        categories = { 'workbench' },
        coords = vec4(142.1484, -1288.2993, 28.3641, 30.0),
        spawnProp = true,               -- true: resource spawns+freezes the prop itself
        prop = 'prop_tool_bench02',
        size = vec3(1.6, 1.0, 1.4),
        target = { icon = 'fas fa-hammer', distance = 2.0 },
        requiredJob = nil,               -- nil = anyone, or e.g. { 'mechanic' }
        requiredItem = nil,              -- optional item that must be carried (not consumed)
        blip = { sprite = 566, color = 0, scale = 0.75 },
    },
}
```

Set `spawnProp = false` when `coords` already lines up with an existing map prop (e.g. a workbench that's already part of an interior) and you only want the interaction zone, not a duplicate prop.

## Categories

```lua title="config.lua"
Config.Categories = {
    workbench = {
        label = 'Workbench',
        icon = '<svg ...>', -- inline SVG shown as the category tab icon
    },
}
```

## Recipes

```lua title="config.lua"
Config.Recipes = {
    {
        id = 'lockpick',
        label = 'Lockpick',
        category = 'workbench',
        image = 'lockpick',       -- resolved against Config.ItemImagePath
        time = 6000,               -- craft duration in ms
        result = { item = 'lockpick', amount = 1 },
        ingredients = {
            { item = 'money', amount = 3 },
        },
        requiredLevel = 0,          -- only checked if Leveling is enabled
        xp = 10,
        requiredJob = nil,
        failChance = 0,             -- 0-100, chance ingredients are consumed with no result
    },
}
```

!!! note "Ingredient/result item names"
    `result.item` and `ingredients[].item` must match item names that exist in your inventory system (ox_inventory / qb-inventory), not arbitrary strings.
