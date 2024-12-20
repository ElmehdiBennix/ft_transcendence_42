from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from ..models import PlayerProfile
from ..serializers.functionSerlizers import *

# from django.core.cache import cache

class SearchUsersView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        search_term = request.query_params.get('search', '')

        # try:
        players = PlayerProfile.objects.filter(
            display_name__istartswith=search_term
        )

        serializer = SearchUsersSerializer(players, many=True)
        return Response({'count': players.count(), 'results': serializer.data}, status=status.HTTP_200_OK)
        # except:
        #     return Response({'message': 'failed to search users'}, status=400)


class LeaderboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # try:
            top_players = PlayerProfile.objects.all().order_by(
                '-win_ratio',
                '-total_games',
                '-level',
                '-games_won'
            )[:100]

            serializer = LeaderBoardSerializer(top_players, many=True)
            return Response(serializer.data, status=200)
        # except:
        #     return Response({'message': 'failed to get leaderboard'}, status=400)

class StatisticsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        print(f" <=== DEBUG1 ===============> request: {request}\n")
        # try:

        print(f" <=== DEBUG2 ===============> profile: {request.user.profile}\n")
        profile = PlayerProfile.objects.get(player=request.user)
        print(f" <=== DEBUG3 ===============> profile: {profile}\n")

        serializer = StatisticsSerializer(profile)
        return Response(serializer.data, status=200)
        # except:
        #     return Response({'message': 'failed to get statistics'}, status=400)
