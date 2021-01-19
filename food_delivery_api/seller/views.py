# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from rest_framework import status
from rest_framework import generics
from rest_framework.response import Response

from .serializers import SellerSerializer
from .models import Seller


from django.shortcuts import render

class SellerListCreateView(generics.ListCreateAPIView):
        queryset = Seller.objects.all()
        serializer_class = SellerSerializer

class SellerDetailView(generics.RetrieveUpdateDestroyAPIView):
        queryset = Seller.objects.all()
        serializer_class = SellerSerializer
