from django.db import models


# ==========================
# CUSTOMER MODEL
# ==========================

class Customer(models.Model):

    name = models.CharField(max_length=100)

    email = models.EmailField(
        unique=True
    )

    phone = models.CharField(
        max_length=15
    )

    address = models.TextField()

    password = models.CharField(
        max_length=100
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.name


# ==========================
# VEHICLE MODEL
# ==========================

class Vehicle(models.Model):

    FUEL_CHOICES = (
        ("Petrol", "Petrol"),
        ("Diesel", "Diesel"),
        ("Electric", "Electric"),
        ("CNG", "CNG"),
    )

    customer = models.ForeignKey(
        Customer,
        on_delete=models.CASCADE,
        related_name="vehicles"
    )

    vehicle_number = models.CharField(
        max_length=20,
        unique=True
    )

    vehicle_name = models.CharField(
        max_length=100
    )

    model = models.CharField(
        max_length=100
    )

    fuel_type = models.CharField(
        max_length=20,
        choices=FUEL_CHOICES
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"{self.vehicle_number}"


# ==========================
# SERVICE REQUEST MODEL
# ==========================

class ServiceRequest(models.Model):

    STATUS_CHOICES = (
        ("Pending", "Pending"),
        ("In Progress", "In Progress"),
        ("Completed", "Completed"),
    )

    SERVICE_TYPES = (
        ("Oil Change", "Oil Change"),
        ("Brake Service", "Brake Service"),
        ("Battery Replacement", "Battery Replacement"),
        ("Wheel Alignment", "Wheel Alignment"),
        ("Engine Repair", "Engine Repair"),
        ("General Service", "General Service"),
    )

    vehicle = models.ForeignKey(
        Vehicle,
        on_delete=models.CASCADE,
        related_name="service_requests"
    )

    service_type = models.CharField(
        max_length=50,
        choices=SERVICE_TYPES
    )

    description = models.TextField(
        blank=True,
        null=True
    )

    request_date = models.DateField()

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="Pending"
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return (
            f"{self.vehicle.vehicle_number} - "
            f"{self.service_type}"
        )


# ==========================
# SERVICE HISTORY MODEL
# ==========================

class ServiceHistory(models.Model):

    vehicle = models.ForeignKey(
        Vehicle,
        on_delete=models.CASCADE,
        related_name="service_history"
    )

    service_type = models.CharField(
        max_length=100
    )

    cost = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    service_date = models.DateField()

    remarks = models.TextField()

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return (
            f"{self.vehicle.vehicle_number} - "
            f"{self.service_type}"
        )