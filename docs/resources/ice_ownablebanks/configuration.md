# Configuration

All configuration lives in `config.lua`.

## Framework & integrations

```lua title="config.lua"
Config.Framework = 'auto'    -- 'auto' | 'qbox' | 'esx'
Config.Inventory = 'auto'    -- 'auto' | 'ox_inventory' | 'qb-inventory'
Config.Target = 'auto'       -- 'auto' | 'ox_target' | 'qb-target'
Config.Dispatch = 'auto'     -- 'auto' | 'cd_dispatch' | 'ps-dispatch' | 'qb-dispatch' | 'none'
Config.Locale = 'en'         -- 'en' | 'da'
Config.AdminAce = 'ownablebanks.admin'
```

Dispatch integration is best-effort — it never throws if event names don't match your installed fork. The resource always fires its own `ownablebanks:server:robberyStarted`/`robberyEnded` events regardless, so custom dispatch hooks should listen to those instead of relying on the bundled bridge.

## Banks

```lua title="config.lua"
Config.Banks = {
    {
        id = 'fleeca_legion',
        name = 'Fleeca — Legion Square',
        isPublic = false,
        pedModel = `a_m_m_business_01`,
        coordsManagement = vec4(0, 0, 0, 0),
        coordsVault = vec4(0, 0, 0, 0),
        coordsFacade = vec4(0, 0, 0, 0),
    },
}
```

`id` maps to the DB row via `config_id`.

## Economy

```lua title="config.lua"
Config.Economy = {
    incomePercent = 3.0,          -- % of every NPC transaction skimmed to the owning bank
    maxBankBalance = 500000,      -- hard cap; income beyond it is dropped
    builtinNpcTransactions = true, -- built-in ATM-style deposit/withdraw flow
    npcTransactionMin = 50,
    npcTransactionMax = 5000,
}
```

Set `builtinNpcTransactions = false` to use your own ATM script instead, reporting income via the `ReportNpcTransaction` export.

## Robbery

```lua title="config.lua"
Config.Robbery = {
    cooldownMinMinutes = 45,
    cooldownMaxMinutes = 90,
    minPoliceOnline = 0,
    payoutMinPercent = 10,
    payoutMaxPercent = 25,
    dirtyCashItem = 'markedbills',
    placementDifficulty = { 'easy' },
    minigameDifficulty = { 'easy', 'medium', 'hard' },
    blockRobberyIfSecured = false,
    secureUpgradeCost = 25000,
    securedMinPoliceBonus = 2,
    securedCooldownBonusMinutes = 30,
}
```

`dirtyCashItem` must exist in your inventory. If `blockRobberyIfSecured = false` (default), a secured bank isn't immune — it just requires more police online and adds cooldown time.

## Staff & loans

```lua title="config.lua"
Config.Staff = {
    accessLevels = {
        cashier = { maxWithdraw = 5000 },
        manager = { maxWithdraw = -1 }, -- -1 = unlimited (still capped by actual balance)
    },
}

Config.Loans = {
    minAmount = 1000,
    maxAmount = 100000,
    interestRate = 8.0,           -- flat, whole-term
    repaymentDays = 7,
    installmentCount = 7,
    autoApproveLimit = 10000,     -- loans at/under this skip admin review
    maxActiveLoansPerPlayer = 1,
    blockNewLoansAfterDefault = true,
    schedulerIntervalMinutes = 5, -- installment-collection tick rate
}
```

!!! warning "Missed installments default immediately"
    There's no retry/grace window — a missed installment flags the loan `defaulted` on the spot, and with `blockNewLoansAfterDefault = true` that player is permanently barred from new loans.
