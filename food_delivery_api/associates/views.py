# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from rest_framework import status
from rest_framework import generics
from rest_framework.response import Response

from .models import *
from .serializers import *
from product.models import Product
from rider.models import Rider
from seller.models import Seller
from store.models import Store
from userForm.models import Users


from django.shortcuts import render

class StoreProductAPIView(generics.CreateAPIView):
    model = StoreProduct
    serializer_class = StoreProductSerializer
   
class StoreProductListAPIView(generics.ListAPIView):
    serializer_class = StoreProductListSerialiser

    def get_queryset(self):
        pk = self.kwargs.get('pk')
        queryset = Product.objects.filter(storeproduct__store=pk)

        return queryset.distinct()

class StoreSellerAPIView(generics.CreateAPIView):
    model = StoreSeller
    serializer_class = StoreSellerSerializer

class StoreSellerListAPIView(generics.ListAPIView):
    serializer_class = StoreSellerListSerializer

    def get_queryset(self):
        pk = self.kwargs.get('pk')
        queryset = Store.objects.filter(storeseller__seller=pk)

        return queryset.distinct()

class UserProductAPIView(generics.CreateAPIView):
    model = UserProduct
    serializer_class = UserProductSerializer

class UserProductListAPIView(generics.ListAPIView):
    serializer_class = UserProductListSerializer

    def get_queryset(self):
        user = self.kwargs.get('pk')
        prod_state = self.request.query_params.get('prod_state', None)
        if user and prod_state is not None:
            return Product.objects.filter(userproduct__user=user, 
                userproduct__prod_state=prod_state)
        
        return Product.objects.filter(userproduct__user=user)
        

class UserProductUpdateAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = UserProduct.objects.all()
    lookup_url_kwarg = 'pk'
    lookup_field = 'product'
    serializer_class = UserProductSerializer
   

class UserRiderAPIView(generics.CreateAPIView):
    serializer_class = UserRiderSerializer

    def get_queryset(self):
        return Users.objects.filter(userrider__rider=request.data.get("rider"))


class UserRiderListAPIView(generics.ListAPIView):
    serializer_class = RiderListSerializer

    def get_queryset(self):
        pk = self.kwargs.get('pk')
        queryset = Rider.objects.filter(userrider__user=pk)

        return queryset.distinct()


