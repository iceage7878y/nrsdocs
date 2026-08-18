# FAQ

**Which voice backend should I use?**
If you already run `pma-voice`, use that — it's less to maintain. Use `standalone` only if you don't want a pma-voice dependency at all; it's a real second process you have to keep running yourself.

**Standalone voice isn't connecting.**
`voice_server/` is not auto-started by FXServer — it must be run with `npm start` and kept alive (a process manager, not a `server.cfg` `ensure`). Confirm its ports (`30125` voice/control, `30127` Socket.IO) aren't colliding with anything else, and that `tokenSecret`/`restToken` match between `config.lua` and the Node process's env vars.

**No sound at all / placeholder tones.**
The README explicitly warns that `html/sounds/` ships with placeholders — replace them with a real sound pack.

**Persistence tables don't exist.**
They auto-create via oxmysql when `Config.Persistence.autoImport = true`. If you disabled it, import `sql/schema.sql` manually.

**How do trunked channels differ from conventional?**
Conventional channels use a fixed `frequency`. Trunked channels use a `zone` → `talkgroups` structure — softkeys (ZONE/arrows) change zone, CH up/down changes talkgroup. Both support `jobs` restriction and optional `encrypted` gating.

**Can I add a new radio face without touching Lua?**
Yes — layouts are data under `layouts/<name>/` (`config.json`, `ui.html`, icons, fonts, optional sounds). Add a folder and a `layout.css`, then reference it in `Config.UI.defaultLayout` or `Config.JobRadioLayouts`.

**I want a native P25 vocoder, not the JS one.**
Set `USE_NATIVE_IMBE=1` and provide `voice_server/codec/native.node` (an mbelib/DVSI binding). Without it, the bundled `imbe.js` framer is used.
