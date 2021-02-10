from django.urls import path
from .views import (
	SellerListCreateView,
	SellerDetailView) 

urlpatterns = [
    path('seller/create', SellerListCreateView.as_view()),
    path('seller/<str:username>/details', SellerDetailView.as_view())
]