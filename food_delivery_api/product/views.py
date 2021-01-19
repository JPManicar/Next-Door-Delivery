# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from rest_framework import status
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import ProductSerializer
from .models import Product


from django.shortcuts import render

class ProductListCreateView(generics.ListCreateAPIView):
        queryset = Product.objects.all()
        serializer_class = ProductSerializer

class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
        queryset = Product.objects.all()
        serializer_class = ProductSerializer
