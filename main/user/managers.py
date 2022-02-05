from django.contrib.auth.models import BaseUserManager


class UserManager(BaseUserManager):
    def create_user(self, email: str, username: str, password=None):
        if not email:
            raise ValueError("User Must have an email.")
        user = self.model(
            username=username,
            email=email.lower()
        )
        user.set_password(password).save(using=self._db)
        return user

    def create_superuser(self, email: str, username: str, password=None):
        user = self.create_user(email, username, password)
        user.is_admin = True
        user.save(using=self._db)
        return user
