import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, AlertCircle, Code } from 'lucide-react';

export default function StocksPage() {
    const navigate = useNavigate();

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
                </div>
            </header>

            <main className="container mx-auto px-4 py-12">
                <Card className="max-w-2xl mx-auto">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <AlertCircle className="h-6 w-6 text-yellow-600" />
                            <CardTitle>Funcionalidad en Desarrollo</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-gray-600">
                            La sección de acciones está actualmente en desarrollo. El backend cuenta con
                            el servicio <code className="bg-gray-100 px-2 py-1 rounded">StockService</code> que
                            utiliza Yahoo Finance, pero aún no tiene endpoints configurados en la API.
                        </p>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex items-start gap-2">
                                <Code className="h-5 w-5 text-blue-600 mt-0.5" />
                                <div>
                                    <h4 className="font-semibold text-blue-900 mb-1">
                                        Endpoints Necesarios (Backend)
                                    </h4>
                                    <ul className="text-sm text-blue-800 space-y-1">
                                        <li>• GET /api/stocks/ - Listar acciones</li>
                                        <li>• GET /api/stocks/&lt;ticker&gt;/&lt;days&gt;/ - Historial</li>
                                        <li>• GET /api/stocks/stream/ - Datos en tiempo real</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4">
                            <Button onClick={() => navigate('/crypto')} className="w-full">
                                Ver Criptomonedas (Disponible)
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
