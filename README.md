# 🚀 PredictFlow

**Plataforma de predicción y análisis de criptomonedas con Machine Learning**

> Sistema completo con frontend en React + TypeScript y backend en Django con predicciones en tiempo real.

![Stack](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)
![Stack](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript)
![Stack](https://img.shields.io/badge/Django-5.2-092E20?logo=django)
![Stack](https://img.shields.io/badge/Python-3.11-3776AB?logo=python)

---

## 📋 Descripción

PredictFlow es una aplicación web que permite:

- 📊 Visualizar criptomonedas en **tiempo real** con streaming SSE
- 📈 Analizar **históricos de precios** y volúmenes
- 🤖 Generar **predicciones** con Machine Learning (Regresión Lineal)
- 🔍 Buscar y filtrar activos
- 📱 Interfaz moderna y responsive

---

## ✨ Características

### Frontend
- ⚡ **React 18** con TypeScript
- 🎨 **Tailwind CSS** + Shadcn UI
- 📊 **Recharts** para gráficos interactivos
- 🔄 **Streaming en tiempo real** (SSE)
- 📱 **Totalmente responsive**

### Backend
- 🐍 **Django 5.2** + REST Framework
- 📡 **CoinGecko API** para datos de criptos
- 🤖 **Scikit-learn** para predicciones ML
- 📊 **Pandas** para procesamiento de datos
- 🔄 **Server-Sent Events** para streaming

---

## 🚀 Inicio Rápido

### Prerrequisitos
- Python 3.11+
- Node.js 20+
- npm o yarn

### 1. Clonar e instalar dependencias

```bash
# Backend
cd PredictFlows
pip install django djangorestframework pandas numpy scikit-learn requests yfinance django-cors-headers

# Frontend
cd frontreact
npm install
```

### 2. Configurar CORS

Editar `PredictFlows/settings.py` (ver [`CONFIGURAR_CORS.md`](CONFIGURAR_CORS.md))

### 3. Ejecutar

**Terminal 1 - Backend:**
```bash
cd PredictFlows
python manage.py runserver
```

**Terminal 2 - Frontend:**
```bash
cd frontreact
npm run dev
```

### 4. Abrir en navegador

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:8000

---

## 📁 Estructura del Proyecto

```
PredictFlows/
├── api/                      # Backend Django
│   ├── views.py              # API endpoints
│   ├── urls.py               # Rutas
│   ├── metodos_prediccion.py # Algoritmos ML
│   └── services/             # Servicios
│       ├── CryptoService.py  # CoinGecko API
│       ├── prediccion_service.py
│       └── StockService.py   # Yahoo Finance
├── frontreact/               # Frontend React
│   └── src/
│       ├── pages/            # Páginas
│       │   ├── HomePage.tsx
│       │   ├── CryptoListPage.tsx
│       │   └── CryptoDetailPage.tsx
│       ├── components/ui/    # Componentes UI
│       └── services/         # API client
└── PredictFlows/             # Configuración Django
    └── settings.py
```

---

## 🔌 API Endpoints

| Método | Endpoint                             | Descripción               |
| ------ | ------------------------------------ | ------------------------- |
| GET    | `/api/cryptocoin/`                   | Lista todas las criptos   |
| GET    | `/api/cryptocoin/<name>/<days>/`     | Historial de una cripto   |
| GET    | `/api/cryptocoin/stream/`            | Stream SSE en tiempo real |
| GET    | `/api/prediccion/?name=&dias=&pred=` | Predicción ML             |

---

## 📸 Capturas

### Landing Page
- Diseño moderno con gradientes
- Botones CTA para Criptos y Stocks
- Cards de características

### Lista de Criptomonedas
- Streaming en tiempo real
- Búsqueda dinámica
- Precios, cambios 24h, volumen

### Dashboard Detallado
- Estadísticas clave
- Gráficos históricos (precio y volumen)
- Predicción con ML

---

## 🛠️ Tecnologías

### Frontend
- React 18.3
- TypeScript 5.6
- Vite 7.1
- Tailwind CSS 3.4
- React Router 7.1
- Recharts 2.15
- Axios 1.7
- Lucide React (iconos)

### Backend
- Django 5.2.7
- Django REST Framework
- Pandas
- NumPy
- Scikit-learn
- Requests
- YFinance

### APIs Externas
- CoinGecko API v3
- Yahoo Finance

---

## 📚 Documentación

- [`INICIO_RAPIDO.md`](INICIO_RAPIDO.md) - Guía de inicio
- [`CONFIGURAR_CORS.md`](CONFIGURAR_CORS.md) - Configuración CORS
- [`PROYECTO_COMPLETADO.md`](PROYECTO_COMPLETADO.md) - Resumen completo
- [`MEJORAS_PENDIENTES.md`](MEJORAS_PENDIENTES.md) - Errores y mejoras
- [`ESTRUCTURA_VISUAL.md`](ESTRUCTURA_VISUAL.md) - Diagramas
- [`CHECKLIST_FINAL.md`](CHECKLIST_FINAL.md) - Verificación

---

## 🎯 Roadmap

### Implementado ✅
- [x] Landing page
- [x] Lista de criptos con streaming
- [x] Dashboard detallado
- [x] Gráficos históricos
- [x] Predicciones ML
- [x] Búsqueda y filtros
- [x] Responsive design

### Pendiente 🔄
- [ ] Endpoints para stocks
- [ ] Más modelos ML (LSTM, ARIMA)
- [ ] Autenticación de usuarios
- [ ] Watchlist/Favoritos
- [ ] Alertas de precio
- [ ] Modo oscuro
- [ ] Tests unitarios
- [ ] Deploy a producción

---

## 🐛 Problemas Conocidos

1. **Endpoint de predicción**: `prediccion_service.py` usa URL incorrecta de CoinGecko
2. **Stocks sin implementar**: Falta crear endpoints en el backend
3. **CORS requerido**: Debe configurarse antes de usar

Ver detalles en [`MEJORAS_PENDIENTES.md`](MEJORAS_PENDIENTES.md)

---

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📝 Licencia

Este proyecto es de código abierto.

---

## 👥 Autor

**PredictFlow Team**

---

## 🙏 Agradecimientos

- CoinGecko API por los datos de criptomonedas
- Yahoo Finance por datos de acciones
- Shadcn UI por los componentes

---

**⭐ Si te gusta el proyecto, dale una estrella!**

---

## 📞 Soporte

¿Problemas o preguntas?

1. Revisa [`CHECKLIST_FINAL.md`](CHECKLIST_FINAL.md)
2. Consulta [`INICIO_RAPIDO.md`](INICIO_RAPIDO.md)
3. Abre un issue en GitHub

---

**Desarrollado con ❤️ usando React, Django y Machine Learning**
