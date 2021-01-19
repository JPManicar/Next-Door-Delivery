from django.urls import path
from .views import (
	SellerListCreateView,
	SellerDetailView) 

urlpatterns = [
    path('seller/create', SellerListCreateView.as_view()),
    path('seller/<int:pk>/details', SellerDetailView.as_view())
]