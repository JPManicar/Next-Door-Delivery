from rest_framework.urlpatterns import format_suffix_patterns
from django.urls import path

from .views import (
	RiderListCreateView,
	RiderDetailView) 

urlpatterns = [
    path('rider/create', RiderListCreateView.as_view()),
    path('rider/<str:username>/details', RiderDetailView.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)