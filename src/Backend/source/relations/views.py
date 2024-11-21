from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Player, Friends, FriendInvitation, BlockedFriends
from .serializers import PlayerSerializer, FriendInvitationSerializer, BlockedFriendsSerializer, FriendsSerializer

class FriendsListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        friends = Friends.objects.filter(friend_requester=user) | Friends.objects.filter(friend_responder=user)
        serializer = FriendsSerializer(friends, many=True)
        return Response(serializer.data)

class PendingInvitationsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        pending_invitations = FriendInvitation.objects.filter(receiver=user, status='pending')
        serializer = FriendInvitationSerializer(pending_invitations, many=True)
        return Response(serializer.data)

class BlockedFriendsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        blocked_users = BlockedFriends.objects.filter(blocker=user)
        blocked_list = [block.blocked for block in blocked_users]
        serializer = PlayerSerializer(blocked_list, many=True)
        return Response(serializer.data)

    def post(self, request):
        blocker = request.user
        blocked_username = request.data.get('blocked')
        try:
            blocked = Player.objects.get(username=blocked_username)
        except Player.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        if blocker == blocked:
            return Response({"error": "You cannot block yourself"}, status=status.HTTP_400_BAD_REQUEST)

        block, created = BlockedFriends.objects.get_or_create(blocker=blocker, blocked=blocked)
        if not created:
            return Response({"error": "User already blocked"}, status=status.HTTP_400_BAD_REQUEST)

        serializer = BlockedFriendsSerializer(block)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class FriendInvitationView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        sender = request.user
        receiver_username = request.data.get('receiver')
        try:
            receiver = Player.objects.get(username=receiver_username)
        except Player.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        if sender == receiver:
            return Response({"error": "You cannot send a friend request to yourself"}, status=status.HTTP_400_BAD_REQUEST)

        invitation, created = FriendInvitation.objects.get_or_create(sender=sender, receiver=receiver)
        if not created:
            return Response({"error": "Friend request already sent"}, status=status.HTTP_400_BAD_REQUEST)

        serializer = FriendInvitationSerializer(invitation)
        return Response(serializer.data, status=status.HTTP_201_CREATED)