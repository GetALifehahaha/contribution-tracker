from django.contrib import admin
from .models import Contributor, Contribution

# Register your models here.
admin.site.register(Contributor)
admin.site.register(Contribution)