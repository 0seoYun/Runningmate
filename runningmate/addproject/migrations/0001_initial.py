# Generated by Django 4.0.4 on 2022-07-09 22:12

import colorfield.fields
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('startday', models.DateField(default='1000-01-01')),
                ('endday', models.DateField(default='1000-01-01')),
                ('title', models.CharField(max_length=200)),
                ('body', models.TextField(null=True)),
                ('color', colorfield.fields.ColorField(choices=[('#50cfbc', '1'), ('#fe7782', '2'), ('#45bfff', '3'), ('#ffbc54', '4'), ('#735bf2', '5')], default='#FFFFFF', image_field=None, max_length=18, samples=None)),
                ('followers', models.ManyToManyField(related_name='following', to=settings.AUTH_USER_MODEL)),
                ('writer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
