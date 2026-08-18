# FAQ

<<<<<<< HEAD
**Nothing happens when I press F3 / open the radio.**
Check `Config.Items.requireEquipped` — if `true`, you need the `radio` item; there's no automatic fallback. Set it to `false` while testing, or make sure the item names in `Config.Items` match your inventory setup (see [Installation](installation.md)).
=======
**Which voice backend should I use?**
If you already run `pma-voice`, use that — it's less to maintain. Use `standalone` only if you don't want a pma-voice dependency at all; it's a real second process you have to keep running yourself.
>>>>>>> parent of 222bff7 (Update)

**I switched `Config.VoiceBackend` and radio audio stopped working.**
`'standalone'` needs the Node companion running (`cd voice_server && npm start`) — nothing plays without it. `'pma-voice'` needs `pma-voice` itself `ensure`d before `ice_radio` in `server.cfg`. Either way, `VoiceBackend` only changes which layer carries the audio; channels, UI, and admin code are unaffected — see [Configuration](configuration.md#framework-voice-backend).

<<<<<<< HEAD
**Two trunked talkgroups keep colliding / the wrong one picks up.**
You're probably on `Config.PmaVoice.channelMode = 'frequency'`, which floors the frequency to key channels — trunked 851.x talkgroups can round to the same value. Switch to `channelMode = 'id'` (the default).

**Panic doesn't move the player to the panic channel.**
That's intentional. `Config.Panic.forceChannel` is `false` by default — `notifyJobs` hear the tone and see the blip without the triggering player's channel changing.
=======
**No sound at all / placeholder tones.**
The README explicitly warns that `html/sounds/` ships with placeholders — replace them with a real sound pack.
>>>>>>> parent of 222bff7 (Update)

**What audio format does standalone mode actually send?**
`voice_server/codec/imbe.js` frames PCM at 8 kHz / 20 ms / 88-bit (11-byte) IMBE-sized frames — the same rate family as Motorola APX / Harris XL-185, which is what gives it the "real radio" sound rather than a cosmetic EQ filter. Set the `USE_NATIVE_IMBE=1` environment variable and provide `voice_server/codec/native.node` (an mbelib/DVSI binding) to swap in a native encoder.

**Can I change audio settings (like interference distortion) without restarting?**
Yes — with `Config.Admin.liveSettingsBroadcast = true` (default), the `SetLiveSetting` export or the REST `POST /settings` endpoint push `Config.AudioFX` values like `bonkDistortion` to connected clients live. See [Events & Exports](events-exports.md#rest-api).

<<<<<<< HEAD
**A player has no radio faces to pick from, or `/radiosettings` is empty.**
`client/layouts.lua` discovers faces from `layouts/index.json` on start — check the server console for `[ice_radio] Discovered N PNG radio layouts` and any `WARNING: layouts/<id>/config.json missing or invalid` lines.
=======
**Can I add a new radio face without touching Lua?**
Yes — layouts are data under `layouts/<name>/` (`config.json`, `ui.html`, icons, fonts, optional sounds). Add a folder and a `layout.css`, then reference it in `Config.UI.defaultLayout` or `Config.JobRadioLayouts`.

**I want a native P25 vocoder, not the JS one.**
Set `USE_NATIVE_IMBE=1` and provide `voice_server/codec/native.node` (an mbelib/DVSI binding). Without it, the bundled `imbe.js` framer is used.
>>>>>>> parent of 222bff7 (Update)
