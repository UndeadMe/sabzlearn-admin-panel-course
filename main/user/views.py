from rest_framework.views import APIView


class LoginView(APIView):
    def post(self, request): ...


class RegisterView(APIView):
    def post(self, request): ...


class RegisterCodeView(APIView):
    def post(self, request): ...


class ChangePasswordView(APIView):
    def post(self, request): ...
