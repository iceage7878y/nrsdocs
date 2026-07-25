# Events & Exports

Ice_crafting doesn't expose public `exports` — the client and server talk over a small internal NUI-callback bridge built on two events:

| Event | Direction | Purpose |
|---|---|---|
| `ice_crafting:server:callback` | client → server | Wraps every callback request below with a request id |
| `ice_crafting:client:callbackResult` | server → client | Returns the matching response |

These aren't meant to be triggered directly from other resources — they're plumbing for the callback names below.

## Callbacks

Registered server-side with `registerCallback(name, handler)`, invoked from the client via `awaitCallback` / `queueCallback`.

| Callback | Called when | Notes |
|---|---|---|
| `crafting:getData` | NUI opens | Returns the station's categories/recipes, filtered by job/level, plus the player's current inventory counts for ingredient checks. |
| `crafting:begin` | Player clicks Craft | Validates job, required item, level, and ingredients. Does **not** touch inventory yet — only starts the server-side timer. |
| `crafting:cancel` | Player cancels the progress bar | Only relevant if `Config.CraftProgress.canCancel = true`. |
| `crafting:finish` | Progress bar completes client-side | Re-validates everything (inventory can have changed mid-craft), then consumes ingredients and grants the result. This is the only point at which items actually move. |

This begin/finish split is what makes crafting server-authoritative: a disconnect or interruption between `begin` and `finish` costs the player nothing, and a client can't shortcut past `finish` to get the reward without the server's own timer having elapsed (see `FINISH_TOLERANCE_MS` in `server/crafting.lua`).

## Extending it

If you need to hook into a craft completing (e.g. to fire off a Discord log or award something extra), the safest place is inside the `crafting:finish` handler in `server/crafting.lua`, after the existing validation succeeds — not via an external event, since none is currently fired on success.
