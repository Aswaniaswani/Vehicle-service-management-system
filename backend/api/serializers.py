from rest_framework import serializers

from .models import (
    Customer,
    Vehicle,
    ServiceRequest,
    ServiceHistory
)


# ==========================
# CUSTOMER SERIALIZER
# ==========================

class CustomerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Customer
        fields = "__all__"


# ==========================
# VEHICLE SERIALIZER
# ==========================

class VehicleSerializer(serializers.ModelSerializer):

    customer_name = serializers.CharField(
        source="customer.name",
        read_only=True
    )

    class Meta:
        model = Vehicle
        fields = "__all__"


# ==========================
# SERVICE REQUEST SERIALIZER
# ==========================

class ServiceRequestSerializer(serializers.ModelSerializer):

    vehicle_number = serializers.CharField(
        source="vehicle.vehicle_number",
        read_only=True
    )

    vehicle_name = serializers.CharField(
        source="vehicle.vehicle_name",
        read_only=True
    )

    class Meta:
        model = ServiceRequest
        fields = "__all__"


# ==========================
# SERVICE HISTORY SERIALIZER
# ==========================

class ServiceHistorySerializer(serializers.ModelSerializer):

    vehicle_number = serializers.CharField(
        source="vehicle.vehicle_number",
        read_only=True
    )

    vehicle_name = serializers.CharField(
        source="vehicle.vehicle_name",
        read_only=True
    )

    class Meta:
        model = ServiceHistory
        fields = "__all__"