# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from datetime import datetime
import geocoder

from django.db import models


class Users(models.Model):
    location = geocoder.ip('me')
    UserNo = models.CharField(max_length=15)
    FirstName = models.CharField(max_length=15)
    LastName = models.CharField(max_length=15)
    preferred_name = models.CharField(max_length=128)
    address = models.TextField(max_length=2000)
    City = models.CharField(max_length=15)
    Province = models.CharField(max_length=15)
    Country = models.CharField(max_length=15)
    ContactNo = models.CharField(max_length=15)
    SecondaryContactNo = models.CharField(max_length=15)
    active_buyer = models.BooleanField(max_length=15)
    Username = models.EmailField(max_length=30)
    Password = models.CharField(max_length=30)

    @property
    def created_time(self):
        return datetime.now()

    @property
    def longitude(self):
        return self.location.latlng[0]

    @property
    def latitude(self):
        return self.location.latlng[1]
