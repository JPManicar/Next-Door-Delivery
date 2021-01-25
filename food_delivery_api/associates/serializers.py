from rest_framework import serializers

from .models import *
from product.models import Product  
from store.models import Store
from rider.models import Rider
from userForm.models import Users

class StoreProductSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = StoreProduct
        fields = ('store',
        		  'product',
                 )

class StoreProductListSerialiser(erializers.ModelSerializer):

    class Meta:
        model = Product
        fields = (
            'id',
            'StoreNo', 
            'title', 
            'product_description', 
            'quantity', 
            'price',)

class StoreSellerSerializer(serializers.ModelSerializer):
    
     class Meta:
        model = StoreSeller
        fields = ('store',
        		  'seller'
        		  )

class StoreSellerListSerializer(serializers.ModelSerializer):
    
     class Meta:
        model = Store
        fields = (
                  'Name', 
                  'longitude', 
                  'latitude', 
                  'details',
                  'address',
                  'opening_hours',)

class UserProductSerializer(serializers.ModelSerializer):
    
     class Meta:
        model = UserProduct
        fields = ('user',
        		  'product'
        		  )

class UserProductListSerializer(serializers.ModelSerializer):
    
     class Meta:
        model = Product
        fields = (
            'id',
            'StoreNo', 
            'title', 
            'product_description', 
            'quantity', 
            'price',)

class UserRiderSerializer(serializers.ModelSerializer):
    
     class Meta:
        model = UserRider
        fields = ('user',
        		  'rider'
        		  )

class RiderListSerializer(serializers.ModelSerializer):
    riderVehicle = serializers.methodField()

    class Meta:
        model = Rider
        fields = ('RiderNo',
                 'FirstName',
                 'LastName',
                 'ContactNo',
                 'SecondaryContactNo',
                 'riderVehicle',
                 'plateNo',
                 'longitude',
                 'latitude',)

class UserListSerializer(serializers.ModelSerializer):
    riderVehicle = serializers.methodField()

    class Meta:
        model = Users
        fields = (
                 'FirstName',
                 'LastName',
                 'ContactNo',
                 'SecondaryContactNo',
                 'address',
                 'City',
                 'Province',
                 'Country',
                 'longitude',
                 'latitude',)

class UserStoreSerializer(serializers.ModelSerializer):
    
     class Meta:
        model = UserStore
        fields = ('user',
        		  'store'
        		  )

