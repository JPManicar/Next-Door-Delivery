# Generated by Django 3.1 on 2021-01-19 02:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Rider',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('RiderNo', models.CharField(max_length=15)),
                ('FirstName', models.CharField(max_length=15)),
                ('LastName', models.CharField(max_length=15)),
                ('preferred_name', models.CharField(max_length=30)),
                ('address', models.TextField(max_length=2000)),
                ('City', models.CharField(max_length=15)),
                ('Province', models.CharField(max_length=15)),
                ('Country', models.CharField(max_length=15)),
                ('ContactNo', models.CharField(max_length=15)),
                ('SecondaryContactNo', models.CharField(max_length=15)),
                ('active_rider', models.BooleanField(default=True)),
                ('Username', models.EmailField(max_length=30)),
                ('Password', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='RiderFeedback',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('feedback', models.CharField(max_length=60)),
            ],
        ),
        migrations.CreateModel(
            name='RiderVehicle',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('PlateNo', models.CharField(max_length=15)),
                ('RiderVehicle', models.CharField(max_length=15)),
                ('active_vehicle', models.BooleanField(default=True)),
                ('RiderAccount', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='rider.rider')),
            ],
        ),
    ]
