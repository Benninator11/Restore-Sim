# Restore-Sim — Kuroneko Repair

Ein browserbasiertes Elektronik-Reparaturspiel im Retro-Japan-Stil.

## Starten

Die Projektdateien liegen im Repository. Öffne `index.html` direkt im Browser oder veröffentliche den Repository-Root mit GitHub Pages.

## 3D-Werkbank

Die Werkbank verwendet eine lokal mitgelieferte Three.js-WebGL-Bibliothek. Geräte besitzen echte Gehäusetiefe, extrudierte Kanten und räumliche Bauteile; die Platinenansicht zeigt erhöhte ICs und SMD-Komponenten. Die bisherigen SVG-Interaktionsflächen bleiben für Schrauben, Pins und Werkzeuge erhalten.

Die lokale Three.js-Datei basiert auf Three.js r159 und steht unter MIT-Lizenz. Lizenztext: `vendor/THREE-LICENSE.txt`.

## Projektstruktur

- `index.html` — Spieleinstieg
- `css/style.css` — Gestaltung und Animationen
- `js/game.js` — Spielsysteme und Interaktionen
- `js/device3d.js` — 3D-Modelle und WebGL-Werkbank
- `vendor/three.min.js` — lokal mitgeliefertes Three.js
- `Kuroneko_Repair_Project.zip` — vollständiges Projektpaket zum Herunterladen

## Lokal starten

Repository herunterladen oder klonen und `index.html` im Browser öffnen. `css` und `js` müssen ihre Ordnerstruktur behalten.

## Hinweis

Der Spielstand wird lokal im Browser gespeichert.
