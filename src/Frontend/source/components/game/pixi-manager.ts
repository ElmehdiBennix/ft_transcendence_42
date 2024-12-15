// PixiManager.ts
import * as PIXI from 'pixi.js';
import { GlowFilter } from 'pixi-filters';
import { Assets, Sprite, Graphics } from 'pixi.js';

let dx = 1;
let dy = 1;

class PixiManager {
  app: PIXI.Application;
  topRacket!: PIXI.Graphics;
  bottomRacket!: PIXI.Graphics;
  ball!: PIXI.Graphics;
  currentUserId: string | undefined;
  backgroundImage: string;
  mode: string;
  keysPressed: Set<string> = new Set('');

  constructor(
    container: HTMLElement,
    currentUserId: string | undefined,
    backgroundImage: string,
    mode: string
  ) {
    this.app = new PIXI.Application();
    this.currentUserId = currentUserId;
    this.backgroundImage = backgroundImage;
    this.mode = mode;
    this.init(container).then(() => {
      this.addEventListeners();
      this.startGameLoop();
    });
  }

  async init(container: HTMLElement) {
    await this.app.init({
      background: '#000000',
      resizeTo: document.getElementById('table') as HTMLElement | Window | undefined,
    });
    container.appendChild(this.app.canvas);
    const backgroundTexture = await Assets.load(this.backgroundImage);
    const background = new Sprite(backgroundTexture);
    background.width = this.app.screen.width;
    background.height = this.app.screen.height;
    background.alpha = 0.2;

    this.app.stage.addChild(background);

    this.topRacket = this.createRacket(
      this.app.screen.width / 2 - 75,
      20,
      170,
      25,
      0xff0000,
      0x000000
    );
    this.bottomRacket = this.createRacket(
      this.app.screen.width / 2 - 75,
      this.app.screen.height - 55,
      170,
      25,
      0x00ffff,
      0x000000
    );

    this.ball = this.createBall(
      this.app.screen.width / 2,
      this.app.screen.height / 2,
      17,
      0xffffff
    );

    this.app.stage.addChild(this.topRacket);
    this.app.stage.addChild(this.bottomRacket);
    this.app.stage.addChild(this.ball);
  }

  createBall(x: number, y: number, radius: number, color: number) {
    const ball = new Graphics();
    ball.fill({ color });
    ball.circle(0, 0, radius);
    ball.fill();
    ball.position.set(x, y);
    return ball;
  }

  createRacket(
    x: number,
    y: number,
    width: number,
    height: number,
    color: number,
    glowColor: number
  ) {
    const racket = new Graphics();

    racket.fill({ color });
    racket.roundRect(0, 0, width, height, 10);
    racket.fill();

    racket.position.set(x, y);

    const glowFilter = new GlowFilter({
      distance: 15,
      outerStrength: 3,
      innerStrength: 3,
      color: glowColor,
      quality: 1,
    });
    racket.filters = [glowFilter];

    return racket;
  }

  updateGameState(data: any) {
    const { ballPosition, topRacketPosition, bottomRacketPosition, playerId } = data;

    const isCurrentPlayerAtBottom = this.currentUserId === playerId;

    this.updateRacketPosition(false, topRacketPosition);
    this.updateRacketPosition(true, bottomRacketPosition);
    this.updateBallPosition(
      ballPosition.x,
      isCurrentPlayerAtBottom ? ballPosition.y : this.app.screen.height - ballPosition.y
    );
  }

  updateScores(data: any) {
    const { topScore, bottomScore } = data;
    // Update score display logic
  }

  handleGameEvent(data: any) {
    const { event } = data;
    if (event === 'gameOver') {
      // Handle game over event
    } else if (event === 'gameStart') {
      // Handle game start event
    } else if (event === 'gamePause') {
      // Handle game pause event
    }
  }

