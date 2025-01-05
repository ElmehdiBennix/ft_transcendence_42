import { OnlineGameManager } from './pixi-manager';

class SocketManager extends WebSocket {
  // socket: WebSocket;
  pixiManager!: OnlineGameManager;

  constructor(url: string) {
    super(url);

    this.onopen = () => {
      console.log('WebSocket connection established');
    };

    this.onmessage = (event) => {
      const message = JSON.parse(event.data);
      this.handleSocketMessage(message);
    };

    this.onclose = () => {
      console.log('WebSocket connection closed');
    };

    this.onerror = (error) => {
      console.log('WebSocket error:', error);
    };
  }

  setPixiManager(manager: OnlineGameManager) {
    this.pixiManager = manager;
  }

  sendData(data: any) {
    this.send(JSON.stringify( data ));
  }

  updateBallPosition(data: any) {
    if (data) {
      console.log('Wata fink asahbi ');
      const scale_x = this.pixiManager.screenWidth / 75;
      const scale_y = this.pixiManager.screenHeight / 100;
  
      const new_x = scale_x * data.position.x;
      const new_y = scale_y * data.position.y;
      
      console.log('scale_x:', scale_x);
      console.log('scale_y:', scale_y);
      // console.log('new_x:', data);
      if (this.pixiManager.isTopPaddle) {
        this.pixiManager.ball.x = this.pixiManager.screenWidth - new_x;
        this.pixiManager.ball.y = this.pixiManager.screenHeight - new_y;
        this.pixiManager.dx = -data.dx;
        this.pixiManager.dy = -data.dy;
      }
      if (!this.pixiManager.isTopPaddle) {
        this.pixiManager.ball.x = new_x;
        this.pixiManager.ball.y = new_y;
        this.pixiManager.dx = data.dx;
        this.pixiManager.dy = data.dy;
      }
  }
  }

  updatePaddlePosition(data: any) {
    if (data) {
      const scale_x = this.pixiManager.screenWidth / 75;
  
      const new_x = scale_x * data.new_x;
  
      if (this.pixiManager.isTopPaddle) {
        this.pixiManager.topRacket.x = this.pixiManager.screenWidth - (new_x + this.pixiManager.paddleWidth);
      } else {
        this.pixiManager.topRacket.x = new_x;
      }
    }
  }



  async handleSocketMessage(message: any) {
    switch (message.type) {
      case 'acknowledgeOpponent':
        this.pixiManager.game.gameId = message.data.game_id;
        this.pixiManager.game.opponent = message.data.opponent;
        this.pixiManager.isTopPaddle = !message.data.top_paddle;
        const scale_y = this.pixiManager.screenHeight / 100;
        if (this.pixiManager.isTopPaddle) {
          this.pixiManager.dy = -20;
        } else {
          this.pixiManager.dy = 20;
        }
        this.pixiManager.game.setGameId(message.data.gameId);
        this.pixiManager.game.setOpponent(message.data.opponent);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        this.sendData({ action: 'ready', game_id: message.data.game_id });
      case 'UpdateBall':
        // this.pixiManager.app.ticker.add(() => {
          // console.log("jfjkbkfskbfskje", message.game_state.ball);
          // this.pixiManager.updateToppaddlePosition(message.game_state.opponent_paddle);
          // console.log('data:', message);
          this.updateBallPosition(message.ball_position);
          // });
          break;
      case 'UpdatePaddle':
        this.updatePaddlePosition(message);
        break;
      case 'UpdateScore':
        let score1 = 0;
        let score2 = 0;
        console.log('message:', message);
        if (this.pixiManager.isTopPaddle) {
          score1 = message.data.top[message.data.round];
          score2 = message.data.bottom[message.data.round];
        } else {
          score1 = message.data.bottom[message.data.round];
          score2 = message.data.top[message.data.round];
        }
        this.pixiManager.game.setGameScore([score1, score2]);
        console.log('scoroooor: ', this.pixiManager.game.GameScore);
      case 'gameState':
        this.pixiManager.game.gameState = message.state;
        this.pixiManager.game.setGameState(message.state);
        break;
      default:
        break;
    }
  }

  close() {
    this.close();
  }
}

export default SocketManager;

//format of socket sending messages:
// {
//   type: 'ready' | 'handleInput',
//   data: any,
// }

// data format for 'ready' message:
// {
//   gameId: string,
// }

// data format for 'handleInput' message:
// {
//   gameId: string,
//   x: number,
//  }

//format of socket recieving messages:
// {
//   type: 'acknowledgeOpponent' | 'gameUpdate' | 'scoreUpdate' | 'gameState',
//   data: any,
// }

// data format for 'acknowledgeOpponent' message:
// {
//   gameId: string,
//   opponent: {
//     id: string,
//     username: string,
// },

// data format for 'gameUpdate' message:
// {
//   ballposition: {
//     x: number,
//     y: number,
//   },
//   topRacket: {
//     x: number,
//   },
// }

// data format for 'scoreUpdate' message:
// {
//   score: {
//    player1: number,
//   player2: number,
// },

// data format for 'gameState' message:
// {
//   state: 'start' | 'over' | 'waiting' | 'paused',
// }
