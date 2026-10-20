# Jezero Rover — monorepo modular
Juego web: eres un rover tipo Perseverance en el cráter Jezero y completas tareas científicas reales para la base humana.
`npm install && npm run dev` · tests: `npm test`

| Paquete | Capa (Clean Architecture) | Depende de |
|---|---|---|
| `packages/core` | Dominio + aplicación (reglas, misiones, progresión, `GameSession`) | nada |
| `packages/infrastructure` | Adaptadores (persistencia) | — |
| `packages/renderer` | Presentación (canvas cel-shading, HUD) | core |
| `apps/web` | Composition root (Vite) | todos |

Patrones: Facade (`GameSession`), Observer (`EventBus`), Repository (puerto/adaptador), Strategy (efectos por instrumento), DIP en la composición.
Añadir una misión = una entrada en `missions.js` (+ un efecto opcional en `FX`).
Siguientes pasos: paquete `audio`, `content` (misiones en JSON), mapa/terreno procedural, Ingenuity.
