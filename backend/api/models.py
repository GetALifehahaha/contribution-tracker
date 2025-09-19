from django.db import models
from django.contrib.auth.models import User

# Create your models here.
# contribution, contributor
# 
class Contributor(models.Model):
    first_name = models.CharField
    last_name = models.CharField


class Contribution(models.Model):
    contributor = models.ForeignKey(
        Contributor,
        on_delete=models.CASCADE,
        related_name="contributor"
    )

    amount = models.IntegerField(default=8)
    date_of_contribution = models.DateField(auto_now_add=True)
    date_paid = models.DateField()
    is_paid = models.BooleanField(default=False)
