from django.urls import path
from .views import ContributorListCreate, ContributionListCreate

urlpatterns = [
    path('contributors/', ContributorListCreate.as_view(), name='contributor-list'),
    path('contributors/<int:pk>/contributions/', ContributionListCreate.as_view(), name='contribution-list'),
]