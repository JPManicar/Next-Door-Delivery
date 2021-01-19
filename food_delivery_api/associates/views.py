# -*- coding: utf-8 -*-
from django.shortcuts import render
from rest_framework import status
from rest_framework import generics
from rest_framework.response import Response

from serializers import *
from product.models import Product
from rider.models import Rider
from seller.models import Seller
from store.models import Store
from userForm.models import Users

from __future__ import unicode_literals

from django.shortcuts import render

class StoreProductAPIView(generics.ListCreateAPIView):
    serializer_class = StoreProductSerializer

    def get_queryset(self):
        return Product.objects.filter(storeproduct__store=self.request.data.get("store"))

class StoreSellerAPIView(generics.ListCreateAPIView):
    serializer_class = StoreSellerSerializer

    def get_queryset(self):
        return Store.objects.filter(storeseller__seller=request.data.get("seller"))

class UserProductAPIView(generics.ListCreateAPIView):
    serializer_class = UserProductSerializer

    def get_queryset(self):
        return Product.objects.filter(userproduct__user=request.data.get("user"))


class UserRiderAPIView(generics.ListCreateAPIView):
    serializer_class = UserRiderSerializer

    def get_queryset(self):
        return Users.objects.filter(userrider__rider=request.data.get("rider"))


class StoreSellerAPIView(generics.ListCreateAPIView):
    serializer_class = StoreSellerSerializer

    def get_queryset(self):
        return Store.objects.filter(storeseller__seller=request.data.get("seller"))


