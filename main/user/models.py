from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from .managers import UserManager


class User(AbstractBaseUser):
    username = models.CharField(verbose_name="username", db_column="username", max_length=150, unique=True)
    email = models.EmailField(verbose_name="email", db_column="email", max_length=150, unique=True)
    f_name = models.CharField(verbose_name="first name", db_column="f_name", max_length=80, default="None")
    l_name = models.CharField(verbose_name="last name", db_column="l_name", max_length=80, default="None")
    image = models.ImageField(verbose_name="profile image", db_column="image", upload_to="/")

    is_active = models.BooleanField(verbose_name="user is active?", db_column="is_active", default=True)
    is_admin = models.BooleanField(verbose_name="user is admin?", db_column="is_admin", default=False)

    objects = UserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.username

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return self.is_admin

    @property
    def is_staff(self):
        return self.is_admin

