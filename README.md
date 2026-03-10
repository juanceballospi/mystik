# 🔮 Mystik

**Mystik** es una aplicación web de esoterismo desarrollada con [Next.js](https://nextjs.org). Permite a los usuarios explorar el universo esotérico a través de herramientas como el horóscopo diario, el horóscopo personalizado y la carta natal, entre otras funcionalidades.

> Proyecto transversal entre las asignaturas **Diseño de Algoritmos** y **Programación Web**  
> Ciclo **2026-1T** · Carrera: **Tecnología en Desarrollo de Software y Aplicativos Móviles**  
> [Politécnico Internacional](https://www.politecnicointernacional.edu.co)

---

## ✨ Funcionalidades

- 🌟 **Horóscopo diario** — Consulta tu signo zodiacal y recibe tu predicción del día.
- 🪐 **Horóscopo personalizado** — Predicciones adaptadas a tu perfil astrológico.
- 🗺️ **Carta natal** — Genera e interpreta tu carta astral a partir de tu fecha, hora y lugar de nacimiento.
- _(Más funcionalidades próximamente…)_

---

## 🛠️ Stack tecnológico

| Tecnología                                   | Versión |
| -------------------------------------------- | ------- |
| [Next.js](https://nextjs.org)                | 16      |
| [React](https://react.dev)                   | 19      |
| [TypeScript](https://www.typescriptlang.org) | 5       |
| [Tailwind CSS](https://tailwindcss.com)      | 4       |
| [pnpm](https://pnpm.io)                      | —       |

**Tipografías:** El Messiri · Proza Libre · Geist Mono

---

## 🚀 Inicio rápido

Instala las dependencias y arranca el servidor de desarrollo:

```bash
pnpm install
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

El punto de entrada principal de la aplicación es `app/page.tsx`. Los cambios se reflejan automáticamente en el navegador.

---

## 📁 Estructura del proyecto

```
mystik/
├── app/
│   ├── layout.tsx        # Layout raíz y configuración de fuentes
│   ├── page.tsx          # Página principal
│   └── globals.css       # Estilos globales
├── components/
│   └── header.tsx        # Componente de encabezado
├── public/               # Archivos estáticos
└── other/                # Recursos adicionales (prototipo HTML/CSS)
```

---

## 📦 Scripts disponibles

| Comando      | Descripción                       |
| ------------ | --------------------------------- |
| `pnpm dev`   | Inicia el servidor de desarrollo  |
| `pnpm build` | Genera el build de producción     |
| `pnpm start` | Ejecuta el servidor de producción |
| `pnpm lint`  | Analiza el código con ESLint      |

---

## 📚 Recursos útiles

- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de Tailwind CSS v4](https://tailwindcss.com/docs)
- [Repositorio de Next.js en GitHub](https://github.com/vercel/next.js)
