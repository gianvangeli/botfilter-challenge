# Botfilter Challenge (React)

Aplicación en React que:
- Obtiene los datos del candidato por email
- Lista posiciones abiertas desde la API
- Permite ingresar la URL del repo por posición y enviar la postulación

## Demo
- Repo: https://github.com/gianvangeli/botfilter-challenge
- Deploy: (agregar acá cuando lo hagas) https://<tu-url>.vercel.app

## API
Base URL:
`https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net`

Endpoints usados:
- `GET /api/candidate/get-by-email?email=<EMAIL>`
- `GET /api/jobs/get-list`
- `POST /api/candidate/apply-to-job`

> Nota: Durante el desarrollo, se detectó que el endpoint `apply-to-job` valida `applicationId` además de los campos indicados en el enunciado. Se incluyó ese campo en el payload para cumplir la validación del backend.

## Requisitos cubiertos
- React
- Listado de posiciones obtenido desde API
- Input de repo + botón Submit por posición
- Envío de postulación con body correcto
- Manejo de estados de carga y errores en UI
- UI simple y funcional

## Stack / decisiones
- React + TypeScript (tipado estricto y componentes claros)
- Fetch nativo encapsulado en un `apiFetch` con manejo consistente de errores
- Separación por capas:
  - `api/` (cliente HTTP + endpoints + types)
  - `hooks/` (carga de datos y estados)
  - `components/` (UI reutilizable)
  - `pages/` (pantalla principal)

## Estructura del proyecto

src/
api/
client.ts
endpoints.ts
types.ts
components/
JobCard.tsx
StatusBanner.tsx
hooks/
useCandidate.ts
useJobs.ts
pages/
JobsPages.tsx
App.tsx
main.tsx
styles.css


## Cómo correr el proyecto
Requisitos: Node.js 18+ (recomendado)

Instalar dependencias:
```bash
npm install
npm run dev
npm run build
npm run preview

