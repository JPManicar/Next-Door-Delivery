# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render
from rest_framework import status
from rest_framework import generics
from rest_framework.response import Response

from .serializers import UsersSerializer
from .models import Users


from django.shortcuts import render

class UsersListCreateView(generics.ListCreateAPIView):
    queryset = Users.objects.all()
    serializer_class = UsersSerializer

class UsersDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UsersSerializer
    lookup_url_kwarg = 'username'
    lookup_field = 'Username'
    queryset = Users.objects.all()

   
