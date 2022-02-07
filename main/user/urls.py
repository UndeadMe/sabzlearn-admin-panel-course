from django.urls import path
from .views import (
    MTOPView
)

app_name = "user"

urls_patterns = [
    path("token/", MTOPView.as_view(), name="get_token"),

]
