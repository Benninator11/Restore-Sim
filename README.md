# Restore-Sim — Kuroneko Repair

Ein eigenständiges Browser-Spiel über einen kleinen Elektronik-Reparaturladen in Tokio im Jahr 2005. Das Spiel orientiert sich am Genre gemütlicher Reparatur- und Ladenmanagement-Simulationen, verwendet aber eigene Figuren, Dialoge, Geräte, Namen, 3D-Modelle und Grafiken.

## Spielen

Öffne `index.html` oder veröffentliche den Repository-Root mit GitHub Pages. Die Ordner `css`, `js` und `vendor` müssen ihre Struktur behalten.

## Spielsysteme

### Begehbarer Laden
- 3D-Ansicht aus der Ich-Perspektive mit Tresen, Kundschaft, Werkbank, CRT-PC, Teilelager, Eingang und Dekoration.
- `W`, `A`, `S`, `D` zum Laufen, Maus zum Umschauen, `Shift` zum Sprinten und `E` zum Interagieren.
- Unsichtbare Kollisionen verhindern, dass man durch Tresen, Tische und Regale läuft.
- Touch-Steuerung und Schnellaktionen für Mobilgeräte.
- Pflanze, Kundenstuhl, Neonschild und Zusatzregal können mit Spielgeld gekauft werden und erscheinen im 3D-Laden.

### Kunden, Aufträge und Geschichte
- Kundengespräche mit Entscheidungen und verzweigter Geschichte.
- Persönliche Kunden am Tresen sowie zusätzliche Online-Aufträge im Posteingang.
- Preisangebote, Ruf im Viertel, Kassenstand, Tagesmiete und täglicher Ladenabschluss.
- Reparierte Geräte können ausprobiert und später abgeholt oder versendet werden.

### Reparaturwerkstatt
- 24 unterschiedliche nostalgische Geräte aus mehreren Familien: Handhelds, Telefone, Konsolen, Musikplayer, Kameras, Drucker und mehr.
- Schrauben lösen, Gehäuse öffnen, Platinen ausbauen, Bauteile prüfen, reinigen, ersetzen und wieder zusammensetzen.
- Einzelne Lötstellen, Pins, Mikro-ICs und SMD-Bauteile.
- Werkzeuge werden mit abgeschlossenen und abgeholten Reparaturen freigeschaltet.
- 3D-Geräte- und Platinenansicht mit Drehfunktion.

### PC und Ersatzteile
- Retro-Webseite mit Lesezeichen, Akiba-Parts, Posteingang und Kassenbuch.
- Passende Ersatzteile, Chips und SMD-Bauteile bestellen; Lieferung am nächsten Spieltag.
- Gebrauchtteilemarkt mit festen Preisen und reduzierten Angeboten für Teile aus aktiven Aufträgen.
- Spielstand wird lokal im Browser gespeichert (`localStorage`).

## Entwicklung und Tests

- `index.html` — Einstieg und Skript-Reihenfolge
- `css/style.css` — Gestaltung, Werkbank, Browser und responsive Oberflächen
- `js/game.js` — Spielsysteme, Geräte, Dialoge, Aufträge und Reparaturen
- `js/shop3d.js` — begehbare 3D-Ladenwelt
- `js/device3d.js` — 3D-Ansicht der Geräte
- `vendor/three.min.js` — lokal eingebundene Three.js-Bibliothek
- `tests/` — Playwright-Browser-Regressionstests

Browser-Tests:

```bash
npm install
npx playwright install chromium
npm run test:browser
```

## Hinweis

Restore-Sim ist ein unabhängiges, von Reparatur-Simulationen inspiriertes Projekt und steht in keiner Verbindung zu Mandragora oder tinyBuild. Es enthält keine kopierten Originalgrafiken oder Originaldateien von ReStory.
