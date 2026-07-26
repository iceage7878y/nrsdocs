# Custom Apps

Ice_tablet's Custom App SDK lets any resource inject its own app into the dock/desktop without editing a single core file. The companion `Ice_tablet_example_app` resource ("Note Counter") is the working reference for everything below — **it must `ensure` after `Ice_tablet`** in `server.cfg`, since `RegisterApp` errors if called before Ice_tablet has started (there's no manifest-level `dependency` enforcing this, only load order).

## 1. Register the app (client)

```lua
exports.Ice_tablet:RegisterApp({
    id = 'note_counter',
    label = 'Notes',
    icon = 'notes',          -- or iconSvg = '<svg ...>'
    scriptUrl = 'https://cfx-nui-my_resource/html/app.js',
    styleUrl = 'https://cfx-nui-my_resource/html/app.css',
    dock = true,
})
```

Call this once at resource start. `scriptUrl`/`styleUrl` use the `https://cfx-nui-<resource>/...` scheme — the paths **must also be listed in your own resource's `fxmanifest.lua` `files{}`**, or they 404 silently. This is the single most common mistake when adding a custom app.

## 2. Build the NUI-side app

Your injected script runs in the *same page* as the tablet shell (not sandboxed), and registers through the same registry every built-in app uses:

```js
window.IceOS.registerApp({
    id: 'note_counter',
    label: 'Notes',
    icon: 'notes',
    mount(container, ctx) {
        // runs every time the app is opened, not just once —
        // persist state outside mount(), or refetch from your server callback.
    },
    unmount() {},
});
```

Helpers available on `window.IceOS`: `notify`, `prompt`, `confirmDialog`, `select`, `icon`, `state`. Style with the shell's CSS custom properties (`--surface`, `--text`, etc.) rather than hardcoded colors, and prefix your own classes to avoid clashing with the globally-loaded stylesheet. Avoid `backdrop-filter` — it breaks CEF's alpha compositing in this shell.

## 3. Register a server callback

```lua
exports.Ice_tablet:RegisterServerCallback('note_counter:get', function(source, payload)
    return { count = 0 } -- example.lua's example uses an in-memory table
end)

exports.Ice_tablet:RegisterServerCallback('note_counter:increment', function(source, payload)
    -- validate payload — it is NOT trustworthy, unlike `source`
end)
```

Call from your NUI-side app via `NUI.call('note_counter:get', payload)`. `source` is trustworthy (comes from the client's authenticated connection); `payload` is not — validate it server-side exactly like any other client-supplied event.

## What `Ice_tablet_example_app` looks like end to end

- `fxmanifest.lua` declares only `client_script`, `server_script`, and `files{}` — no formal `dependency 'Ice_tablet'` entry. Enforcement is purely via `server.cfg` load order.
- `client.lua` registers app id `note_counter` and an `/opennotecounter` command that calls `exports.Ice_tablet:OpenApp('note_counter')`.
- `server.lua` registers `note_counter:get`/`note_counter:increment` backed by a plain in-memory Lua table — **not persisted**. Swap in `oxmysql` following the pattern in `server/apps/*.lua` if you need it to survive a restart.

!!! tip "Persistence isn't free"
    The example app is deliberately minimal and doesn't persist state. Any real custom app storing player data should follow one of Ice_tablet's own `server/apps/*.lua` files as a template for the oxmysql calls.
