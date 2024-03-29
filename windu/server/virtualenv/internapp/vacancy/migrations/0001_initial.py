# Generated by Django 5.0.1 on 2024-02-17 21:35

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Vacancy',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('company_name', models.CharField(max_length=200)),
                ('company_address', models.CharField(max_length=200)),
                ('position', models.CharField(max_length=300)),
                ('description', models.CharField(max_length=1000)),
                ('salary', models.CharField(max_length=100)),
                ('job_type', models.CharField(max_length=100)),
            ],
        ),
    ]
