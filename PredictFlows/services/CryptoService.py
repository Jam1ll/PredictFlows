import requests
import pandas as pd

class CryptoService:
    def __init__(self):
        self.base_url = "https://api.coingecko.com/api/v3/coins"
        self.market_url = "https://api.coingecko.com/api/v3/coins/markets"
        pass
    
    def GetAllCryptoCoins(self, num_coins=100, currency="usd"):
        print(f"fetching top {num_coins} coins in {currency}...")
        
        params = {
            "vs_currency": currency,
            "order": "market_cap_desc",
        }
        
        try:
            response = requests.get(self.market_url, params=params).json()

            if isinstance(response, list) and response:
                df = pd.DataFrame(response)

                cols = [
                    'id', 'symbol', 'name', 
                    'current_price', 'market_cap', 'total_volume',
                    'price_change_percentage_24h'
                ]
                df = df[[col for col in cols if col in df.columns]]
                
                return df.to_json(orient="records", indent=4)
            else:
                return f'{{"error": "Failed to retrieve market data. API response: {response}"}}'
                
        except requests.exceptions.RequestException as e:
            return f'{{"error": "Connection error: {e}"}}'
    
    def GetHistory(self, cryptos, days):
        all_data = []
        
        for coin in cryptos:
            print(f"fetching {coin} data...")
            params = {"vs_currency": "usd", "days": days} #setting data: fixed usd currency
           
            url = f"{self.base_url}/{coin}/market_chart"

            response = requests.get(url, params=params).json()

            if "prices" in response and "total_volumes" in response:
                df_prices = pd.DataFrame(response["prices"], columns=["timestamp", "price"])
               
                df_volumes = pd.DataFrame(response["total_volumes"], columns=["timestamp", "volume"])
              
                df_final = pd.merge(df_prices, df_volumes, on="timestamp")
                df_final["timestamp"] = pd.to_datetime(df_final["timestamp"], unit="ms")
                df_final["coin"] = coin 
                
                all_data.append(df_final)
            else:
                print(f"Error al descargar {coin}: {response}")
        
        final_df = pd.concat(all_data, ignore_index=True)
        json_data = final_df.to_json(orient="records")
        return json_data

#testing

cs = CryptoService()
c = ["bitcoin", "ethereum"]
#data = cs.GetHistory(c, 2)
data = cs.GetAllCryptoCoins()
print(data)