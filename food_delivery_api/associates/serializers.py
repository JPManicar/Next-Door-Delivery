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
            'price')


class ProductStoreListSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Store
        fields = ('id',
                  'Name', 
                  'longitude', 
                  'latitude', 
                  'details',
                  'address',
                  'opening_hours')


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
        fields = ('id',
                  'user',
        		  'product',
                  'prod_state',
        		  )

class UserProductListSerializer(serializers.ModelSerializer):
    associates_id = serializers.SerializerMethodField()
    class Meta:
        model = Product
        fields = (
            'id',
            'title', 
            'product_description', 
            'product_type',
            'quantity', 
            'price',
            'associates_id'
            )

    def get_associates_id(self, obj): 

        user = self.context.get('user')
        item  = UserProduct.objects.filter(user=user,
            product=obj.id).first()

        if item:
            return item.id


class UserRiderSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = UserRider
        fields = ('user',
        		  'rider',
                  'rider_state',
        		  )

class RiderListSerializer(serializers.ModelSerializer):
    associates_id_product = serializers.SerializerMethodField()
    class Meta:
        model = Rider
        fields = ('id',
                 'RiderNo',
                 'preferred_name',
                 'FirstName',
                 'LastName',
                 'ContactNo',
                 'SecondaryContactNo',
                 'longitude',
                 'latitude',
                 'associates_id_product')

    def get_associates_id_product(self, obj): 
        user = self.context.get('user')
        item  = UserProduct.objects.filter(user=user,
            prod_state='rider').first()

        if item:
            return item.product.id

class UserListSerializer(serializers.ModelSerializer):
    associates_id_product = serializers.SerializerMethodField()
    class Meta:
        model = Users
        fields = ('id',
                 'preferred_name',
                 'FirstName',
                 'LastName',
                 'ContactNo',
                 'SecondaryContactNo',
                 'address',
                 'City',
                 'Province',
                 'Country',
                 'longitude',
                 'latitude',
                 'associates_id_product')

    def get_associates_id_product(self, obj): 
        item  = UserProduct.objects.filter(user=obj.id,
            prod_state='rider').first()

        if item:
            return item.product.id

class UserStoreSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = UserStore
        fields = ('user',
        		  'store'
        		  )

