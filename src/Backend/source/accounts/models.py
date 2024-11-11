from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings

# Create your models here.
class Player(AbstractUser):

    tournament_display_name=models.CharField(max_length=50, blank=True)
    avatar=models.ImageField(upload_to='Avatars/', default='Avatars/defaultAvatar.jpeg')
    cover=models.ImageField(upload_to='Covers/', default='Covers/defaultCover.jpeg')
    is_online=models.BooleanField(default=False)
    # friends=models.ManyToManyField()
    wins=models.IntegerField(default=0)
    losses=models.IntegerField(default=0)
    enabled_2fa=models.BooleanField(default=False)
    otp_secret_key=models.CharField(max_length=16, default=None, null=True, blank=True) #, null=True, blank=True
    verified_otp=models.BooleanField(default=False)

# class PlayerStats(models.Model):
#     user_id = models.ForeignKey(Player, on_delete=models.CASCADE)
#     games_played = models.IntegerField(default=0)
#     wins=models.IntegerField(default=0)
#     losses=models.IntegerField(default=0)
#     # win_rate=models.IntegerField(default=0)
#     # tournamants_won=models.IntegerField(default=0)
#     # rank=models.IntegerField(default=0)

# # class BlockedUsers(models.Model):
# #     blocked_User_id=models.ForeignKey("Player", on_delete=models.CASCADE)
# #     blocked_by_User_id=models.ForeignKey("Player", on_delete=models.CASCADE)
# #     # event_date = models.models.DateTimeField( auto_now=False, auto_now_add=False) #ma3erft wash anhtajo ou non 

# class Friends(models.Model):
#     friend_requester_id = models.ForeignKey(Player, related_name='friend_requester', on_delete=models.CASCADE ) #, on_delete=models.CASCADE or make it blank Unknown
#     friend_responder_id = models.ForeignKey(Player, related_name='friend_responder', on_delete=models.CASCADE ) #, on_delete=models.CASCADE or make it blank Unknown
