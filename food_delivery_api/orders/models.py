from django.db import models
from associates.models import UserProduct, UserRider


class Order(models.Model):
   userproduct = models.ForeignKey(UserProduct, on_delete=models.CASCADE)
   userrider = models.ForeignKey(UserRider, on_delete=models.CASCADE)
