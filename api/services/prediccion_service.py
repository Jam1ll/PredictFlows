import requests
import pandas as pd
from datetime import datetime
from ..metodos_prediccion import predecir_tendencia_regresion

class PrediccionService:

    def obtener_datos_criptomoneda(self, id_moneda='bitcoin', vs_currency='usd', dias=30):
        """
        Obtiene precios históricos de una criptomoneda desde CoinGecko.
        Ejemplo: id_moneda='bitcoin', vs_currency='usd', dias=30
        """
        url = "https://api.coingecko.com/api/v3/coins/markets"
        params = {
           "vs_currency": "usd",
            "order": "market_cap_desc", #orden de capitalizacion de mercado
            "per_page": 20,   # Cantidad de monedas mostradas por pagina
            "page": 1,
        }
        respuesta = requests.get(url)

        if respuesta.status_code != 200:
            raise Exception(f"Error al obtener datos: {respuesta.status_code}")

        datos = respuesta.json()

        # CoinGecko devuelve precios en formato [timestamp, valor]
        precios = datos.get('prices', [])
        df = pd.DataFrame(precios, columns=['timestamp', 'precio'])
        df['fecha'] = pd.to_datetime(df['timestamp'], unit='ms')
        df = df[['fecha', 'precio']]

        return df

    def calcular_prediccion(self, id_moneda, vs_currency='usd', dias=30, dias_pred=7):
        """
        Calcula la predicción futura para una criptomoneda específica.
        """
        data = self.obtener_datos_criptomoneda(id_moneda, vs_currency, dias)
        pred = predecir_tendencia_regresion(data, dias_pred)
        return pred.to_dict(orient='records')
