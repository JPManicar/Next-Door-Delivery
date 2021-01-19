from rest_framework import serializers, fields
from .models import Users

class UsersSerializer(serializers.ModelSerializer):
    Password = serializers.CharField(required=True)

    class Meta:
        model = Users
        fields = ('id',
                 'UserNo',
        		 'FirstName',
        		 'LastName',
        		 'preferred_name',
        		 'address',
        		 'City',
        		 'Province',
        		 'Country',
        		 'ContactNo',
        		 'SecondaryContactNo',
        		 'active_buyer',
        		 'Username',
        		 'Password',
                 'longitude',
                 'latitude',)

        