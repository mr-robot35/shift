from django_filters import rest_framework as filters
from rest_framework import viewsets
from rest_framework import serializers
from . import models


class ShiftFilter(filters.FilterSet):
    staff = filters.CharFilter()

    class Meta:
        model = models.Shift
        fields = ['staff']
