from django.db import models

class Applicant(models.Model):
    name = models.CharField(max_length=255)
    age = models.IntegerField()
    email = models.EmailField()
    appliedPosition = models.CharField(max_length=255)
    university = models.CharField(max_length=255)
    degree = models.CharField(max_length=255)
    gpa = models.FloatField()
    linkedIn = models.CharField(max_length=255)
    github = models.CharField(max_length=255)
    cv = models.CharField(max_length=255)