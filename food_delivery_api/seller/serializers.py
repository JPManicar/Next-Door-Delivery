from rest_framework import serializers
from .models import Seller

class SellerSerializer(serializers.ModelSerializer):
    Password = serializers.CharField(required=True)
    
    class Meta:
        model = Seller
        fields = (
                 'id',
                 'SellerNo',
        		 'FirstName',
        		 'LastName',
        		 'preferred_name',
        		 'address',
        		 'City',
        		 'Province',
        		 'Country',
        		 'ContactNo',
        		 'SecondaryContactNo',
        		 'active_seller',
        		 'Username',
        		 'Password',
                 'longitude',
                 'latitude',)

        