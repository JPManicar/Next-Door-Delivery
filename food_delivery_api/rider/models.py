# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from datetime import datetime
import geocoder

from django.db import models
from userForm.models import Users

class Rider(models.Model):
    location = geocoder.ip('me')
    RiderNo = models.CharField(max_length=15)
    FirstName = models.CharField(max_length=15)
    LastName = models.CharField(max_length=15)
    preferred_name = models.CharField(max_length=30)
    address = models.TextField(max_length=2000)
    City = models.CharField(max_length=15)
    Province = models.CharField(max_length=15)
    Country = models.CharField(max_length=15)
    ContactNo = models.CharField(max_length=15)
    SecondaryContactNo = models.CharField(max_length=15)
    active_rider = models.BooleanField(default=True)
    Username = models.EmailField(max_length=30)
    Password = models.CharField(max_length=30)

    def ___str__(self):
        return self.preferred_name

    @property
    def created_time(self):
        return datetime.now()

    @property
    def longitude(self):
        return self.location.latlng[0]

    @property
    def latitude(self):
        return self.location.latlng[1]

class RiderVehicle(models.Model):
    RiderAccount = models.ForeignKey(Rider, on_delete=models.CASCADE)
    PlateNo = models.CharField(max_length=15)
    RiderVehicle = models.CharField(max_length=15)
    active_vehicle = models.BooleanField(default=True)

    def ___str__(self):
        return self.RiderVehicle

    @property
    def created_time(self):
        return datetime.now()


class RiderFeedback(models.Model):

    feedback = models.CharField(max_length=60)

    @property
    def timestamp(self):
        return datetime.now()
