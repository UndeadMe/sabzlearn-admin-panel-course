from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import (
    MTOPSerializer
)


class MTOPView(TokenObtainPairView):
    serializer_class = MTOPSerializer


class LoginView(APIView):
    def post(self, request): ...


class RegisterView(APIView):
    def post(self, request): ...


class RegisterCodeView(APIView):
    def post(self, request): ...


class ChangePasswordView(APIView):
    def post(self, request): ...
