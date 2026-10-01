@AGENTS.md

## Publicación (decisión del dueño)

- Los cambios del sitio se publican **directo en `main`**: commit y push a `main`,
  sin rama aparte ni Pull Request. Vercel despliega `main` automáticamente en
  https://hhm-proyectos-website.vercel.app/ (sitio oficial).
- Otras ramas solo generan una vista previa de Vercel con su propio link; no
  actualizan el sitio oficial.
- Antes de subir, validar con `npx tsc --noEmit`, `npx eslint` y `npx next build`.
