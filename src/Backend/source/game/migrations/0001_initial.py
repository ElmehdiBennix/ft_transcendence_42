# Generated by Django 5.1.2 on 2024-11-25 22:55

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Game',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(choices=[('WAITING', 'Waiting'), ('IN_PROGRESS', 'In Progress'), ('COMPLETED', 'Completed')], default='WAITING', max_length=20)),
                ('room_name', models.CharField(max_length=100)),
                ('player1_score', models.IntegerField(default=0)),
                ('player2_score', models.IntegerField(default=0)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('player1', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='games_as_player1', to='accounts.playerprofile')),
                ('player2', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='games_as_player2', to='accounts.playerprofile')),
                ('winner', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='game_win', to='accounts.playerprofile')),
            ],
            options={
                'ordering': ['-created_at'],
            },
        ),
        migrations.CreateModel(
            name='GameMove',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('x_position', models.FloatField()),
                ('y_position', models.FloatField()),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('game', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='moves', to='game.game')),
                ('player', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='accounts.playerprofile')),
            ],
            options={
                'ordering': ['timestamp'],
            },
        ),
        migrations.CreateModel(
            name='LeaderboardEntry',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rank', models.IntegerField()),
                ('last_updated', models.DateTimeField(auto_now=True)),
                ('player', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='accounts.playerprofile')),
            ],
            options={
                'ordering': ['rank'],
            },
        ),
    ]
