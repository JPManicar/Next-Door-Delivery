# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from rest_framework import status
from rest_framework import generics
from rest_framework.response import Response

from .serializers import RiderSerializer
from .models import Rider


from django.shortcuts import render

class RiderListCreateView(generics.ListCreateAPIView):
    queryset = Rider.objects.all()
    serializer_class = RiderSerializer

class RiderDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Rider.objects.all()
    serializer_class = RiderSerializer
