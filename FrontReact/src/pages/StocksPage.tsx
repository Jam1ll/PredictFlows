import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import type { Stocks } from '@/services/api';
import { StockAPI } from '@/services/api';
import { TrendingUp, TrendingDown, ArrowLeft, RefreshCw, Search } from 'lucide-react';

export default function StocksPage() {
    const navigate = useNavigate();

    const [stocks, setStocks] = useState<Stocks[]>([]);
    const [filteredStocks, setFilteredStocks] = useState<Stocks[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    // Cargar todas las acciones al montar el componente
    useEffect(() => {
        loadAllStocks();
    }, []);

    const loadAllStocks = async () => {
        setLoading(true);
        try {
            const response = await StockAPI.getAllStock();
            setStocks(response.data);
            setFilteredStocks(response.data);
        } catch (error) {
            console.error('Error cargando acciones:', error);
        } finally {
            setLoading(false);
        }
    };

    // Filtrar acciones por término de búsqueda
    useEffect(() => {
        if (!searchTerm) {
            setFilteredStocks(stocks);
            return;
        }

        const filtered = stocks.filter(
            (stock) =>
                stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredStocks(filtered);
    }, [searchTerm, stocks]);

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
            <header className="bg-white border-b sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold">Acciones</h1>
                            <p className="text-sm text-gray-500">Análisis de mercado de valores</p>
                        </div>
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                        <Search className="h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Buscar acción..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="max-w-sm"
                        />
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-6">
                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {filteredStocks.map((stock, index) => (
                            <Card
                                key={index}
                                className="hover:shadow-lg transition-shadow cursor-pointer"
                                onClick={() => navigate(`/stocks/${stock.name}`)}
                            >
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        {/* Izquierda: nombre */}
                                        <div className="flex items-center gap-4">
                                            <div>
                                                <h3 className="font-semibold text-lg">{stock.name}</h3>
                                                <p className="text-sm text-gray-500 uppercase">
                                                    {stock.symbol}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Centro: precio */}
                                        <div className="text-right">
                                            <p className="text-2xl font-bold">
                                                {formatPrice(stock.current_price)}
                                            </p>
                                            {/* Ejemplo de cambio porcentual
                                            <div className={`flex items-center justify-end gap-1 ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                {stock.change >= 0 ? (
                                                    <TrendingUp className="h-4 w-4" />
                                                ) : (
                                                    <TrendingDown className="h-4 w-4" />
                                                )}
                                                <span className="font-semibold">
                                                    {stock.change.toFixed(2)}%
                                                </span>
                                            </div> */}
                                        </div>

                                        {/* Derecha: volumen */}
                                        <div className="text-right hidden md:block">
                                            <p className="text-sm text-gray-500">Volumen 24h</p>
                                            <p className="font-semibold">
                                                {formatVolume(stock.total_volume)}
                                            </p>
                                            <p className="text-sm text-gray-500 mt-1">Market Cap</p>
                                            {/* <p className="font-semibold">{formatVolume(stock.market_cap)}</p> */}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}

                        {filteredStocks.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-gray-500">No se encontraron acciones</p>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}
