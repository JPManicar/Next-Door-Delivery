from rest_framework.urlpatterns import format_suffix_patterns
from django.urls import path

from .views import (
	UsersListCreateView,
	UsersDetailView) 

urlpatterns = [
    path('user/create', UsersListCreateView.as_view()),
    path('user/<str:username>/details', UsersDetailView.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)