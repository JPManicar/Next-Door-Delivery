from rest_framework import serializers

from .models import *
from product.models import Product  
from store.models import Store
from rider.models import Rider, RiderVehicle
from userForm.models import Users

class StoreProductSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = StoreProduct
        fields = ('store',
        		  'product',
                 )

class StoreProductListSerialiser(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = (
            'id',
            'title', 
            'product_description', 
            'product_type',
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
        fields = ('id',
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
        		  'product',
                  'prod_state',
        		  )

class UserProductListSerializer(serializers.ModelSerializer):
    
     class Meta:
        model = Product
        fields = (
            'id',
            'title', 
            'product_description', 
            'product_type',
            'quantity', 
            'price',)

class UserRiderSerializer(serializers.ModelSerializer):
    
     class Meta:
        model = UserRider
        fields = ('user',
        		  'rider',
                  'rider_state',
        		  )

class RiderListSerializer(serializers.ModelSerializer):
    riderVehicle = serializers.SerializerMethodField()
    class Meta:
        model = Rider
        fields = ('id',
                 'RiderNo',
                 'FirstName',
                 'LastName',
                 'ContactNo',
                 'SecondaryContactNo',
                 'riderVehicle',
                 'plateNo',
                 'longitude',
                 'latitude',)

    def get_riderVehicle(self, obj):
        return RiderVehicle.objects.filter(RiderAccount=self.id)

class UserListSerializer(serializers.ModelSerializer):
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

