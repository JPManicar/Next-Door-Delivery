from .models import Store
from rest_framework import serializers, fields


class StoreSerializer(serializers.ModelSerializer):

    class Meta:
        model = Store
        fields = ('StoreNo', 
        	      'Name', 
        	      'longitude', 
        	      'latitude', 
        	      'details')
