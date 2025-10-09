import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Crypto endpoints
export const cryptoAPI = {
    // GET /api/cryptocoin/ - Obtener todas las criptomonedas
    getAllCryptos: () => api.get('/cryptocoin/'),

    // GET /api/cryptocoin/<name>/<days>/ - Historial de una cripto
    getCryptoHistory: (name: string, days: number) =>
        api.get(`/cryptocoin/${name}/${days}/`),

    // GET /api/cryptocoin/stream/ - Stream tiempo real (top 10)
    // Retorna un EventSource para recibir actualizaciones en tiempo real
    createStream: (numCoins?: number) => {
        const url = numCoins
            ? `${API_BASE_URL}/cryptocoin/stream/${numCoins}`
            : `${API_BASE_URL}/cryptocoin/stream/`;
        return new EventSource(url);
    },

    // GET /api/prediccion/ - Predicción de precios
    getPrediction: (params: {
        name: string;
        vs?: string;
        dias?: number;
        pred?: number;
    }) => api.get('/prediccion/', { params }),
};

// Tipos para las respuestas
export interface CryptoData {
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
    market_cap: number;
    market_cap_rank: number;
    fully_diluted_valuation: number | null;
    total_volume: number;
    high_24h: number;
    low_24h: number;
    price_change_24h: number;
    price_change_percentage_24h: number;
    market_cap_change_24h: number;
    market_cap_change_percentage_24h: number;
    circulating_supply: number;
    total_supply: number | null;
    max_supply: number | null;
    ath: number;
    ath_change_percentage: number;
    ath_date: string;
    atl: number;
    atl_change_percentage: number;
    atl_date: string;
    last_updated: string;
}

export interface CryptoHistoryData {
    timestamp: string;
    price: number;
    volume: number;
    coin: string;
}

export interface PredictionData {
    fecha: string;
    precio_predicho: number;
}
