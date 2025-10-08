from rest_framework.views import APIView
from rest_framework.response import Response
from .services.CryptoService import CryptoService 
from django.http import StreamingHttpResponse
from .services.prediccion_service import PrediccionService
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
