# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from datetime import datetime



from django.db import models

class Store(models.Model):
    StoreNo = models.CharField(max_length=15)
    Name = models.CharField(max_length=30)
    longitude = models.FloatField()
    latitude = models.FloatField()
    details = models.TextField(max_length=2000)

class StoreFeedback(models.Model):
    
	feedback = models.CharField(max_length=60)

	@property
	def timestamp(self):
		return datetime.now()