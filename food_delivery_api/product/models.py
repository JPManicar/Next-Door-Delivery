# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from datetime import datetime

from store.models import Store
from userForm.models import Users

from django.db import models


class Product(models.Model):
    store = models.ManyToManyField(
            Store, 
            through='associates.StoreProduct',
            )
    user = models.ManyToManyField(
            Users, 
            through='associates.UserProduct',
            )
    title = models.CharField(max_length=45)
    product_description = models.TextField(max_length=2000, default="")
    PROD_TYPE_CHOICES = (
        ('raw','raw'),
        ('vegetable','vegetable'),
        ('Packed Goods','Packed Goods'),
        ('Essentials','Essentials'),
        ('Cooked Goods','Cooked Goods'),
    )
    product_type = models.CharField(
        max_length=15,
        choices=PROD_TYPE_CHOICES,
        default='Project-based',
    )
    quantity = models.IntegerField()
    price = models.FloatField()

    def __str__(self):
        return self.title
        
class ProductFeedback(models.Model):

    feedback = models.CharField(max_length=200)

    @property
    def timestamp(self):
    	return datetime.now()

    def __str__(self):
        return self.feedback
