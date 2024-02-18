from authentication.models import CustomUser
from django.db import models

# Create your models here.
class Vacancy(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, default=1)
    company_name = models.CharField(max_length=200)
    company_address = models.CharField(max_length=200)
    position = models.CharField(max_length=300)
    description = models.CharField(max_length=1000)
    salary = models.CharField(max_length=100)
    job_type = models.CharField(max_length=100)