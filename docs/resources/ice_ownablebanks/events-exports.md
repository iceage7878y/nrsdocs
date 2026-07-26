# Events & Exports

## Domain events

Fired via `TriggerEvent` (server-side), for other resources to hook with `AddEventHandler` — e.g. custom dispatch, Discord logging, or leaderboards:

| Event | Payload |
|---|---|
| `ownablebanks:server:robberyStarted` | `bankId, robberIdentifier` |
| `ownablebanks:server:robberyEnded` | `bankId, result, payout` |
| `ownablebanks:server:ownerChanged` | `bankId, ownerType, ownerIdentifier, actorIdentifier` |
| `ownablebanks:server:loanApproved` | `loanId, bankId, borrowerIdentifier, amount` |
| `ownablebanks:server:loanDefaulted` | `loanId, bankId, borrowerIdentifier` |

## Callback bridges

Three independent request/response channels (client fires `...Callback(requestId, name, payload)`, server dispatches to a named handler table and replies via `...CallbackResult`) — the same home-grown pattern Ice_tablet uses, not `lib.callback`:

| Bridge | Events | Gate |
|---|---|---|
| Admin | `ownablebanks:server:adminCallback` → `adminCallbackResult` | ACE (`Config.AdminAce`) |
| Banking | `ownablebanks:server:bankingCallback` → `bankingCallbackResult` | none |

Admin handlers: `banks:list/get/update/setOwner/removeOwner/forceClose/resetCooldown/adjustBalance`, `staff:list/add/remove`, `transactions:list`, `robberies:list`, `loans:list/approve/reject`, `orgs:list`, `players:search`.

Banking handlers: `banking:getData`, `banking:transaction`, `banking:applyLoan`, `banking:payOffLoan`.

Server → client: `ownablebanks:client:openAdmin`, `adminRefresh`, `syncBanks`, `robberyApproved`, `notify`.

## Exports

```lua
-- server-side
exports.Ice_ownablebanks:GetBankOwner(bankId)          --> { type, identifier }
exports.Ice_ownablebanks:IsPlayerBankStaff(source, bankId) --> boolean
exports.Ice_ownablebanks:GetBankBalance(bankId)        --> number | nil
exports.Ice_ownablebanks:GetPlayerActiveLoans(identifier) --> rows (pending/active)
exports.Ice_ownablebanks:ReportNpcTransaction(bankId, amount)
-- called by your own ATM/deposit script to attribute income to a bank
-- without duplicating this resource's deposit/withdraw logic.
```
