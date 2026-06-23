from django.urls import path
from . import views

urlpatterns = [

    # ==========================
    # AUTHENTICATION
    # ==========================

    path(
        "register/",
        views.register_customer,
        name="register_customer"
    ),

    path(
        "login/",
        views.login_customer,
        name="login_customer"
    ),


    # ==========================
    # DASHBOARD
    # ==========================

    path(
        "admin-dashboard/",
        views.admin_dashboard,
        name="admin_dashboard"
    ),

    path(
        "customer-dashboard/<int:customer_id>/",
        views.customer_dashboard,
        name="customer_dashboard"
    ),


    # ==========================
    # CUSTOMERS
    # ==========================

    path(
        "customers/",
        views.customers,
        name="customers"
    ),

    path(
        "customers/<int:id>/",
        views.customer_detail,
        name="customer_detail"
    ),


    # ==========================
    # VEHICLES
    # ==========================

    path(
        "vehicles/",
        views.vehicles,
        name="vehicles"
    ),

    path(
        "vehicles/<int:id>/",
        views.vehicle_detail,
        name="vehicle_detail"
    ),


    # ==========================
    # SERVICE REQUESTS
    # ==========================

    path(
        "requests/",
        views.service_requests,
        name="service_requests"
    ),

    path(
        "requests/<int:id>/",
        views.service_request_detail,
        name="service_request_detail"
    ),


    # ==========================
    # SERVICE HISTORY
    # ==========================

    path(
        "history/",
        views.service_history,
        name="service_history"
    ),

    path(
        "history/<int:id>/",
        views.service_history_detail,
        name="service_history_detail"
    ),


    # ==========================
    # SEARCH
    # ==========================

    path(
        "search/customers/",
        views.search_customers,
        name="search_customers"
    ),

    path(
        "search/vehicles/",
        views.search_vehicles,
        name="search_vehicles"
    ),

    path(
        "search/requests/",
        views.search_requests,
        name="search_requests"
    ),
]