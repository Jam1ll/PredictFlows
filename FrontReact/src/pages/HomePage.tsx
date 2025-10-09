import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    TrendingUp,
    ArrowRight,
    BarChart3,
    LineChart,
    Sparkles,
    Zap,
    Shield,
    Globe,
    Star,
    Check,
    Users,
    Activity,
    Trophy,
    Target
} from 'lucide-react';

export default function HomePage() {
    const navigate = useNavigate();

    const plans = [
        {
            name: 'Starter',
            price: 'Gratis',
            description: 'Perfecto para comenzar',
            features: [
                'Acceso a 10 criptomonedas',
                'Datos en tiempo real',
                'Gráficos básicos',
                'Historial de 7 días',
                'Soporte por email'
            ],
            color: 'from-blue-500 to-cyan-500',
            popular: false
        },
        {
            name: 'Pro',
            price: '$29/mes',
            description: 'Para traders activos',
            features: [
                'Acceso ilimitado a criptos',
                'Predicciones con IA',
                'Historial de 365 días',
                'Alertas personalizadas',
                'Análisis avanzados',
                'Soporte prioritario 24/7'
            ],
            color: 'from-purple-500 to-pink-500',
            popular: true
        },
        {
            name: 'Enterprise',
            price: '$99/mes',
            description: 'Para equipos profesionales',
            features: [
                'Todo lo de Pro',
                'API personalizada',
                'Múltiples usuarios',
                'Reportes personalizados',
                'Gestor de cuenta dedicado',
                'Integración con sistemas'
            ],
            color: 'from-orange-500 to-red-500',
            popular: false
        }
    ];

    const stats = [
        { icon: Users, value: '50K+', label: 'Usuarios Activos' },
        { icon: Activity, value: '1M+', label: 'Predicciones' },
        { icon: Trophy, value: '95%', label: 'Precisión' },
        { icon: Globe, value: '150+', label: 'Países' }
    ];

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"></div>
                <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            </div>

            {/* Header */}
            <header className="container mx-auto px-4 py-6 relative">
                <nav className="flex items-center justify-between backdrop-blur-sm bg-white/30 rounded-2xl px-6 py-4 shadow-lg">
                    <div className="flex items-center gap-2">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                            <TrendingUp className="h-6 w-6 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                            PredictFlow
                        </h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" className="hidden md:inline-flex">Características</Button>
                        <Button variant="ghost" className="hidden md:inline-flex">Precios</Button>
                        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                            Comenzar Gratis
                        </Button>
                    </div>
                </nav>
            </header>

            {/* Hero Section */}
            <main className="container mx-auto px-4 py-16 relative">
                <div className="max-w-6xl mx-auto">
                    {/* Hero Content */}
                    <div className="text-center space-y-8 mb-20">
                        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-200 backdrop-blur-sm">
                            <Sparkles className="h-5 w-5 text-blue-600 animate-pulse" />
                            <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Predicciones con IA en tiempo real
                            </span>
                        </div>

                        <h2 className="text-6xl md:text-7xl font-extrabold leading-tight">
                            Invierte con
                            <br />
                            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
                                Inteligencia Artificial
                            </span>
                        </h2>

                        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Análisis avanzado y predicciones precisas para criptomonedas y acciones.
                            Toma decisiones informadas con datos en tiempo real y machine learning.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
                            <Button
                                size="lg"
                                onClick={() => navigate('/crypto')}
                                className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-7 text-lg shadow-2xl shadow-blue-500/50 hover:shadow-purple-500/50 transition-all duration-300"
                            >
                                <BarChart3 className="mr-2 h-6 w-6" />
                                Explorar Criptomonedas
                                <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                            </Button>

                            <Button
                                size="lg"
                                variant="outline"
                                onClick={() => navigate('/stocks')}
                                className="group border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-10 py-7 text-lg backdrop-blur-sm bg-white/50"
                            >
                                <LineChart className="mr-2 h-6 w-6" />
                                Ver Acciones
                                <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
                        {stats.map((stat, index) => (
                            <Card key={index} className="backdrop-blur-sm bg-white/70 border-2 hover:shadow-xl transition-all duration-300 hover:scale-105">
                                <CardContent className="p-6 text-center">
                                    <stat.icon className="h-8 w-8 mx-auto mb-3 text-blue-600" />
                                    <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                        {stat.value}
                                    </p>
                                    <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Features Section */}
                    <div className="mb-20">
                        <div className="text-center mb-12">
                            <h3 className="text-4xl font-bold mb-4">
                                Características{' '}
                                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    Poderosas
                                </span>
                            </h3>
                            <p className="text-gray-600 text-lg">Todo lo que necesitas para invertir inteligentemente</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <Card className="backdrop-blur-sm bg-white/80 border-2 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
                                <CardHeader>
                                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <TrendingUp className="h-8 w-8 text-white" />
                                    </div>
                                    <CardTitle className="text-2xl">Datos en Tiempo Real</CardTitle>
                                    <CardDescription className="text-base">
                                        Información actualizada cada segundo. Nunca te pierdas una oportunidad.
                                    </CardDescription>
                                </CardHeader>
                            </Card>

                            <Card className="backdrop-blur-sm bg-white/80 border-2 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
                                <CardHeader>
                                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <BarChart3 className="h-8 w-8 text-white" />
                                    </div>
                                    <CardTitle className="text-2xl">Análisis Histórico</CardTitle>
                                    <CardDescription className="text-base">
                                        Visualiza tendencias pasadas con gráficos interactivos y detallados.
                                    </CardDescription>
                                </CardHeader>
                            </Card>

                            <Card className="backdrop-blur-sm bg-white/80 border-2 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
                                <CardHeader>
                                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <Sparkles className="h-8 w-8 text-white" />
                                    </div>
                                    <CardTitle className="text-2xl">Predicciones IA</CardTitle>
                                    <CardDescription className="text-base">
                                        Machine learning avanzado para proyecciones precisas del mercado.
                                    </CardDescription>
                                </CardHeader>
                            </Card>

                            <Card className="backdrop-blur-sm bg-white/80 border-2 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
                                <CardHeader>
                                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <Zap className="h-8 w-8 text-white" />
                                    </div>
                                    <CardTitle className="text-2xl">Alertas Inteligentes</CardTitle>
                                    <CardDescription className="text-base">
                                        Recibe notificaciones cuando tus activos alcancen objetivos clave.
                                    </CardDescription>
                                </CardHeader>
                            </Card>

                            <Card className="backdrop-blur-sm bg-white/80 border-2 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
                                <CardHeader>
                                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <Shield className="h-8 w-8 text-white" />
                                    </div>
                                    <CardTitle className="text-2xl">100% Seguro</CardTitle>
                                    <CardDescription className="text-base">
                                        Tus datos están protegidos con encriptación de nivel bancario.
                                    </CardDescription>
                                </CardHeader>
                            </Card>

                            <Card className="backdrop-blur-sm bg-white/80 border-2 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
                                <CardHeader>
                                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <Target className="h-8 w-8 text-white" />
                                    </div>
                                    <CardTitle className="text-2xl">95% de Precisión</CardTitle>
                                    <CardDescription className="text-base">
                                        Nuestros modelos de IA tienen una tasa de acierto comprobada del 95%.
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        </div>
                    </div>

                    {/* Pricing Section */}
                    <div className="mb-20">
                        <div className="text-center mb-12">
                            <h3 className="text-4xl md:text-5xl font-bold mb-4">
                                Planes para cada{' '}
                                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    Inversor
                                </span>
                            </h3>
                            <p className="text-gray-600 text-lg">Elige el plan perfecto para tus necesidades</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {plans.map((plan, index) => (
                                <Card
                                    key={index}
                                    className={`relative backdrop-blur-sm bg-white/80 border-2 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 ${plan.popular ? 'border-purple-500 shadow-xl scale-105' : ''
                                        }`}
                                >
                                    {plan.popular && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                            <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center gap-1">
                                                <Star className="h-4 w-4 fill-current" />
                                                Más Popular
                                            </span>
                                        </div>
                                    )}
                                    <CardHeader>
                                        <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-4`}>
                                            <TrendingUp className="h-9 w-9 text-white" />
                                        </div>
                                        <CardTitle className="text-3xl">{plan.name}</CardTitle>
                                        <CardDescription className="text-base">{plan.description}</CardDescription>
                                        <div className="pt-4">
                                            <span className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                                {plan.price}
                                            </span>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-3 mb-6">
                                            {plan.features.map((feature, i) => (
                                                <li key={i} className="flex items-center gap-3">
                                                    <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                                                    <span className="text-gray-700">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <Button
                                            className={`w-full py-6 text-lg ${plan.popular
                                                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg'
                                                    : 'bg-gray-900 hover:bg-gray-800 text-white'
                                                }`}
                                        >
                                            Comenzar Ahora
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="backdrop-blur-sm bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white shadow-2xl mb-20">
                        <h3 className="text-4xl md:text-5xl font-bold mb-4">
                            ¿Listo para comenzar?
                        </h3>
                        <p className="text-xl mb-8 opacity-90">
                            Únete a miles de inversores que ya están usando PredictFlow
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                size="lg"
                                onClick={() => navigate('/crypto')}
                                className="bg-white text-purple-600 hover:bg-gray-100 px-10 py-7 text-lg shadow-xl"
                            >
                                Empezar Gratis
                                <ArrowRight className="ml-2 h-6 w-6" />
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-10 py-7 text-lg"
                            >
                                Agendar Demo
                            </Button>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="container mx-auto px-4 py-12 relative">
                <div className="backdrop-blur-sm bg-white/50 rounded-3xl p-8">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                                    <TrendingUp className="h-5 w-5 text-white" />
                                </div>
                                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    PredictFlow
                                </h1>
                            </div>
                            <p className="text-gray-600 text-sm">
                                Predicciones inteligentes para inversores inteligentes.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Producto</h4>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li>Características</li>
                                <li>Precios</li>
                                <li>API</li>
                                <li>Documentación</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Compañía</h4>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li>Sobre Nosotros</li>
                                <li>Blog</li>
                                <li>Carreras</li>
                                <li>Contacto</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Legal</h4>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li>Privacidad</li>
                                <li>Términos</li>
                                <li>Cookies</li>
                                <li>Licencias</li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t pt-8 text-center text-gray-500 text-sm">
                        <p>© 2025 PredictFlow. Powered by CoinGecko & Yahoo Finance. Todos los derechos reservados.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

