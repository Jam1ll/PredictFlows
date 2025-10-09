import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { CryptoHistoryData, PredictionData } from '@/services/api';
import { cryptoAPI } from '@/services/api';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Area,
    AreaChart,
} from 'recharts';
import { ArrowLeft, TrendingUp, Calendar, Activity, Zap } from 'lucide-react';

export default function CryptoDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [historyData, setHistoryData] = useState<CryptoHistoryData[]>([]);
    const [predictionData, setPredictionData] = useState<PredictionData[]>([]);
    const [historyDays, setHistoryDays] = useState('7');
    const [predictionDays, setPredictionDays] = useState('7');
    const [loading, setLoading] = useState(false);
    const [predictionLoading, setPredictionLoading] = useState(false);

    // Cargar datos históricos
    const loadHistory = async () => {
        if (!id) return;
        setLoading(true);
        try {
            const response = await cryptoAPI.getCryptoHistory(id, parseInt(historyDays));
            setHistoryData(response.data);
        } catch (error) {
            console.error('Error loading history:', error);
        } finally {
            setLoading(false);
        }
    };

    // Cargar predicción
    const loadPrediction = async () => {
        if (!id) return;
        setPredictionLoading(true);
        try {
            const response = await cryptoAPI.getPrediction({
                name: id,
                dias: parseInt(historyDays),
                pred: parseInt(predictionDays),
            });
            setPredictionData(response.data);
        } catch (error) {
            console.error('Error loading prediction:', error);
        } finally {
            setPredictionLoading(false);
        }
    };

    useEffect(() => {
        loadHistory();
    }, [id]);

    // Formatear datos para el gráfico histórico
    const chartData = historyData.map((item) => ({
        date: new Date(item.timestamp).toLocaleDateString(),
        price: item.price,
        volume: item.volume,
    }));

    // Formatear datos para el gráfico de predicción
    const predictionChartData = predictionData.map((item) => ({
        date: new Date(item.fecha).toLocaleDateString(),
        predicted: item.precio_predicho,
    }));

    // Combinar datos históricos recientes con predicción
    const combinedData = [
        ...chartData.slice(-10).map(d => ({ ...d, predicted: null })),
        ...predictionChartData,
    ];

    const currentPrice = historyData.length > 0 ? historyData[historyData.length - 1].price : 0;
    const minPrice = Math.min(...chartData.map(d => d.price));
    const maxPrice = Math.max(...chartData.map(d => d.price));
    const avgVolume = chartData.reduce((acc, d) => acc + d.volume, 0) / chartData.length;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={() => navigate('/crypto')}>
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold capitalize">{id}</h1>
                            <p className="text-sm text-gray-500">Dashboard detallado</p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-6 space-y-6">
                {/* Stats Cards */}
                <div className="grid md:grid-cols-4 gap-4">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-500">
                                Precio Actual
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2">
                                <Activity className="h-4 w-4 text-blue-600" />
                                <p className="text-2xl font-bold">
                                    ${currentPrice.toFixed(2)}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-500">
                                Precio Mínimo
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2">
                                <TrendingUp className="h-4 w-4 text-green-600" />
                                <p className="text-2xl font-bold">
                                    ${minPrice.toFixed(2)}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-500">
                                Precio Máximo
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2">
                                <Zap className="h-4 w-4 text-orange-600" />
                                <p className="text-2xl font-bold">
                                    ${maxPrice.toFixed(2)}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-500">
                                Volumen Promedio
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-purple-600" />
                                <p className="text-2xl font-bold">
                                    ${(avgVolume / 1e6).toFixed(2)}M
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Historical Chart */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Histórico de Precios</CardTitle>
                            <div className="flex items-center gap-2">
                                <Input
                                    type="number"
                                    value={historyDays}
                                    onChange={(e) => setHistoryDays(e.target.value)}
                                    className="w-20"
                                    min="1"
                                    max="365"
                                />
                                <span className="text-sm text-gray-500">días</span>
                                <Button onClick={loadHistory} disabled={loading}>
                                    {loading ? 'Cargando...' : 'Actualizar'}
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={400}>
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Area
                                    type="monotone"
                                    dataKey="price"
                                    stroke="#3b82f6"
                                    fillOpacity={1}
                                    fill="url(#colorPrice)"
                                    name="Precio (USD)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Volume Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle>Volumen de Transacciones</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="volume"
                                    stroke="#8b5cf6"
                                    strokeWidth={2}
                                    name="Volumen"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Prediction Section */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Predicción de Tendencia</CardTitle>
                            <div className="flex items-center gap-2">
                                <Input
                                    type="number"
                                    value={predictionDays}
                                    onChange={(e) => setPredictionDays(e.target.value)}
                                    className="w-20"
                                    min="1"
                                    max="30"
                                />
                                <span className="text-sm text-gray-500">días</span>
                                <Button onClick={loadPrediction} disabled={predictionLoading}>
                                    {predictionLoading ? 'Calculando...' : 'Predecir'}
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {predictionData.length > 0 ? (
                            <ResponsiveContainer width="100%" height={400}>
                                <LineChart data={combinedData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="price"
                                        stroke="#3b82f6"
                                        strokeWidth={2}
                                        name="Precio Real"
                                        connectNulls
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="predicted"
                                        stroke="#10b981"
                                        strokeWidth={2}
                                        strokeDasharray="5 5"
                                        name="Predicción"
                                        connectNulls
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="text-center py-12 text-gray-500">
                                Haz clic en "Predecir" para ver la tendencia futura
                            </div>
                        )}
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
