# Installation

No hard dependency is declared — this resource is designed to run standalone.

## Requirements

- Nothing required. Optional: a framework (ESX/QBCore/Qbox) if using `Config.PermissionMode = 'framework'`, ox_target/qb-target for target-style interaction, `qbx_vehiclekeys` and/or a police-job resource for deeper integration.

## Steps

1. Copy the folder into `resources/`.
2. Add `ensure fleet_kiosk` to `server.cfg` — no particular load order is required since there's no hard dependency.
3. **Assets.** The resource ships with **no binary assets by design** — drop vehicle images into `html/images/vehicles/`, sounds into `html/sounds/`, agency logos into `html/images/logos/` (see the `README.txt` in each `html/` subfolder). The UI degrades gracefully without them (falls back to `fallback.png` or hides via `onerror`).
4. Restart the resource.
5. Grant `/fleetadmin` access via an ACE group:

    ```
    add_ace group.fleetadmin fleet_kiosk.admin allow
    add_principal identifier.license:xxxx group.fleetadmin
    ```

    (`IsAdmin()` also falls back to accepting the built-in `command` ACE, so an existing admin group may already work.)
6. If editing the NUI source: `cd web && npm install && npm run build`, then copy `html/assets` + `html/index.html` back.

!!! warning "Vite build inside bracketed folders"
    The README notes Vite can fail to resolve `/src/main.ts` inside folder names containing brackets, like `[Scripts]`/`[Police]`. Build outside a bracketed path if you hit this, then copy the output back in.

## Verifying it works

1. As a permitted officer, interact with a kiosk laptop and confirm the terminal UI opens.
2. Deploy a vehicle and confirm it spawns cleanly (no blocking, correct spawn point).
3. Confirm you can't deploy a second vehicle while one is already active (`Config.ActiveVehicle.onDuplicateSpawn` behavior).
4. Return or store the active vehicle and confirm the kiosk reflects the change.
5. As an admin, run `/fleetadmin` and confirm you can edit a kiosk or vehicle definition live.
