from .models import Product
from rest_framework import serializers, fields


class ProductSerializer(serializers.ModelSerializer):
	class Meta:
		model = Product
		fields = (
			'id',
			'StoreNo', 
			'title', 
			'product_description', 
			'quantity', 
			'price')
