# Password Strength Analyzer

A client-side password strength analyzer built with React and Vite. Evaluates
password composition, entropy, estimated crack resistance, and checks against
a sample list of commonly breached passwords — entirely in the browser. Also
includes a cryptographically secure password generator.

## Stack

- React 18
- Vite
- Web Crypto API (`crypto.getRandomValues`) for password generation
- Google Fonts (Space Grotesk, IBM Plex Sans, IBM Plex Mono)
- Plain CSS (no UI framework)

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL in your browser.

## Build

```bash
npm run build
npm run preview
```

## Notes

Analysis and generation run entirely client-side; no password is transmitted
or stored anywhere. The breach check uses a small illustrative sample list,
not a full leaked-credential database. Server-side features from the original
project spec (user accounts, password-history hashing, admin dashboard,
cross-session analytics) are intentionally out of scope for this front end —
they require a backend (e.g. Flask/PostgreSQL with bcrypt or Argon2).
