# Generated by Django 5.2.1 on 2025-05-15 03:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_remove_box_doctor_remove_box_nombre_box_disponible_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='box',
            name='disponible',
        ),
        migrations.RemoveField(
            model_name='doctor',
            name='especialidad',
        ),
    ]
