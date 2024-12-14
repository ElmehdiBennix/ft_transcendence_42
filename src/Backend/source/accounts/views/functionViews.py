from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from ..models import PlayerProfile
from ..serializers.functionSerlizers import *

from django.core.cache import cache

class SearchUsersView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        search_term = request.query_params.get('search', '')

        players = PlayerProfile.objects.filter(
            display_name__istartswith=search_term
        )

        serializer = SearchUsersSerializer(players, many=True)

        return Response({'count': players.count(), 'results': serializer.data}, status=status.HTTP_200_OK)

class LeaderboardView(APIView):
    permission_classes = [IsAuthenticated] # maybe do a formulat for this

    def get(self, request):
        leaderboard = cache.get('top_100_leaderboard')
        if not leaderboard:
            top_players = PlayerProfile.objects.all().order_by('-games_won')[:100]
            serializer = LeaderBoardSerializer(top_players, many=True)
            leaderboard = serializer.data
            cache.set('top_100_leaderboard', leaderboard, timeout=60*5)  # Cache for 5 minutes
        return Response(leaderboard, status=200)
