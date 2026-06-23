from django.contrib import admin

from .models import (
    Customer,
    Vehicle,
    ServiceRequest,
    ServiceHistory
)


# ==========================
# CUSTOMER ADMIN
# ==========================

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "name",
        "email",
        "phone",
        "created_at"
    )

    search_fields = (
        "name",
        "email",
        "phone"
    )

    list_per_page = 10


# ==========================
# VEHICLE ADMIN
# ==========================

@admin.register(Vehicle)
class VehicleAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "vehicle_number",
        "vehicle_name",
        "model",
        "fuel_type",
        "customer",
        "created_at"
    )

    search_fields = (
        "vehicle_number",
        "vehicle_name",
        "model"
    )

    list_filter = (
        "fuel_type",
    )

    list_per_page = 10


# ==========================
# SERVICE REQUEST ADMIN
# ==========================

@admin.register(ServiceRequest)
class ServiceRequestAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "vehicle",
        "service_type",
        "request_date",
        "status",
        "created_at"
    )

    search_fields = (
        "service_type",
        "status"
    )

    list_filter = (
        "status",
        "service_type"
    )

    list_per_page = 10


# ==========================
# SERVICE HISTORY ADMIN
# ==========================

@admin.register(ServiceHistory)
class ServiceHistoryAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "vehicle",
        "service_type",
        "cost",
        "service_date",
        "created_at"
    )

    search_fields = (
        "service_type",
        "remarks"
    )

    list_per_page = 10