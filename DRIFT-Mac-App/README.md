# DRIFT for macOS — app project

This packages the supplied DRIFT ambient generator as a desktop macOS app using Electron. It adds an app window, a proper macOS microphone usage description, and permission handling. DRIFT does not request input access on startup; use **Refresh inputs** or **Record input** when you are ready to record.

## Build the Mac app

The build needs a Mac and Node.js (LTS). This is a one-time setup; once built and copied to Applications, DRIFT launches like a normal app and does not require Terminal for everyday use.

1. Install Node.js LTS from https://nodejs.org/ if it is not already installed.
2. Open Terminal in this folder and run:

   ```sh
   npm install
   npm run dist:mac
   ```

3. Open the `dist` folder and open `DRIFT Installer.dmg`. Drag DRIFT into Applications.
4. Open DRIFT from Applications. In macOS System Settings → Privacy & Security → Microphone, allow DRIFT when prompted.
5. Connect the M-Track 2X2 before opening DRIFT. Choose **Refresh inputs**, grant permission, and select the interface.

## Notes

- The app must be built on macOS to produce a native Mac installer.
- The first launch may show a macOS warning because the app is not signed/notarized with an Apple Developer ID. For personal use, macOS may require you to approve it in Privacy & Security. A signed/notarized release would require an Apple Developer account.
- For best capture fidelity, use the M-Track as the input device and disable monitoring in DRIFT if you experience feedback. DRIFT's recording implementation is based on the browser audio APIs provided by Electron.
