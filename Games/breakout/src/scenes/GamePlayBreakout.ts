import { bonusTypes, brickType } from "../GameData";
import Bonus from "../gameComponents/bonus/Bonus.Bricks";
import { pick } from 'pick-random-weighted';
import GamePlay from "./GamePlay";
import PlayerBreakout from "../gameComponents/player/Player.Breakout";
import BonusBricks from "../gameComponents/bonus/Bonus.Bricks";
import EnemyBrick from "../gameComponents/enemy/Enemy.Brick";
import EnemyBrickUnbreakable from "../gameComponents/enemy/Enemy.Brick.Unbreakable";
import Enemy from "../gameComponents/enemy/Enemy";
import BulletBall from "../gameComponents/bullets/Bullet.Ball";

export default class GamePlayBreakout extends GamePlay {

  constructor() {
    super();
  }

  create() {

    this._bonusValues = [
      [bonusTypes.laser, 10],
      [bonusTypes.ball, 30],
      [bonusTypes.enlarge, 30],
      [bonusTypes.score, 90]
    ];

    this.physics.world.setBoundsCollision(true, true, true, false);
    this.physics.world.setBounds(18, 18, 1280 - 36, 800);

    this.add.image(0, 0, "bg-0").setOrigin(0, 0);
    this.add.image(0, 0, "borders").setOrigin(0, 0);

    this.sound.playAudioSprite('sfx', 'intro2', { volume: this._sfxVolume });

    this.add.particles(0, 0, 'stars', {
      frame: [0, 1, 2],
      x: { min: 30, max: 1240 },
      lifespan: 6000,
      frequency: 100,
      speedY: { min: 100, max: 300 },
    });

    this._enemyGroup = this.add.group({});
    this._bonusGroup = this.add.group({});
    this._bulletGroup = this.add.group({ runChildUpdate: true });
    this.setupBricks();

    this.createBall(640, 700, true);

    this._player = new PlayerBreakout({
      scene: this,
      x: 640,
      y: 750,
      key: "paddle",
    });

    //  Our colliders
    this.physics.add.collider(this._bulletGroup, this._enemyGroup, this.hitBrick, null, this);
    this.physics.add.collider(this._bulletGroup, this._player, this.hitPaddle, null, this);
    this.physics.add.overlap(this._player, this._bonusGroup, this.hitBonus, null, this);

    //Al movimento del mouse il paddle si muove
    this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      if (this._playerIsActivated == false) return;
      let _size = (this._player.width * this._player.scale) / 1.5;
      this._player.x = Phaser.Math.Clamp(pointer.x, _size, 1280 - _size);

      this._bulletGroup.getChildren().forEach((ball: any) => {
        if (ball.getData('onPaddle')) {
          ball.x = this._player.x;
        }
      });

    }, this);

    //al click del mouse il paddle rilascia la palla
    this.input.on('pointerup', (pointer: Phaser.Input.Pointer) => {
      if (!this._playerIsActivated) return;

      this._bulletGroup.getChildren().forEach((ball: any) => {

        if (ball.getData('onPaddle')) {
          ball.setVelocity(Phaser.Math.RND.integerInRange(-75, 75), -300);
          ball.setData('onPaddle', false);
        }

      });

    }, this);

    this._levelText = this.add.text(this.game.canvas.width / 2, this.game.canvas.height / 2, this._levelData.title, { color: "#ffffff" }).setFontFamily("'Press Start 2P'").setOrigin(0.5, 0.5).setFontSize(40).setAlpha(0);


    this.tweens.add({
      targets: [this._levelText],
      alpha: 1,
      duration: 500,
      delay: 250,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        this._playerIsActivated = true;
        this._player.activate();
        this._player.playAnimation("player-blink");
      }
    });

  }

  createBall(x: number, y: number, onPaddle: boolean, velX?: number, velY?: number): void {

    let _ball: BulletBall = new BulletBall({ scene: this, x: x, y: y, key: "balls", direction: 0, damage: 0, frame: 0 });
    _ball.setData('onPaddle', onPaddle);

    if (velX != null && velY != null) {
      _ball.setVelocity(velX, velY);
    }
    this.addToBulletGroup(_ball);

  }

  setupBricks() {

    let _rows: number = this._levelData.breakout.bricks.length / 16;
    let _row: number = 0;
    let _column: number = 0;
    let _brickObject: { type: number, frame: number, hit: number };

    this._levelData.breakout.bricks.forEach((brick: brickType, index: number) => {

      _column = Math.floor(index / 16)
      _row = index % 16;

      _brickObject = this.getBrickType(brick);

      //console.log(_brickObject);
      if (_brickObject.type != brickType.none) {

        let _brick: EnemyBrick | EnemyBrickUnbreakable = null;

        if (_brickObject.type == brickType.silver || _brickObject.type == brickType.gold) {
          _brick = new EnemyBrickUnbreakable({ scene: this, x: 64 * _row + this._levelData.breakout.offset.x, y: 32 * _column + this._levelData.breakout.offset.y, key: "bricks", frame: _brickObject.frame, enemyData: { hit: _brickObject.hit, type: _brickObject.type } });
        } else {
          _brick = new EnemyBrick({ scene: this, x: 64 * _row + this._levelData.breakout.offset.x, y: 32 * _column + this._levelData.breakout.offset.y, key: "bricks", frame: _brickObject.frame, enemyData: { hit: _brickObject.hit, type: _brickObject.type } });
        }

        this.addToEnemyGroup(_brick);


      }


    });

  }

  getBrickType(brick: number): { type: brickType, frame: number, hit: number } {

    let _hit: number = 0;
    let _frame: number = null;
    let _brickType: brickType = brickType.none;

    if (brick == 0) { _brickType = brickType.none; }
    else if (brick >= 10 && brick < 20) { _brickType = brickType.blue; _hit = brick - 10; _frame = 23; }
    else if (brick >= 20 && brick < 30) { _brickType = brickType.red; _hit = brick - 20; _frame = 24; }
    else if (brick >= 30 && brick < 40) { _brickType = brickType.cyan; _hit = brick - 30; _frame = 25; }
    else if (brick >= 40 && brick < 50) { _brickType = brickType.yellow; _hit = brick - 40; _frame = 21; }
    else if (brick >= 50 && brick < 60) { _brickType = brickType.silver; _hit = brick - 50; _frame = 9; }
    else if (brick >= 60 && brick < 70) { _brickType = brickType.purple; _hit = brick - 60; _frame = 22; }
    else if (brick >= 70 && brick < 80) { _brickType = brickType.gold; _hit = brick - 70; _frame = 19; }
    else if (brick >= 80 && brick < 90) { _brickType = brickType.orange; _hit = brick - 80; _frame = 26; }
    else if (brick >= 90 && brick < 100) { _brickType = brickType.white; _hit = brick - 90; _frame = 20; }

    if (_hit == 0) { _hit = 1; }
    return { type: _brickType, frame: _frame, hit: _hit };

  }



  hitBrick(ball: any, brick: any): void {

    let _brick: Enemy = <Enemy>brick;
    _brick.updateDamage(1);
    this.children.bringToTop(_brick);

    if (_brick.isDestroyed()) {
      this.events.emit('update-score', [_brick.getScore()]);

      if (_brick.hasBonus()) {
        // la tipologia di bonus è pesata e generata da this.generateBonus()

        let _bonusType = this.generateBonus();
        this.addToBonusGroup(
          new BonusBricks({ scene: this, x: brick.x, y: brick.y, key: "bonus", bonusData: { score: 0, type: _bonusType }, type: _bonusType })
        );

      }

    }

  }


  getBonusBall(): void {
    this.sound.playAudioSprite('sfx', 'fx2', { volume: this._sfxVolume });
    let _ball = this._bulletGroup.getFirst(true);
    this.createBall(_ball.x, _ball.y, false, Phaser.Math.RND.integerInRange(-75, +75), _ball.body.velocity.y);
    this.createBall(_ball.x, _ball.y, false, Phaser.Math.RND.integerInRange(-75, +75), _ball.body.velocity.y);
  }

  getBonusEnlarge(): void {
    this.sound.playAudioSprite('sfx', 'fx1', { volume: this._sfxVolume });
    this._player.enlarge();
  }

  getBonusLaser(): void { }

  getBonusScore(): void {
    this.sound.playAudioSprite('sfx', 'fx2', { volume: this._sfxVolume });
    this.events.emit('update-score', [100]);
  }

  generateBonus(): string {
    //utilizza la funzione pick() del modulo pick-random-weighted per genrare un bonus in base alla sua probabilità
    let _randomBonus: string = pick(this._bonusValues);
    return _randomBonus;
  }

  resetBall(): void {
    this.sound.playAudioSprite('sfx', 'death2', { volume: this._sfxVolume });
    let _ball: BulletBall = this._bulletGroup.getFirst(true);
    this._player.normalSize();
    _ball.setVelocity(0, 0);
    _ball.setPosition(this._player.x, 700);
    _ball.setData('onPaddle', true);
  }

  resetLevel(): void {
    this.resetBall();
    this._enemyGroup.children.each(
      (brick: any) => brick.enableBody(false, 0, 0, true, true));
  }

  hitBonus(paddle: any, bonus: any): void {

    let _bonus: Bonus = <Bonus>bonus;
    if (_bonus.isCollected()) return;
    _bonus.getBonus();
    this.sound.playAudioSprite('sfx', 'fx2', { volume: this._sfxVolume });

    switch (_bonus.getType()) {
      case bonusTypes.ball:
        this.getBonusBall();
        break;
      case bonusTypes.laser:
        this.getBonusLaser();
        break;
      case bonusTypes.enlarge:
        this.getBonusEnlarge();
        break;
      case bonusTypes.score:
        this.getBonusScore();
        break;

    }



  }

  checkBallsInPlay(bullet: BulletBall): void {

    if (this._bulletGroup.getChildren().length == 1) {
      this.events.emit('update-lives');
      this.resetBall();
    } else if (this._bulletGroup.getChildren().length > 1) {
      this.removeFromBulletGroup(bullet);
    }
  }

  hitPaddle(ball: any, paddle: any): void {
    let diff = 0;

    let _ball: BulletBall = <BulletBall>ball;

    this.sound.playAudioSprite('sfx', 'bounce2', { volume: this._sfxVolume });

    if (_ball.x < paddle.x) {
      //  Ball is on the left-hand side of the paddle
      diff = paddle.x - ball.x;
      _ball.setVelocityX(-10 * diff);
    }
    else if (_ball.x > paddle.x) {
      //  Ball is on the right-hand side of the paddle
      diff = ball.x - paddle.x;
      _ball.setVelocityX(10 * diff);
    }
    else {
      //  Ball is perfectly in the middle
      //  Add a little random X to stop it bouncing straight up!
      _ball.setVelocityX(2 + Math.random() * 8);
    }
  }

  areAllBricksDestroyed(): boolean {

    let _bricks: number = 0;
    this._enemyGroup.getChildren().forEach((element: any) => {
      let _brick: Enemy = <Enemy>element;
      if (!_brick.isIndistructible()) {
        _bricks++;
      }
    });
    if (_bricks == 0) return true;
    return false
  }

  update(time: number, delta: number): void {


    if (this.areAllBricksDestroyed()) {
      this.levelCompleted();
    }

    if (this._playerIsActivated) {
      this._player.update(time, delta);
    }


  }

  levelCompleted(): void {

    this._levelText.setText("Level Completed");
    this._playerIsActivated = false;
    this._player.deactivate();
    this._bulletGroup.getChildren().forEach((ball: any) => {
      ball.disable();
    });

    this.tweens.add({
      targets: [this._levelText],
      alpha: 1,
      duration: 500,
      delay: 250,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        this.scene.stop(this);
        this.scene.start('Prelevel', { level: this._level + 1 });
      }
    });


  }



}
