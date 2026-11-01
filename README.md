# Restore-Sim — Kuroneko Repair

Ein eigenständiges Browser-Spiel über einen kleinen Elektronik-Reparaturladen in Tokio im Jahr 2005. Es greift das gemütliche Reparatur-, Ladenverwaltungs- und Story-Gefühl von ReStory auf, verwendet aber eigene Namen, Dialoge, 3D-Modelle und Grafiken.

## Spielen

Öffne die GitHub-Pages-Seite oder starte lokal index.html. Die Ordnerstruktur css, js und vendor muss erhalten bleiben.

### Laden – Ich-Perspektive

- Begehbarer 3D-Reparaturladen mit Tresen, Kundschaft, ESD-Werkbank, CRT-PC, Ersatzteillager, Postern und Eingangstür.
- W/A/S/D zum Laufen, Maus zum Umschauen und E zum Interagieren.
- Die Schnellaktionen am rechten Rand öffnen Kunde, Werkbank, PC, Aufträge oder Feierabend direkt.
- Auf Mobilgeräten stehen Touch-Steuerung und Schnellaktionen bereit.

### Reparieren

- Geräte umdrehen, Schrauben lösen, Gehäuse öffnen und Platinen ausbauen.
- Einzelne Bauteile, Mikro-ICs und SMD-Kontakte prüfen, reinigen und ersetzen.
- Werkzeuge werden mit abgeholten Reparaturen freigeschaltet.
- Die Geräteansicht nutzt eine separate 3D-Werkbank.

### Ladenverwaltung und Geschichte

- Persönliche Kunden, Online-Aufträge, Ersatzteilbestellungen und ein Retro-Webbrowser.
- Kassenbuch, Tagesmiete, Ruf im Viertel und Lieferungen.
- Entscheidungen in Kundengesprächen beeinflussen den weiteren Verlauf und die Enden.
- Spielstände liegen lokal im Browser (localStorage).

## Entwicklung und Tests

- index.html — Einstieg und Skript-Reihenfolge
- css/style.css — Gestaltung, HUD und responsive Oberflächen
- js/game.js — Spielsysteme, Dialoge, Aufträge und Reparaturen
- js/shop3d.js — begehbare Ich-Perspektive des Ladens
- js/device3d.js — 3D-Geräte- und Platinenansicht
- vendor/three.min.js — lokal eingebundene Three.js-Bibliothek
- tests/ — Playwright-Browser-Regressionstests

Browser-Tests starten mit npm install, npx playwright install chromium und npm run test:browser.

## Hinweis

Restore-Sim ist ein unabhängiges fan-inspiriertes Projekt und steht in keiner Verbindung zu Mandragora oder tinyBuild. Es enthält keine kopierten Originalgrafiken oder Originaldateien von ReStory.
