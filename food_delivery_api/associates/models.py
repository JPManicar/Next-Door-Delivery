# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from datetime import datetime

# model imports
from product.models import Product
from rider.models import Rider
from seller.models import Seller
from store.models import Store
from userForm.models import Users

from django.db import models

class BaseCoreModel(models.Model):
    is_active = models.BooleanField(default=True)

    @property
    def created_time(self):
        return datetime.now()

    @property
    def modified_time(self):
        return datetime.now()


class StoreProduct(BaseCoreModel):
    store = models.ForeignKey(Store, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
	
class StoreSeller(BaseCoreModel):
    store = models.ForeignKey(Store, on_delete=models.CASCADE)
    seller = models.ForeignKey(Seller, on_delete=models.CASCADE)

class UserProduct(BaseCoreModel):
    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    PROD_STATE_CHOICES = (
        ('removed', 'removed'),
        ('cart','cart'),
        ('checkout','checkout'),
        ('received','received'),
        ('failed','failed'),
    )
    prod_state = models.CharField(
        max_length=15,
        choices=PROD_STATE_CHOICES,
        default='removed',
    )
	

class UserRider(BaseCoreModel):
    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    rider = models.ForeignKey(Rider, on_delete=models.CASCADE)
    RID_STATE_CHOICES = (
        ('toShop', 'toShop'),
        ('pickedup','pickedup'),
        ('received','received'),
        ('failed','failed'),
    )
    rider_state = models.CharField(
        max_length=15,
        choices=RID_STATE_CHOICES,
        default='toShop',
    )
	

class UserStore(BaseCoreModel):
    store = models.ForeignKey(Store, on_delete=models.CASCADE)
    user = models.ForeignKey(Rider, on_delete=models.CASCADE)


