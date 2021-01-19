from rest_framework import serializers
from .models import *

class StoreProductSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = StoreProduct
        fields = ('store',
        		  'product',
        		  'number_of_prod_sold')

class StoreSellerSerializer(serializers.ModelSerializer):
    
     class Meta:
        model = StoreProduct
        fields = ('store',
        		  'seller'
        		  )

class UserProductSerializer(serializers.ModelSerializer):
    
     class Meta:
        model = StoreProduct
        fields = ('user',
        		  'product'
        		  )

class UserRiderSerializer(serializers.ModelSerializer):
    
     class Meta:
        model = StoreProduct
        fields = ('user',
        		  'rider'
        		  )

class UserStoreSerializer(serializers.ModelSerializer):
    
     class Meta:
        model = StoreProduct
        fields = ('user',
        		  'store'
        		  )