  addEventListeners() {
    window.addEventListener('keydown', this.handleKeyDown.bind(this));
    window.addEventListener('keyup', this.handleKeyUp.bind(this));
    // if (mode.indexOf('multiplayer') !== -1) {
    //   window.addEventListener('keydown', this.handleKeyDown.bind(this));
    //   window.addEventListener('keyup', this.handleKeyUp.bind(this));
    // }
    console.log('Event listeners added');
  }

  handleKeyDown(event: KeyboardEvent) {
    this.keysPressed.add(event.key);
    console.log(`Key down: ${event.key}`);
    console.log(`Keys pressed: ${Array.from(this.keysPressed).join(', ')}`);
  }

  handleKeyUp(event: KeyboardEvent) {
    this.keysPressed.delete(event.key);
    console.log(`Key up: ${event.key}`);
    console.log(`Keys pressed: ${Array.from(this.keysPressed).join(', ')}`);
  }

  startGameLoop() {
    this.app.ticker.add(this.update.bind(this));
    console.log('Game loop started');
  }

  update() {
    const bottomRacket = this.bottomRacket;
    const app = this.app;

    if (!bottomRacket || !app) return;

    const movementSpeed = 5;

    if (this.keysPressed.has('ArrowLeft') && !this.keysPressed.has('ArrowRight')) {
      bottomRacket.x = Math.max(0, bottomRacket.x - movementSpeed);
      console.log(`Moving left: ${bottomRacket.x}`);
    }

    if (this.keysPressed.has('ArrowRight') && !this.keysPressed.has('ArrowLeft')) {
      bottomRacket.x = Math.min(
        app.screen.width - bottomRacket.width,
        bottomRacket.x + movementSpeed
      );
      console.log(`Moving right: ${bottomRacket.x}`);
    }

    if (this.mode.indexOf('local') !== -1) {
      if (
        (this.keysPressed.has('a') ||
        this.keysPressed.has('A')) && (!this.keysPressed.has('d') && !this.keysPressed.has('D'))
      ) {
        this.topRacket.x = Math.max(0, this.topRacket.x - movementSpeed);
        console.log(`Moving left: ${this.topRacket.x}`);
      }

      if (
        (this.keysPressed.has('d') ||
        this.keysPressed.has('D')) && (!this.keysPressed.has('a') && !this.keysPressed.has('A'))
      ) {
        this.topRacket.x = Math.min(
          app.screen.width - this.topRacket.width,
          this.topRacket.x + movementSpeed
        );
        console.log(`Moving right: ${this.topRacket.x}`);
      }
      this.updateBallPositionLocal();
    }
  }

  updateBallPositionLocal() {
    if (!this.ball || !this.app) return;

    const movementSpeed = 4;


    this.ball.x += dx * movementSpeed;
    this.ball.y += dy * movementSpeed;

    console.log(`Ball position: ${this.ball.x}, ${this.ball.y}`);
    console.log(`App screen: ${this.app.screen.width}, ${this.app.screen.height}`);

    if (this.ball.x <= 0 || this.ball.x >= this.app.screen.width) {
      // console.log('Ball hit the wall');
      dx *= -1;
      this.ball.x += dx * movementSpeed;
      // console.log(`Ball position: ${this.ball.x}, ${this.ball.y}`);
    }
    
    if (this.ball.y <= 0 || this.ball.y >= this.app.screen.height) {
      console.log('Ball hit the wall2');
      dy *= -1;
    }
  }

  // const sendRacketPosition = (player: 'top' | 'bottom', position: number) => {
  //   if (socketRef.current) {
  //     socketRef.current.send(
  //       JSON.stringify({
  //         type: 'moveRacket',
  //         player,
  //         position,
  //       })
  //     );
  //   }

  updateBallPosition(x: number, y: number) {
    this.ball.position.set(x, y);
  }

  updateRacketPosition(isBottom: boolean, x: number) {
    if (isBottom) {
      this.bottomRacket.position.x = x;
    } else {
      this.topRacket.position.x = x;
    }
  }

  destroy() {
    if (this.app) {
      this.app.destroy(true, true);
    }
  }
}

export default PixiManager;
