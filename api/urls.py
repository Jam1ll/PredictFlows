from django.urls import path
from .views import CryptoView, CryptoHistoryView, crypto_stream, PrediccionCryptoView

urlpatterns = [
    path('cryptocoin/', CryptoView.as_view(), name='crypto-all'),
    path('cryptocoin/<str:name>/<int:days>/', CryptoHistoryView.as_view(), name='crypto-history'),
    path('cryptocoin/stream/', crypto_stream, name='crypto-stream'),
    path('cryptocoin/stream/<int:num_coins>', crypto_stream, name='crypto-stream-filtered'),
    path('prediccion/', PrediccionCryptoView.as_view(), name='prediccion-crypto'),
    # path('stocks/', StockView.as_view(), name='stocks-all'),
    # path('stocks/history/<int:days>/', StockHistoryView.as_view(), name='stocks-history'),
    # path('stocks/stream/', StockStream.as_view(), name='stocks-stream'),
]
