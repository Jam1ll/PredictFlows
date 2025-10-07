from rest_framework.views import APIView
from rest_framework.response import Response
from .services.CryptoService import CryptoService

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

