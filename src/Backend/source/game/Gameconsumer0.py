# consumers0.py
import json
import asyncio
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from .GameEngine import GameManager
from accounts.models import Player, PlayerProfile
from game.models import Game

game_manager = GameManager()

RED = '\033[31m'
GREEN = '\033[32m'
YELLOW = '\033[33m'
BLUE = '\033[34m'
RESET = '\033[0m'

class GameConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        if not self.scope["user"].is_authenticated:
            await self.close()
            return

        self.user = self.scope["user"]
        self.game = None
        self.game_model = None
        self.JoinedGame = False
        # there is another way to do this, is to set the playerInQueue first the player still in the queue,
        #but it doesnt work because each time the player connect the playerInQueue will be set to False 
        # self.PlayerInQueue = False
        print(f'\n{GREEN}------------>>>>>[User Authentified {self.user}]<<<<<<<<<----------------------{RESET}\n')

        await self.accept()
        await self.add_to_matchmaking()

    async def receive(self, text_data):
        try:
            data = json.loads(text_data)
            action = data.get('action')

            if action == 'move_paddle':
                if self.game:
                    new_y = data.get('position', 50)
                    self.game.move_paddle(self.user.id, new_y)
                    await self.broadcast_game_state()
            elif action == 'ready':
                if self.game and self.game.status == 'waiting':
                    self.game.start_game()
                    await self.start_game_loop()
                    await self.broadcast_game_state()
        except json.JSONDecodeError:
            pass
        except Exception as e:
            pass

    async def get_opponent(self):
        print(f'{RED}Getting opponent{RESET}')
        player2_id = await game_manager.pop_player_from_queue()
        if not player2_id:
            return
        print(f'Player1 ID {BLUE}[{self.user.id}]{RESET} VS Player ID {BLUE}[{player2_id}] {RESET}')
        player2 = await database_sync_to_async(Player.objects.get)(id=player2_id)
        # self.game_model = await database_sync_to_async(Game.objects.create)(
        #             room_name=f'{player2.username}_VS_{self.user.username}',
        #             player1=self.user, player2=player2)
        # self.game_model.game_channel_name = f'{self.user.username}{player2.id}{self.game_model.id}'
        
        return player2

    def player_in_queue(self, player_id):
        queue = game_manager.players_queue.lrange('players_queue', 0, -1)
        print(f'Queue >>>>>>>>>>>>> : {queue}')
        BytesPlayerId = str(player_id).encode()
        return BytesPlayerId in queue

    async def add_to_matchmaking(self):
        #could be there an effecient way for this checks 
        if self.player_in_queue(self.user.id) and game_manager.players_queue.llen('players_queue') == 1:#should i make await here??
            print(f'{RED}Player {self.user.id} already in Queue{RESET}')
            return

        if game_manager.players_queue.llen('players_queue') > 0:
            print(f'{RED}player :{self.user.id}Creating game.......{RESET}')
            try:
                player2 = await self.get_opponent()  # fix function name and await
                self.game = await game_manager.create_game(self.user, player2, self.game_model.id)
                await self.channel_layer.group_add(
                    f'game_{self.game.game_id}',
                    self.channel_name
                )
                await self.broadcast_game_state()
            except:
                #TODO: handle the error
                pass
        else:
            print(f'{YELLOW}Adding player to queue{RESET}')
            await game_manager.add_player_to_queue(self.user.id)
        return

    async def start_game_loop(self):
        while self.game and self.game.status == 'playing':
            delta_time = 1/60  # 60 FPS
            if self.game.update(delta_time):
                await self.broadcast_game_state()
            await asyncio.sleep(delta_time)    
        if self.game and self.game.status == 'finished':
            await self.broadcast_game_state()
            await self.handle_game_end()
            
    async def broadcast_game_state(self):
        if not self.game:
            return
        await self.channel_layer.group_send(
            f'game_{self.game_id}',
            {
                'type': 'game.update',
                'game_state': self.game.get_state()
            }
        )

    async def handle_game_end(self):
        if not self.game:
            return
            
        # Save game result to database
        await self.save_game_result(self.game.get_state())
        
        # Clean up
        game_manager.remove_game(self.game_id)
        self.game = None
        self.game_id = None

    @database_sync_to_async
    def save_game_result(self, game_state):
        pass

    # Implement game result saving logic here
    async def disconnect(self, close_code):
    # TODO handle the unexpeted disconnects or cleanup after normal disconnect 
        # self.channel_layer.group_discard(self.groupe_name, self.channel_name)
        await self.close()

# {"username":"kad","password":"qwe123"}