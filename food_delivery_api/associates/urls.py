from rest_framework.urlpatterns import format_suffix_patterns
from django.urls import path

from .views import (
	StoreProductAPIView,
	StoreProductListAPIView,
	StoreSellerAPIView,
	StoreSellerListAPIView,
	UserProductAPIView,
	UserProductListAPIView,
	PendingUserListAPIView,
	UserProductUpdateAPIView,
	UserRiderAPIView,
	UserRiderListAPIView,
	RiderUserListApiView,
	ProductStoreListApiView
) 

urlpatterns = [
    path('associate/store/products', StoreProductAPIView.as_view()),
    path(r'associate/store/<int:pk>/products', StoreProductListAPIView.as_view()),
    path('associate/seller/store', StoreSellerAPIView.as_view()),
    path(r'associate/seller/<int:pk>/store', StoreSellerListAPIView.as_view()),
    path('associate/user/products', UserProductAPIView.as_view()),
    path(r'associate/user/<int:pk>/products', UserProductListAPIView.as_view()),
    path(r'associate/user/pending/products', PendingUserListAPIView.as_view()),
    path(r'associate/user/<int:pk>/products/details', UserProductUpdateAPIView.as_view()),
    path('associate/user/rider', UserRiderAPIView.as_view()),
    path(r'associate/user/<int:pk>/rider', UserRiderListAPIView.as_view()),
    path(r'associate/rider/<int:pk>/user', RiderUserListApiView.as_view()),
    path(r'associate/product/<int:pk>/store', ProductStoreListApiView.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)