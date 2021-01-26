# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from datetime import datetime
import geocoder

from django.db import models

class Store(models.Model):
    location = geocoder.ip('me') if geocoder.ip('me') is not None else [14.6193, 121.0537]

    StoreNo = models.CharField(max_length=15)
    Name = models.CharField(max_length=30)
    longitude = models.FloatField(default=location.latlng[0])
    latitude = models.FloatField(default=location.latlng[1])
    details = models.TextField(max_length=2000, default="")
    address = models.TextField(max_length=2000, default="")
    opening_hours = models.CharField(max_length=30, default="")

    def ___str__(self):
        return self.preferred_name

    def get_longitude(self):
        return self.location.latlng[0]

    def get_latitude(self):
        return self.location.latlng[1]

    def save(self,*args, **kwargs):
        self.longitude = self.get_longitude()
        self.latitude = self.get_latitude()

        super(Store, self).save(*args, **kwargs)

class StoreFeedback(models.Model):
    
    feedback = models.CharField(max_length=60)

    @property
    def timestamp(self):
        return datetime.now()
