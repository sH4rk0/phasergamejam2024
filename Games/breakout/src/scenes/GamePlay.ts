import { GameData, bonusTypes } from "../GameData";
import { pick } from 'pick-random-weighted';
import Bonus from "../gameComponents/bonus/Bonus.Bricks";
import Player from "../gameComponents/player/Player";
import IGamePlay from "./IGamePlay";
import Bullet from "../gameComponents/bullets/Bullet";
import Enemy from "../gameComponents/enemy/Enemy";
import PlayerShooter from "../gameComponents/player/Player.Shooter";
import PlayerBreakout from "../gameComponents/player/Player.Breakout";
import BulletBall from "../gameComponents/bullets/Bullet.Ball";
import PlayerPlatform from "../gameComponents/player/Player.Platform";

export default class GamePlay extends Phaser.Scene implements IGamePlay {

  protected _sfxVolume: number = 0.1;
  protected _level: number = 0;
  protected _levelData: levelConfig;
  protected _levelText: Phaser.GameObjects.Text;
  protected _bonusValues: Array<[string, number]>;

  protected _bonusGroup: Phaser.GameObjects.Group;
  protected _bulletGroup: Phaser.GameObjects.Group;
  protected _enemyGroup: Phaser.GameObjects.Group;

  protected _player: PlayerShooter | PlayerBreakout | PlayerPlatform;
  protected _playerIsActivated: boolean = false;


  constructor() {
    super({
      key: "GamePlay",
    });


  }

  init(data: { level: number }): void {
    if (data == null || data.level == null) {
      this._level = 0;
    } else {
      this._level = data.level;
    }

    this._levelData = GameData.levels[this._level];
  }

  create(): void { }
  update(time: number, delta: number): void { }

  getSfxVolume(): number {
    return this._sfxVolume;
  }

  setSfxVolume(volume: number): void {
    this._sfxVolume = volume;
  }


  removeFromBulletGroup(bullet: Bullet): void {
    this._bulletGroup.remove(bullet, true, true);
  }
  removeFromEnemyGroup(enemy: Enemy): void {
    this._enemyGroup.remove(enemy, true, true);
  }
  /*removeFromBallsGroup(ball: Ball): void {
    this._ballsGroup.remove(ball, true, true);
  }*/
  removeFromBonusGroup(bonus: Bonus): void {
    this._bonusGroup.remove(bonus, true, true);
  }


  addToBulletGroup(bullet: Bullet): void {
    this._bulletGroup.add(bullet);
  };
  addToEnemyGroup(enemy: Enemy): void {
    this._enemyGroup.add(enemy);
  };
  addToBonusGroup(bonus: Bonus): void {
    this._bonusGroup.add(bonus);
  };
  /*addToBallsGroup(ball: Ball): void {
    this._ballsGroup.add(ball);
  };*/


  checkBallsInPlay(bullet: BulletBall): void { }
  getBonusBall(): void { }
  getBonusLaser(): void { }
  getBonusEnlarge(): void { }
  getBonusScore(): void { }

  levelCompleted(): void { }
  getPlayerPosition(): Phaser.Math.Vector2 {
    return new Phaser.Math.Vector2(0, 0);
  }
  getEnemies(): Phaser.GameObjects.GameObject[] {
    return this._enemyGroup.getChildren();
  }

  getPlayer(): Player {
    return this._player;
  }


}
