from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Q

from .models import (
    Customer,
    Vehicle,
    ServiceRequest,
    ServiceHistory
)

from .serializers import (
    CustomerSerializer,
    VehicleSerializer,
    ServiceRequestSerializer,
    ServiceHistorySerializer
)


# =====================================
# AUTHENTICATION
# =====================================

@api_view(['POST'])
def register_customer(request):

    email = request.data.get("email")

    if Customer.objects.filter(email=email).exists():
        return Response(
            {"error": "Email already registered"},
            status=400
        )

    serializer = CustomerSerializer(
        data=request.data
    )

    if serializer.is_valid():
        serializer.save()

        return Response({
            "message": "Registration Successful"
        })

    return Response(
        serializer.errors,
        status=400
    )


@api_view(['POST'])
def login_customer(request):

    email = request.data.get("email")
    password = request.data.get("password")

    # Admin Login

    if (
        email == "admin@gmail.com" and
        password == "admin123"
    ):
        return Response({
            "role": "admin",
            "name": "Administrator"
        })

    try:

        customer = Customer.objects.get(
            email=email,
            password=password
        )

        return Response({
            "role": "customer",
            "id": customer.id,
            "name": customer.name,
            "email": customer.email,
            "phone": customer.phone
        })

    except Customer.DoesNotExist:

        return Response(
            {"error": "Invalid Email or Password"},
            status=401
        )


# =====================================
# ADMIN DASHBOARD
# =====================================

@api_view(['GET'])
def admin_dashboard(request):

    total_customers = Customer.objects.count()

    total_vehicles = Vehicle.objects.count()

    pending_services = ServiceRequest.objects.filter(
        status="Pending"
    ).count()

    in_progress_services = ServiceRequest.objects.filter(
        status="In Progress"
    ).count()

    completed_services = ServiceRequest.objects.filter(
        status="Completed"
    ).count()

    total_revenue = 0

    histories = ServiceHistory.objects.all()

    for history in histories:
        total_revenue += history.cost

    return Response({
        "total_customers": total_customers,
        "total_vehicles": total_vehicles,
        "pending_services": pending_services,
        "in_progress_services": in_progress_services,
        "completed_services": completed_services,
        "total_revenue": total_revenue
    })


# =====================================
# CUSTOMER DASHBOARD
# =====================================

@api_view(['GET'])
def customer_dashboard(request, customer_id):

    customer = Customer.objects.get(id=customer_id)

    vehicle_count = Vehicle.objects.filter(
        customer_id=customer_id
    ).count()

    pending_count = ServiceRequest.objects.filter(
        vehicle__customer_id=customer_id,
        status="Pending"
    ).count()

    completed_count = ServiceRequest.objects.filter(
        vehicle__customer_id=customer_id,
        status="Completed"
    ).count()

    history_count = ServiceHistory.objects.filter(
        vehicle__customer_id=customer_id
    ).count()

    recent_requests = ServiceRequest.objects.filter(
        vehicle__customer_id=customer_id
    ).order_by('-id')[:5]

    recent_data = []

    for request_obj in recent_requests:
        recent_data.append({
            "id": request_obj.id,
            "vehicle_number": request_obj.vehicle.registration_number,
            "service_type": request_obj.service_type,
            "request_date": request_obj.request_date,
            "status": request_obj.status
        })

    return Response({
        "customer_name": customer.name,
        "total_vehicles": vehicle_count,
        "pending_services": pending_count,
        "completed_services": completed_count,
        "service_history": history_count,
        "recent_requests": recent_data
    })
# =====================================
# CUSTOMER CRUD
# =====================================

@api_view(['GET', 'POST'])
def customers(request):

    if request.method == 'GET':

        customers = Customer.objects.all()

        serializer = CustomerSerializer(
            customers,
            many=True
        )

        return Response(serializer.data)

    elif request.method == 'POST':

        serializer = CustomerSerializer(
            data=request.data
        )

        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
                status=201
            )

        return Response(
            serializer.errors,
            status=400
        )


