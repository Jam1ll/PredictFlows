# Requiere: pip install yfinance pandas
import pandas as pd
import yfinance as yf

class StockService:

    COLUMNAS_REQUERIDAS = [
        "name",
        "symbol",
        "current_price",
        "total_volume",
    ]

    def __init__(self):
        pass

    def GetAllStocks(self, tickers):

        if not tickers:
            return pd.DataFrame(columns=self.COLUMNAS_REQUERIDAS)

        print(f"fetching latest quotes for {len(tickers)} tickers...")

        # Descargar OHLCV del último día (sin multi-index en el resultado final)
        try:
            # Descargamos 2 días para cubrir casos sin sesión de hoy
            mkt = yf.download(
                tickers=tickers,
                period="5d",
                interval="1d",
                group_by="ticker",
                auto_adjust=False,
                threads=True,
                progress=False,
            )
        except Exception as e:
            print(f"Error al descargar precios: {e}")
            return pd.DataFrame(columns=self.COLUMNAS_REQUERIDAS)

        rows = []
        for t in tickers:
            try:
                # Si hay múltiples días, tomamos el último disponible

                if isinstance(mkt.columns, pd.MultiIndex):
                    if t not in {c[0] for c in mkt.columns}:# No hubo datos para este ticker
                        
                        continue
                    sub = mkt[t].dropna(how="all")
                else:
                   
                    if len(tickers) == 1: # Caso: un solo ticker -> columnas simples
                        sub = mkt.dropna(how="all")
                    else:
                        continue  # estructura inesperada

                if sub.empty:
                    continue

                last_row = sub.iloc[-1]
                close = float(last_row.get("Close", float("nan")))
                volume = int(last_row.get("Volume", 0))

                # Intentamos obtener el nombre
                name = t
                try:
                    info = yf.Ticker(t).get_info() 

                    name = info.get("shortName") or info.get("longName") or t
                except Exception:
                    name = t

                rows.append(
                    {
                        "name": name,
                        "symbol": t,
                        "current_price": close,
                        "total_volume": volume,
                    }
                )
            except Exception as e:
                print(f"Error procesando {t}: {e}")

        if not rows:
            print("No se obtuvieron cotizaciones.")
            return pd.DataFrame(columns=self.COLUMNAS_REQUERIDAS)

        df = pd.DataFrame(rows)

        # Garantizar solo las columnas requeridas y sin multi-index
        cols_to_select = [c for c in self.COLUMNAS_REQUERIDAS if c in df.columns]
        return df[cols_to_select]

    def GetHistory(self, tickers, days, interval="1h"):


        if not tickers or days <= 0:
            return pd.DataFrame(columns=["timestamp", "price", "volume", "symbol"])

        print(f"fetching historical data for {len(tickers)} tickers over {days} days ({interval})...")
        period = f"{days}d"

        all_data = []
        for t in tickers:
            try:
                # Para cada ticker descargar en formato simple
                hist = yf.download(
                    tickers=t,
                    period=period,
                    interval=interval,
                    group_by="ticker",
                    auto_adjust=False,
                    threads=True,
                    progress=False,
                )
                if hist is None or hist.empty:
                    print(f"Sin datos para {t}")
                    continue

                # Normalizamr a columnas simples
                if isinstance(hist.columns, pd.MultiIndex):

                    hist = hist.droplevel(0, axis=1)

                hist = hist.reset_index()  # timestamp en columna

                # Estandarizamos nombres esperados
                cols_lower = {c: c.lower() for c in hist.columns}
                hist = hist.rename(columns=cols_lower)

                # Construimos df_final (price: close, volume: volume)
                if "close" not in hist.columns or "volume" not in hist.columns or "datetime" not in hist.columns and "date" not in hist.columns and "index" not in hist.columns and "timestamp" not in hist.columns:
                   
                    # Intento de detectar la columna de tiempo
                    time_col = None
                    for cand in ["datetime", "date", "timestamp"]:
                        if cand in hist.columns:
                            time_col = cand
                            break
                    if time_col is None:
                        
                        time_col = hist.columns[0]# si no encuentra, usa el primer col si es datetime-like

                # Detectar time_col
                time_col = None
                for cand in ["datetime", "date", "timestamp"]:
                    if cand in hist.columns:
                        time_col = cand
                        break
                if time_col is None:
                    time_col = hist.columns[0]

                df_final = pd.DataFrame(
                    {
                        "timestamp": pd.to_datetime(hist[time_col]),
                        "price": hist["close"].astype(float),
                        "volume": hist["volume"].fillna(0).astype(int),
                        "symbol": t,
                    }
                )
                all_data.append(df_final)
            except Exception as e:
                print(f"Error al descargar {t}: {e}")
                continue

        if not all_data:
            print("No se pudo descargar ningún dato histórico.")
            return pd.DataFrame(columns=["timestamp", "price", "volume", "symbol"])

        final_df = pd.concat(all_data, ignore_index=True)
        # Ordenamos por timestamp y símbolo para consistencia
        final_df = final_df.sort_values(["symbol", "timestamp"], kind="stable").reset_index(drop=True)
        return final_df


# =========================
# Ejemplos de uso:
# =========================
# ss = StockService()
# market_df = ss.GetAllStocks(["AAPL", "MSFT", "GOOGL", "AMZN", "NVDA"])
# print(market_df.head())

# hist_df = ss.GetHistory(["AAPL", "MSFT"], days=1, interval="1h")
# print(hist_df.tail())
