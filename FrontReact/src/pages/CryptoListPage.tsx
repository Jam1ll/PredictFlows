import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { CryptoData } from '@/services/api';
import { cryptoAPI } from '@/services/api';
import { TrendingUp, TrendingDown, Search, ArrowLeft, RefreshCw } from 'lucide-react';

export default function CryptoListPage() {
    const navigate = useNavigate();
    const [cryptos, setCryptos] = useState<CryptoData[]>([]);
    const [filteredCryptos, setFilteredCryptos] = useState<CryptoData[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [useStream, setUseStream] = useState(true);

    // Conexión al streaming SSE
    useEffect(() => {
        if (!useStream) return;

        const eventSource = new EventSource(cryptoAPI.getStreamUrl());

        eventSource.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                setCryptos(data);
                setLoading(false);
            } catch (error) {
                console.error('Error parsing stream data:', error);
            }
        };

        eventSource.onerror = () => {
            console.error('SSE connection error');
            eventSource.close();
            setUseStream(false);
            loadAllCryptos();
        };

        return () => {
            eventSource.close();
        };
    }, [useStream]);

    // Fallback: cargar todas las criptos sin streaming
    const loadAllCryptos = async () => {
        setLoading(true);
        try {
            const response = await cryptoAPI.getAllCryptos();
            setCryptos(response.data);
        } catch (error) {
            console.error('Error loading cryptos:', error);
        } finally {
            setLoading(false);
        }
    };

    // Filtrar criptomonedas por búsqueda
    useEffect(() => {
        if (!searchTerm) {
            setFilteredCryptos(cryptos);
            return;
        }

        const filtered = cryptos.filter(
            (crypto) =>
                crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCryptos(filtered);
    }, [searchTerm, cryptos]);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: price < 1 ? 6 : 2,
        }).format(price);
    };

    const formatVolume = (volume: number) => {
        if (volume >= 1e9) return `$${(volume / 1e9).toFixed(2)}B`;
        if (volume >= 1e6) return `$${(volume / 1e6).toFixed(2)}M`;
        return `$${(volume / 1e3).toFixed(2)}K`;
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                            <div>
                                <h1 className="text-2xl font-bold">Criptomonedas</h1>
                                <p className="text-sm text-gray-500">
                                    {useStream ? 'Actualización en tiempo real' : 'Vista estática'}
                                </p>
                            </div>
                        </div>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setUseStream(!useStream)}
                        >
                            <RefreshCw className={`h-4 w-4 mr-2 ${useStream ? 'animate-spin' : ''}`} />
                            {useStream ? 'Streaming ON' : 'Streaming OFF'}
                        </Button>
                    </div>

                    {/* Search Bar */}
                    <div className="mt-4 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Buscar por nombre o símbolo..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </div>
            </header>

            {/* Content */}
            <main className="container mx-auto px-4 py-6">
                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {filteredCryptos.map((crypto) => (
                            <Card
                                key={crypto.id}
                                className="hover:shadow-lg transition-shadow cursor-pointer"
                                onClick={() => navigate(`/crypto/${crypto.id}`)}
                            >
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        {/* Left: Logo & Name */}
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={crypto.image}
                                                alt={crypto.name}
                                                className="h-12 w-12 rounded-full"
                                            />
                                            <div>
                                                <h3 className="font-semibold text-lg">{crypto.name}</h3>
                                                <p className="text-sm text-gray-500 uppercase">
                                                    {crypto.symbol}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Center: Price Info */}
                                        <div className="text-right">
                                            <p className="text-2xl font-bold">
                                                {formatPrice(crypto.current_price)}
                                            </p>
                                            <div
                                                className={`flex items-center justify-end gap-1 ${crypto.price_change_percentage_24h >= 0
                                                        ? 'text-green-600'
                                                        : 'text-red-600'
                                                    }`}
                                            >
                                                {crypto.price_change_percentage_24h >= 0 ? (
                                                    <TrendingUp className="h-4 w-4" />
                                                ) : (
                                                    <TrendingDown className="h-4 w-4" />
                                                )}
                                                <span className="font-semibold">
                                                    {crypto.price_change_percentage_24h?.toFixed(2)}%
                                                </span>
                                            </div>
                                        </div>

                                        {/* Right: Volume & Market Cap */}
                                        <div className="text-right hidden md:block">
                                            <p className="text-sm text-gray-500">Volumen 24h</p>
                                            <p className="font-semibold">{formatVolume(crypto.total_volume)}</p>
                                            <p className="text-sm text-gray-500 mt-1">Market Cap</p>
                                            <p className="font-semibold">{formatVolume(crypto.market_cap)}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}

                        {filteredCryptos.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-gray-500">No se encontraron criptomonedas</p>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}
