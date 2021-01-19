from rest_framework.urlpatterns import format_suffix_patterns
from django.urls import path

from .views import (
	UsersListCreateView,
	UsersDetailView) 

urlpatterns = [
    path('rider/create', UsersListCreateView.as_view()),
    path('rider/<int:pk>/details', UsersDetailView.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)