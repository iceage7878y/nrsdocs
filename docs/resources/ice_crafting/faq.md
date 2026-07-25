# FAQ

**Nothing happens when I approach a station.**
Check `Config.Target` — if it's pinned to `'ox_target'` or `'qb-target'` but that resource isn't running, detection won't fall back automatically. Set it to `'auto'` or `'none'` to use the built-in E-to-interact prompt.

**Recipe images all show a plain letter tile.**
The NUI resolves `Config.ItemImagePath .. recipe.image .. '.png'` and falls back to a letter tile on a 404 — it's not an error, just a missing image. Point `Config.ItemImagePath` at wherever your inventory resource serves item images from.

**Leveling isn't saving.**
Confirm `database.sql` was imported and `Config.Leveling.enabled = true`. Without the `ice_crafting_levels` table, level lookups silently default to level 0.

**Can players cancel a craft mid-progress?**
Only if `Config.CraftProgress.canCancel = true`. When `true`, cancelling calls the `crafting:cancel` callback — ingredients were never touched, so nothing needs to be refunded.

**A recipe requires an item I don't want consumed (e.g. a tool).**
Use the station's `requiredItem`, not the recipe's `ingredients` — items listed there must be *carried*, not consumed, to use the station at all.
