from abc import ABC
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class MTOPSerializer(TokenObtainPairSerializer, ABC):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["name"] = user.name
        return token
