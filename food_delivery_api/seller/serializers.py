from rest_framework import serializers
from .models import Seller

class SellerSerializer(serializers.ModelSerializer):
    Password = serializers.CharField(required=True)
    
    class Meta:
        model = Seller
        fields = ('SellerNo',
        		 'FirstName',
        		 'LastName',
        		 'preferred_name',
        		 'address',
        		 'City',
        		 'Province',
        		 'Country',
        		 'ContactNo',
        		 'SecondaryContactNo',
        		 'PlateNo',
        		 'active_rider',
        		 'RiderVehicle',
        		 'Username',
        		 'Password',
                 'longitude',
                 'latitude',)

        