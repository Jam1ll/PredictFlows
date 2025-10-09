# PredictFlow - Frontend React

Frontend moderno para la plataforma de predicción de criptomonedas y acciones.

## 🚀 Tecnologías

- **React 18** con TypeScript
- **Vite** - Build tool ultrarrápido
- **Tailwind CSS** - Estilos utility-first
- **Shadcn UI** - Componentes accesibles
- **React Router** - Navegación SPA
- **Recharts** - Gráficos y visualizaciones
- **Axios** - Cliente HTTP
- **Lucide React** - Iconos

## ⚙️ Instalación y Ejecución

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

El frontend estará en: **http://localhost:5173**  
El backend debe estar en: **http://localhost:8000**

## 📁 Estructura

```
src/
├── components/ui/    # Componentes Shadcn
├── pages/            # Páginas de la app
├── services/         # API y servicios
└── lib/              # Utilidades
```

## 🎯 Páginas

1. **HomePage** (`/`) - Landing page principal
2. **CryptoListPage** (`/crypto`) - Lista con streaming real-time
3. **CryptoDetailPage** (`/crypto/:id`) - Dashboard con predicciones
4. **StocksPage** (`/stocks`) - Placeholder (en desarrollo)

## 🔌 Endpoints Utilizados

- `GET /api/cryptocoin/` - Lista de criptos
- `GET /api/cryptocoin/<name>/<days>/` - Historial
- `GET /api/cryptocoin/stream/` - Streaming SSE
- `GET /api/prediccion/?name=&dias=&pred=` - Predicción ML

---

**Desarrollado con ❤️ para PredictFlow**
The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
