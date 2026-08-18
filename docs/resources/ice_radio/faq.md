# FAQ

**Which voice backend should I use?**
`pma-voice` — it's the supported default and less to maintain. Only use `standalone` if you know what you're doing: it's a real second process (its own ports, secrets, and a from-scratch P25 IMBE codec) that you have to run and keep online yourself, separate from anything FXServer manages.

**Standalone voice isn't connecting.**
`voice_server/` is not auto-started by FXServer — it must be run with `npm start` and kept alive (a process manager, not a `server.cfg` `ensure`). Confirm its ports (`30125` voice/control, `30127` Socket.IO) aren't colliding with anything else, and that `tokenSecret`/`restToken` match between `config.lua` and the Node process's env vars.

**Two trunked talkgroups keep colliding / the wrong one picks up.**
Check `Config.PmaVoice.channelMode` — `'frequency'` keys pma-voice channels off `floor(frequency)`, which can collide across trunked 851.x talkgroups that round to the same value. Switch to `channelMode = 'id'` (the default).

**No sound at all, or it's just simple placeholder tones.**
`html/sounds/` ships with a minimal placeholder pack — swap in your own `.wav` files any time, the paths are all set in `Config.Sounds`.

**Persistence tables don't exist.**
They auto-create via oxmysql when `Config.Persistence.autoImport = true`. If you disabled it, import `sql/schema.sql` manually.

**How do trunked channels differ from conventional?**
Conventional channels use a fixed `frequency`. Trunked channels use a `zone` → `talkgroups` structure — softkeys (ZONE/arrows) change zone, CH up/down changes talkgroup. Both support `jobs` restriction and optional `encrypted` gating.

**Can I add a new radio face without touching Lua?**
Yes — faces are data under `layouts/<name>/` (`config.json`, `ui.html`, `radio.png`, optional `radio-dark.png`/`tones.json`/`fonts`/`icons`/`sounds`). Add the folder, list it in `layouts/index.json`, then point `Config.UI.defaultLayout` or `Config.JobRadioLayouts` at it.

**I want a native P25 vocoder, not the JS one.**
Set `USE_NATIVE_IMBE=1` and provide `voice_server/codec/native.node` (an mbelib/DVSI binding). Without it, the bundled `imbe.js` framer is used.
