# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from datetime import datetime
import geocoder


from django.db import models
from store.models import Store

class Seller(models.Model):
    location = geocoder.ip('me') if geocoder.ip('me') is not None else [14.6193, 121.0537]
    SellerNo = models.CharField(max_length=15)
    FirstName = models.CharField(max_length=15)
    LastName = models.CharField(max_length=15)
    preferred_name = models.CharField(max_length=30)
    address = models.TextField(max_length=2000, default="")
    City = models.CharField(max_length=15)
    Province = models.CharField(max_length=15)
    Country = models.CharField(max_length=15)
    ContactNo = models.CharField(max_length=15)
    SecondaryContactNo = models.CharField(max_length=15)
    active_seller = models.BooleanField(max_length=15)
    storeNo = models.ForeignKey(Store,  on_delete=models.CASCADE, null=True, blank=True)
    Username = models.EmailField(max_length=30, unique=True, null=True, blank=True)
    Password = models.CharField(max_length=30)
    longitude = models.FloatField(default=location.latlng[1])
    latitude = models.FloatField(default=location.latlng[0])
	
    def ___str__(self):
        return self.preferred_name
    
    def get_longitude(self):
        return self.location.latlng[1]

    def get_latitude(self):
        return self.location.latlng[0]
