# Generated by Django 4.0.4 on 2022-07-07 18:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('mateapp', '0002_alter_calendar_datetime'),
    ]

    operations = [
        migrations.RenameField(
            model_name='calendar',
            old_name='datetime',
            new_name='endday',
        ),
    ]
