from django.urls import path
from .views import (
	StoreListCreateView,
	StoreDetailView) 
urlpatterns = [
    path('store/create', StoreListCreateView.as_view()),
    path('store/<int:pk>/details', StoreDetailView.as_view())
]