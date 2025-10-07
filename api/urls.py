from django.urls import path
from .views import CryptoView, CryptoHistoryView

urlpatterns = [
    path('cryptocoin/', CryptoView.as_view(), name='crypto-all'),
    path('cryptocoin/<str:symbol>/<int:days>/', CryptoHistoryView.as_view(), name='crypto-history'),
]
