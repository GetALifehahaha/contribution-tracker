from django.db import models
from django.contrib.auth.models import User

# Create your models here.
# contribution, contributor
# 
class Contributor(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    leader = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="contributors"
    )

    def __str__(self):
        return self.first_name + ' ' + self.last_name


class Contribution(models.Model):
    contributor = models.ForeignKey(
        Contributor,
        on_delete=models.CASCADE,
        related_name="contributions"
    )

    amount = models.IntegerField(default=8)
    date_of_contribution = models.DateField(auto_now_add=True)
    date_paid = models.DateField(blank=True, null=True)
    is_paid = models.BooleanField(default=False)
