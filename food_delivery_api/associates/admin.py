# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from .models import (
	StoreProduct, 
	StoreSeller,
	UserProduct,
	UserRider,
	UserStore,
)

# Register your models here.
admin.site.register(StoreProduct)
admin.site.register(StoreSeller)
admin.site.register(UserProduct)
admin.site.register(UserRider)
admin.site.register(UserStore)
