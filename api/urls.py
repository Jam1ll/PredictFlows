from django.urls import path
from .views import CryptoView, CryptoHistoryView, CryptoStream

urlpatterns = [
    path('cryptocoin/', CryptoView.as_view(), name='crypto-all'),
    path('cryptocoin/<str:symbol>/<int:days>/', CryptoHistoryView.as_view(), name='crypto-history'),
    path('cryptocoin/stream/', CryptoStream.as_view(), name='crypto-stream'),
    path('cryptocoin/stream/<int:num_coins>', CryptoStream.as_view(), name='crypto-stream-filtered'),
]
