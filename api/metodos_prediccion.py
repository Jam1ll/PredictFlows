from sklearn.linear_model import LinearRegression
import numpy as np
import pandas as pd

def predecir_tendencia_regresion(data, dias_pred=7):
    """
    Calcula una tendencia lineal y proyecta los próximos días.
    data: DataFrame con columnas ['fecha', 'precio']
    dias_pred: cantidad de días a predecir
    """
    # Asegura que los datos esten ordenados por fecha
    data = data.sort_values('fecha').reset_index(drop=True)

    # Convertimos el tiempo en numeros para el modelo
    X = np.arange(len(data)).reshape(-1, 1)
    y = data['precio'].values

    # Entrenamos el modelo de regresión lineal
    modelo = LinearRegression()
    modelo.fit(X, y)

    # Predecimos los precios futuros
    X_futuro = np.arange(len(data), len(data) + dias_pred).reshape(-1, 1)
    prediccion = modelo.predict(X_futuro)

    # Creamos fechas futuras (1 día después de la última fecha)
    fechas_futuras = pd.date_range(
        data['fecha'].iloc[-1], periods=dias_pred + 1, freq='D'
    )[1:]

    df_pred = pd.DataFrame({
        'fecha': fechas_futuras,
        'precio_predicho': prediccion
    })
    return df_pred