@api_view(['GET', 'PUT', 'DELETE'])
def customer_detail(request, id):

    try:
        customer = Customer.objects.get(id=id)

    except Customer.DoesNotExist:

        return Response(
            {"error": "Customer not found"},
            status=404
        )

    if request.method == 'GET':

        serializer = CustomerSerializer(
            customer
        )

        return Response(serializer.data)

    elif request.method == 'PUT':

        serializer = CustomerSerializer(
            customer,
            data=request.data
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(
            serializer.errors,
            status=400
        )

    elif request.method == 'DELETE':

        customer.delete()

        return Response({
            "message": "Customer Deleted"
        })


# =====================================
# VEHICLE CRUD
# =====================================

@api_view(['GET', 'POST'])
def vehicles(request):

    if request.method == 'GET':

        vehicles = Vehicle.objects.all()

        serializer = VehicleSerializer(
            vehicles,
            many=True
        )

        return Response(serializer.data)

    elif request.method == 'POST':

        serializer = VehicleSerializer(
            data=request.data
        )

        if serializer.is_valid():
            serializer.save()

            return Response(
                serializer.data,
                status=201
            )

        return Response(
            serializer.errors,
            status=400
        )


@api_view(['GET', 'PUT', 'DELETE'])
def vehicle_detail(request, id):

    try:

        vehicle = Vehicle.objects.get(id=id)

    except Vehicle.DoesNotExist:

        return Response(
            {"error": "Vehicle not found"},
            status=404
        )

    if request.method == 'GET':

        serializer = VehicleSerializer(
            vehicle
        )

        return Response(serializer.data)

    elif request.method == 'PUT':

        serializer = VehicleSerializer(
            vehicle,
            data=request.data
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(
            serializer.errors,
            status=400
        )

    elif request.method == 'DELETE':

        vehicle.delete()

        return Response({
            "message": "Vehicle Deleted"
        })


# =====================================
# SERVICE REQUEST CRUD
# =====================================

@api_view(['GET', 'POST'])
def service_requests(request):

    if request.method == 'GET':

        requests = ServiceRequest.objects.all()

        serializer = ServiceRequestSerializer(
            requests,
            many=True
        )

        return Response(serializer.data)

    elif request.method == 'POST':

        serializer = ServiceRequestSerializer(
            data=request.data
        )

        if serializer.is_valid():

            serializer.save()

            return Response(
                serializer.data,
                status=201
            )

        return Response(
            serializer.errors,
            status=400
        )


@api_view(['GET', 'PUT', 'DELETE'])
def service_request_detail(request, id):

    try:

        service_request = ServiceRequest.objects.get(
            id=id
        )

    except ServiceRequest.DoesNotExist:

        return Response(
            {"error": "Service Request not found"},
            status=404
        )

    if request.method == 'GET':

        serializer = ServiceRequestSerializer(
            service_request
        )

        return Response(serializer.data)

    elif request.method == 'PUT':

        serializer = ServiceRequestSerializer(
            service_request,
            data=request.data
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(
            serializer.errors,
            status=400
        )

    elif request.method == 'DELETE':

        service_request.delete()

        return Response({
            "message": "Request Deleted"
        })


# =====================================
# SERVICE HISTORY CRUD
# =====================================

@api_view(['GET', 'POST'])
def service_history(request):

    if request.method == 'GET':

        history = ServiceHistory.objects.all()

        serializer = ServiceHistorySerializer(
            history,
            many=True
        )

        return Response(serializer.data)

    elif request.method == 'POST':

        serializer = ServiceHistorySerializer(
            data=request.data
        )

        if serializer.is_valid():

            serializer.save()

            return Response(
                serializer.data,
                status=201
            )

        return Response(
            serializer.errors,
            status=400
        )


@api_view(['GET', 'PUT', 'DELETE'])
def service_history_detail(request, id):

    try:

        history = ServiceHistory.objects.get(
            id=id
        )

    except ServiceHistory.DoesNotExist:

        return Response(
            {"error": "History not found"},
            status=404
        )

    if request.method == 'GET':

        serializer = ServiceHistorySerializer(
            history
        )

        return Response(serializer.data)

    elif request.method == 'PUT':

        serializer = ServiceHistorySerializer(
            history,
            data=request.data
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(
            serializer.errors,
            status=400
        )

    elif request.method == 'DELETE':

        history.delete()

        return Response({
            "message": "History Deleted"
        })


# =====================================
# SEARCH CUSTOMERS
# =====================================

@api_view(['GET'])
def search_customers(request):

    search = request.GET.get(
        "search",
        ""
    )

    customers = Customer.objects.filter(
        Q(name__icontains=search) |
        Q(email__icontains=search) |
        Q(phone__icontains=search)
    )

    serializer = CustomerSerializer(
        customers,
        many=True
    )

    return Response(serializer.data)


# =====================================
# SEARCH VEHICLES
# =====================================

@api_view(['GET'])
def search_vehicles(request):

    search = request.GET.get(
        "search",
        ""
    )

    vehicles = Vehicle.objects.filter(
        Q(vehicle_number__icontains=search) |
        Q(vehicle_name__icontains=search) |
        Q(model__icontains=search)
    )

    serializer = VehicleSerializer(
        vehicles,
        many=True
    )

    return Response(serializer.data)


# =====================================
# SEARCH SERVICE REQUESTS
# =====================================

@api_view(['GET'])
def search_requests(request):

    search = request.GET.get(
        "search",
        ""
    )

    requests = ServiceRequest.objects.filter(
        Q(service_type__icontains=search) |
        Q(status__icontains=search)
    )

    serializer = ServiceRequestSerializer(
        requests,
        many=True
    )

    return Response(serializer.data)
