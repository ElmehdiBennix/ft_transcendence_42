# Generated by Django 4.2.15 on 2024-09-24 15:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0005_player_verified_otp_alter_player_otp_secret_key'),
    ]

    operations = [
        migrations.AddField(
            model_name='player',
            name='ola',
            field=models.CharField(default='ola', max_length=20),
        ),
    ]
