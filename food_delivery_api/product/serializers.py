from .models import Product
from rest_framework import serializers, fields


class ProductSerializer(serializers.ModelSerializer):
	class Meta:
		model = Product
		fields = (
			'id', 
			'title', 
			'product_description', 
			'product_type',
			'quantity', 
			'price')
