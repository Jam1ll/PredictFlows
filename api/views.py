from rest_framework.views import APIView
from rest_framework.response import Response
from .services.CryptoService import CryptoService 
from django.http import StreamingHttpResponse
from .services.prediccion_service import PrediccionService
from .services.StockService import StockService

import time
import json
from datetime import datetime, timedelta

# Endpoint GET /api/cryptocoin/
class CryptoView(APIView):
    def get(self, request):
        service = CryptoService()
        df = service.GetAllCryptoCoins()
        
        data = df.to_dict(orient="records")
        
        return Response(data)

# Endpoint GET /api/cryptocoin/<name>/<days>/
class CryptoHistoryView(APIView):
    def get(self, request, name, days):
        service = CryptoService()
        df = service.GetHistory([name], days)

        if df.empty:
            return Response({"error": f"No se pudo obtener datos históricos para {name}."}, status=404)

        data = df.to_dict(orient="records")
        
        return Response(data)

# Endpoint 1: GET /api/cryptocoin/stream/
# Endpoint 1: GET /api/cryptocoin/stream/<cryptos quantity>/
class CryptoStream(APIView):
    cache_data = None
    cache_time = None
    cache_duration = timedelta(seconds=12)

    def get(self, request, num_coins=None):
        def event_stream():
            service = CryptoService()
            while True:
                now = datetime.now()
                if (CryptoStream.cache_data is None or CryptoStream.cache_time is None or now - CryptoStream.cache_time > CryptoStream.cache_duration):
                    try:
                        if num_coins:
                            df = service.GetTopNCryptoCoins(num_coins)
                        else:
                            df = service.GetTopNCryptoCoins(num_coins=10)
                        
                        data_to_cache = df.to_dict(orient="records") 
                        
                        CryptoStream.cache_data = json.dumps(data_to_cache)
                        CryptoStream.cache_time = now
                        
                        yield f"data: {CryptoStream.cache_data}\n\n"
                        
                    except Exception as e:
                        yield f"data: {json.dumps({'error': str(e)})}\n\n"
                time.sleep(1)

        return StreamingHttpResponse(event_stream(), content_type='text/event-stream')

######## STOCKS ########


# Helper para parsear tickers desde query param
def _parse_tickers(param: str):
    if not param:
        return []
    raw = [p.strip().upper() for p in param.replace(" ", ",").split(",")]
    return [t for t in raw if t]


# GET /api/stocks/?tickers=AAPL,MSFT,GOOGL
class StockView(APIView):
    def get(self, request):
        tickers = _parse_tickers(request.query_params.get("tickers", ""))
        if not tickers:
            return Response({"error": "Parámetro 'tickers' es requerido. Ej: ?tickers=AAPL,MSFT"}, status=400)

        service = StockService()
        df = service.GetAllStocks(tickers)
        data = df.to_dict(orient="records")
        return Response(data)


# GET /api/stocks/history/<int:days>/?tickers=AAPL,MSFT&interval=1h
class StockHistoryView(APIView):
    def get(self, request, days: int):
        if days <= 0:
            return Response({"error": "El parámetro de ruta 'days' debe ser > 0."}, status=400)

        tickers = _parse_tickers(request.query_params.get("tickers", ""))
        if not tickers:
            return Response({"error": "Parámetro 'tickers' es requerido. Ej: ?tickers=AAPL,MSFT"}, status=400)

        interval = request.query_params.get("interval", "1h")

        service = StockService()
        df = service.GetHistory(tickers, days=days, interval=interval)

        if df is None or df.empty:
            return Response({"error": "No se pudo obtener datos históricos para los tickers solicitados."}, status=404)

        data = df.to_dict(orient="records")
        return Response(data)


# GET /api/stocks/stream/?tickers=AAPL,MSFT  (opcional: &cache_seconds=12)
class StockStream(APIView):
    cache_data = None
    cache_time = None
    cache_key = None
    cache_duration = timedelta(seconds=12)

    def get(self, request):
        tickers = _parse_tickers(request.query_params.get("tickers", ""))
        if not tickers:
            return Response({"error": "Parámetro 'tickers' es requerido. Ej: ?tickers=AAPL,MSFT"}, status=400)

        try:
            cache_seconds = int(request.query_params.get("cache_seconds", "12"))
            if cache_seconds > 0:
                StockStream.cache_duration = timedelta(seconds=cache_seconds)
        except Exception:
            pass

        request_cache_key = ",".join(tickers)

        def event_stream():
            service = StockService()
            while True:
                now = datetime.now()
                needs_refresh = (
                    StockStream.cache_data is None
                    or StockStream.cache_time is None
                    or StockStream.cache_key != request_cache_key
                    or (now - StockStream.cache_time) > StockStream.cache_duration
                )

                if needs_refresh:
                    try:
                        df = service.GetAllStocks(tickers)
                        data_to_cache = df.to_dict(orient="records")

                        StockStream.cache_data = json.dumps(data_to_cache)
                        StockStream.cache_time = now
                        StockStream.cache_key = request_cache_key

                        yield f"data: {StockStream.cache_data}\n\n"
                    except Exception as e:
                        yield f"data: {json.dumps({'error': str(e)})}\n\n"

                time.sleep(1)

        response = StreamingHttpResponse(event_stream(), content_type="text/event-stream")
        response["Cache-Control"] = "no-cache"
        response["X-Accel-Buffering"] = "no"
        return response

        
######## ANALISIS DE DATOS ########

class PrediccionCryptoView(APIView):
    def get(self, request):
        id_moneda = request.query_params.get('name')   # Moneda
        vs_currency = request.query_params.get('vs', 'usd')     # Moneda base
        dias = int(request.query_params.get('dias', 30))        # Días de datos históricos
        dias_pred = int(request.query_params.get('pred', 7))    # Días a predecir

        service = PrediccionService()
        resultado = service.calcular_prediccion(id_moneda, vs_currency, dias, dias_pred)
        return Response(resultado)
