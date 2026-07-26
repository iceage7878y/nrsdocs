# FAQ

**There's no "buy bank" option for players.**
Correct — ownership is only assigned/removed by an admin through `/banks admin` (`banks:setOwner`/`removeOwner`). There's no in-game purchase mechanic despite the resource's name.

**A deposit into the bank doesn't overcharge the player.**
Deposits made through the management app are clamped to remaining room under `maxBankBalance` *before* cash is taken — you can't lose money to a bank that's already at its cap.

**I disabled `builtinNpcTransactions` and the player app looks empty.**
Only the deposit/withdraw section is hidden — loans and activity history remain visible.

**Dispatch alerts aren't firing on my dispatch fork.**
Dispatch integrations are best-effort across community forks with varying event names. Hook `ownablebanks:server:robberyStarted`/`robberyEnded` directly instead of relying on the bundled bridge.

**Police response time always shows null.**
By design — there's no reliable framework-agnostic way to measure it, so `police_response_seconds` is never populated.

**A bank got stuck in "robbery" status after a crash.**
No automatic recovery exists for this — force-close and reopen it via the admin panel.

**A loan under the auto-approve limit still got rejected.**
Bank balance sufficiency is checked at approval time too (auto or manual) — if the bank can't cover the loan amount, approval fails even under `autoApproveLimit`.

**Framework detection isn't finding my framework.**
Detection retries for ~10 seconds on boot. A `No supported framework detected` warning or nil `Framework.*` errors usually mean `Ice_ownablebanks` started before `qbx_core`/`es_extended` in `server.cfg`.
