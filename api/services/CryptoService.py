import requests
import pandas as pd

class CryptoService:
    MARKET_URL = "https://api.coingecko.com/api/v3/coins/markets"
    BASE_URL = "https://api.coingecko.com/api/v3/coins"
    
    COLUMNAS_REQUERIDAS = [
        'name', 
        'symbol', 
        'current_price', 
        'total_volume',
    ]
    
    def __init__(self):
        pass
    
    def GetAllCryptoCoins(self, num_coins=100, currency="usd"):
        print(f"fetching top {num_coins} coins in {currency}...")
        
        params = {
            "vs_currency": currency,
            "order": "market_cap_desc",
            "per_page": num_coins,
            "page": 1
        }
        
        try:
            response = requests.get(self.MARKET_URL, params=params).json()

            if isinstance(response, list) and response:
                df = pd.DataFrame(response)
                
                cols_to_select = [
                    col for col in self.COLUMNAS_REQUERIDAS 
                    if col in df.columns
                ]
                
                return df[cols_to_select]
            else:
                print(f"Error: Failed to retrieve market data. API response: {response}")
                return pd.DataFrame() 
                
        except requests.exceptions.RequestException as e:
            print(f"Error: Connection error: {e}")
            return pd.DataFrame()

    def GetHistory(self, cryptos, days):
        all_data = []
        
        for coin in cryptos:
            print(f"fetching historical {coin} data...")
            params = {"vs_currency": "usd", "days": days}
            url = f"{self.BASE_URL}/{coin}/market_chart"
            
            try:
                response = requests.get(url, params=params).json()
            except requests.exceptions.RequestException as e:
                print(f"Error de conexión al descargar {coin}: {e}")
                continue

            if "prices" in response and "total_volumes" in response:
                df_prices = pd.DataFrame(response["prices"], columns=["timestamp", "price"])
                df_volumes = pd.DataFrame(response["total_volumes"], columns=["timestamp", "volume"])
                
                df_final = pd.merge(df_prices, df_volumes, on="timestamp")
                df_final["timestamp"] = pd.to_datetime(df_final["timestamp"], unit="ms")
                df_final["coin"] = coin 
                
                all_data.append(df_final)
            else:
                print(f"Error al descargar {coin}: {response}")
        
        if not all_data:
            print("No se pudo descargar ningún dato histórico.")
            return pd.DataFrame()
            
        final_df = pd.concat(all_data, ignore_index=True)
        return final_df

"""
market_df = cs.GetAllCryptoCoins(num_coins=5, currency="eur")
print("\n--- Market Data ---")
print(market_df.head())

historical_df = cs.GetHistory(["bitcoin"], 1)
print("\n--- Specific Data ---")
print(historical_df.tail())
"""
