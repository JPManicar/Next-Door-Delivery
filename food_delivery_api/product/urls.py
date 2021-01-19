from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from product.views import (
    ProductListCreateView,
    ProductDetailView) 

urlpatterns = [
    path('product/create', ProductListCreateView.as_view()),
    path('product/<int:pk>/details', ProductDetailView.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)