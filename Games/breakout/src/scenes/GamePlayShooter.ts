import { GameData, bulletType } from "../GameData";
import { bonusTypes } from "../GameData";
import Bonus from "../gameComponents/bonus/Bonus.Bricks";
import BonusShooter from "../gameComponents/bonus/Bonus.Shooter";
import BonusBasic from "../gameComponents/bonus/Bonus.Shooter";
import Bullet from "../gameComponents/bullets/Bullet";
import Enemy from "../gameComponents/enemy/Enemy";
import EnemyBasic from "../gameComponents/enemy/Enemy.Basic";
import Player from "../gameComponents/player/Player";
import PlayerShooter from "../gameComponents/player/Player.Shooter";
import Trigger from "../gameComponents/triggers/Trigger";
import GamePlay from "./GamePlay";
import IGamePlay from "./IGamePlay";
import { pick } from 'pick-random-weighted';

export enum PlayerType {
  PLAYER1,
  PLAYER2,
  PLAYER3
}

export default class GamePlayShooter extends GamePlay implements IGamePlay {


  private _playerType: PlayerType;
  private _playerGroup: Phaser.GameObjects.Group;
  private _bg1: Phaser.GameObjects.TileSprite;
  private _bg2: Phaser.GameObjects.TileSprite;

  private _triggerGroup: Phaser.GameObjects.Group;
  private _camera: Phaser.Cameras.Scene2D.Camera;

  //i game objects relativi alla mappa di tile gestita con TILED
  private _map: Phaser.Tilemaps.Tilemap;
  private _tileset: Phaser.Tilemaps.Tileset;
  //in layer viene istanziato il livello di tile visibili
  private _layer: Phaser.Tilemaps.TilemapLayer;
  //in layer 2 il livello per la gestione delle collisioni pavimento e piattaforme
  private _layer2: Phaser.Tilemaps.TilemapLayer;
  private _yCameraMove: number = -0.5;

  private _counter: number = 0;

  private _particlesMuzzle1: Phaser.GameObjects.Particles.ParticleEmitter;
  private _particlesMuzzle2: Phaser.GameObjects.Particles.ParticleEmitter;

  constructor() {
    super();
  }

  init(data: any) {

    if (data.playerType != null) {
      this._playerType = data.playerType;
    } else {
      this._playerType = PlayerType.PLAYER1;
    }

    if (data.level != null) {
      this._level = data.level;
    } else {
      this._level = 0;
    }

  }

  create() {

    this._bonusValues = [
      [bonusTypes.invulnerability, 10],
      [bonusTypes.missile, 20],
      [bonusTypes.damage, 30],
      [bonusTypes.speed, 30],
      [bonusTypes.fireRate, 30],
      [bonusTypes.rear, 90],
      [bonusTypes.side, 90],
      [bonusTypes.side, 90],
    ];

    this._levelData = GameData.levels[this._level];
    this._camera = this.cameras.main;
    this._camera.setBackgroundColor("#ff0000");
    this._camera.setViewport(0, 0, 1280, 800);

    this.sound.playAudioSprite('sfx', 'intro3', { volume: this._sfxVolume });

    //on play sfx end
    this.sound.on('complete', (sound: any, audio: any) => {
      console.log("sound complete", sound.key);
      if (sound.key == "intro3") {
        console.log("intro3 end");
      }
    });

    this._bg1 = this.add.tileSprite(0, 0, 1280, 800, "bg-tile").setOrigin(0, 0).setScrollFactor(0);

    this.add.particles(0, 0, 'stars', {
      frame: [0, 1, 2],
      x: { min: 30, max: 1240 },
      lifespan: 6000,
      frequency: 100,
      speedY: { min: 100, max: 300 },
    }).setScrollFactor(0);

    this._bg2 = this.add.tileSprite(0, 0, 1280, 800, "bg-tile-2").setOrigin(0, 0).setScrollFactor(0);


    this._bonusGroup = this.add.group({ runChildUpdate: true });
    this._bulletGroup = this.add.group({ runChildUpdate: true });
    this._enemyGroup = this.add.group({ runChildUpdate: true });
    this._triggerGroup = this.add.group({ runChildUpdate: true });

    this._player = new PlayerShooter({ scene: this, x: 640, y: 32 * 200, key: "paddle", playerType: PlayerType.PLAYER1 });
    this._playerGroup = this.add.group({ runChildUpdate: true });
    this._playerGroup.add(this._player);

    //collider tra il player e i bonus
    this.physics.add.overlap(this._playerGroup, this._bonusGroup, this.bonusCollider, undefined, this);
    //collider tra il player e i nemici
    this.physics.add.collider(this._playerGroup, this._enemyGroup, this.enemyCollider, undefined, this);
    //collider tra i proiettili del player e i nemici
    this.physics.add.overlap(this._bulletGroup, this._enemyGroup, this.playerBulletCollider, undefined, this);


    this._particlesMuzzle1 = this.add.particles(0, 0, 'explosionParticles', {
      frame: ["smoke-puff", "cloud", "smoke-puff"],
      angle: { min: 240, max: 300 },
      speed: { min: 20, max: 30 },
      quantity: 6,
      lifespan: 2000,
      alpha: { start: 1, end: 0 },
      scale: { start: 0.2, end: 0 },
      emitting: false,
    }).setDepth(1001);

    this._particlesMuzzle2 = this.add.particles(0, 0, 'explosionParticles',
      {
        frame: "muzzleflash2",
        lifespan: 200,
        scale: { start: 0.35, end: 0 },
        rotate: { start: 0, end: 180 },
        emitting: false,
      }
    ).setDepth(1002);

    this.startLevel();

  }


  startLevel(): void {

    this.createMap();
    this._player.enterLevel();

  }


  createMap(): void {

    //se un istanza di map è già attiva la distruggo
    if (this._map != null) this._map.destroy();

    //creo la tilemap usando come chiave map presente in _levelData.shooter.map
    //console.log(this._levelData.shooter.map);
    this._map = this.make.tilemap({ key: this._levelData.shooter.map });

    //definisco i bounds della camera
    //sono posizionati a x:0,y:0 e come larghezza e altezza corrispondono all'altezza e larghezza della mappa
    this._camera.setBounds(
      32, //x
      0, //y
      this._map.widthInPixels, //width
      this._map.heightInPixels //height
    );


    //definisco i bounds della fisica
    //sono posizionati a x:0,y:0 e come larghezza e altezza corrispondono all'altezza e larghezza della mappa
    this.physics.world.setBounds(
      0, //x
      0, //y
      this._map.widthInPixels, //width
      this._map.heightInPixels //height
    );

    //creo il tileset che sarà utilizzato nei singoli layer come texture per le tile
    this._tileset = this._map.addTilesetImage("tilemap-extruded");

    //creo il primo layer che ospiterà le tile del pavimento e delle piattaforme
    //questo layer è solamente visuale e non c'è interazione con nessun game object
    this._layer = this._map
      .createLayer("world", this._tileset, 16, 0)
      .setDepth(1)
      .setAlpha(1);

    //il secondo layer contiene invece le tile con il collide:true per cui i game object potranno interagire con esso
    //questo layer viene settato con alpha a zero
    this._layer2 = this._map
      .createLayer("collision", this._tileset, 0, 0)
      .setDepth(0)
      .setAlpha(1);

    //definisco che tutte le TILE di questo layer con la property collide devono aver collisione con i gameobject
    this._layer2.setCollisionByProperty({
      collide: true,
    });

    //creo un collider tra PLAYER e Layer2
    //senza di questo la collisione non verrebbe eseguita
    this.physics.add.collider(
      this._player,
      this._layer2,
      (_player: any, _tile: any) => {
        //qui è possibile eseguire del codice specifico per verificare la collisione tra il gameObject ed una specifica tile
        // ad esempio la tile oltre alla proprietà collide=true potrebbe avere una proprietà exit=true perché è la tile che ci permette di passare al livello successivo
        if (_tile.properties.exit == true) {
          // eseguo del codice specifico o richiamo un metodo						
          console.log("level completed");
        }

      },
      undefined,
      this
    );

    //centro la camera sulla part di mappa che mi interessa
    this._camera.centerOn(0, this._map.heightInPixels);

    //recupero i trigger dalla mappa
    let _triggers = this._map.getObjectLayer("triggers")!.objects as any[];
    _triggers.forEach((tile: any) => {
      //creo un trigger per ogni tile trovata
      //il trigger è un game object che viene creato con i dati contenuti nella tile
      //i dati sono contenuti nella proprietà value della tile
      //la proprietà value è un json che contiene i dati del trigger
      //il trigger viene creato con questi dati
      //il trigger viene aggiunto al gruppo dei trigger

      if (
        tile.properties != null &&
        tile.properties[0] != null &&
        tile.properties[0].name == "activated" &&
        tile.properties[0].value == true &&
        tile.properties[1] != null &&
        tile.properties[1].name == "activatedOn" &&
        tile.properties[2] != null &&
        tile.properties[2].name == "data" &&
        tile.properties[3] != null &&
        tile.properties[3].name == "type" &&
        tile.properties[3].value != null

      ) {

        this._triggerGroup.add(
          new Trigger({
            scene: this,
            x: tile.x,
            y: tile.y,
            key: "trigger",
            triggerData: {
              activatedOn: tile.properties[1].value,
              type: tile.properties[3].value,
              data: <triggerData>JSON.parse(tile.properties[2].value)
            },
          })

        );

      }
    });

  }

  /* Player
  --------------------------------------*/
  getPlayer(): Player {
    return this._player;
  }

  getPlayerPosition(): Phaser.Math.Vector2 {
    return this._player.getCenter();
  }


  playerBulletCollider(bullet: any, enemy: any) {

    let _bullet: Bullet = <Bullet>bullet;
    let _enemy: Enemy = <Enemy>enemy;
    let _health: number;

    switch (_bullet.name) {
      case bulletType.basic:
        _health = _enemy.updateDamage(_bullet.getDamage());
        this.bulletFlash(_bullet.x, _bullet.y);
        _bullet.remove();
        break;

      case bulletType.missile:
        _health = _enemy.updateDamage(_bullet.getDamage());
        this.bulletFlash(_bullet.x, _bullet.y);
        _bullet.remove();
        break;

      case bulletType.laser:
        _health = _enemy.updateDamage(_bullet.getDamage());
        break;

      case bulletType.orb:
        _health = _enemy.updateDamage(_bullet.getDamage());
        _bullet.updateHealth(_enemy.getStartingHealth());
        break;
    }

    if (_health <= 0) {
      this.createExplosion(_enemy.x, _enemy.y);
      this.sound.playAudioSprite('sfx', 'explosion2', { volume: this._sfxVolume });

      console.log(_enemy.hasBonus());
      if (_enemy.hasBonus()) {
        // la tipologia di bonus è pesata e generata da this.generateBonus()

        let _bonusType = this.generateBonus();
        this.addToBonusGroup(
          new BonusShooter({ scene: this, x: _enemy.x, y: _enemy.y, key: "bonus", bonusData: { score: 0, type: _bonusType }, type: _bonusType })
        );

      }

      this.removeFromEnemyGroup(_enemy);

    } else {
      this.sound.playAudioSprite('sfx', 'fx12', { volume: this._sfxVolume });
    }



  }

  /* Bonus 
  --------------------------------------*/

  generateBonus(): string {
    //utilizza la funzione pick() del modulo pick-random-weighted per genrare un bonus in base alla sua probabilità
    let _randomBonus: string = pick(this._bonusValues);
    return _randomBonus;
  }


  bonusCollider(player: any, bonus: any) {
    let _bonus: Bonus = <Bonus>bonus;
    let _player: PlayerShooter = <PlayerShooter>this._player;

    if (_bonus.isCollected()) return;
    _bonus.getBonus();
    this.sound.playAudioSprite('sfx', 'fx2', { volume: this._sfxVolume });
    switch (_bonus.getType()) {
      case bonusTypes.damage:
        _player.increaseDamage(+1);
        break;
      case bonusTypes.fireRate:
        _player.increaseFireRate(+1);
        break;
      case bonusTypes.speed:
        _player.increaseSpeed(+1);
        break;
      case bonusTypes.shield:
        _player.activateShield();
        break;
      case bonusTypes.invulnerability:
        _player.activateInvulnerability();
        break;
      case bonusTypes.missile:
        _player.activateMissile();
        break;
      case bonusTypes.laser:
        _player.activateLaser();
        break;
      case bonusTypes.side:
        _player.activateSideFire();
        break;
      case bonusTypes.rear:
        _player.activateRearFire();
        break;
      case bonusTypes.orb:
        _player.activateOrb();
        break;

    }

  }



  enemyCollider(player: any, enemy: any) {
    let _enemy: Enemy = <Enemy>enemy;
    this._camera.shake(100, 0.01);
    this.createExplosion(_enemy.x, _enemy.y);
    this.events.emit("update-lives");
  }

  addBoss(bossData: any) {

  }

  bulletFlash(x: number, y: number) {
    this._particlesMuzzle1.emitParticleAt(x, y);
    this._particlesMuzzle2.emitParticleAt(x, y);
  }

  createExplosion(x: number, y: number) {
    let _explosion: Phaser.GameObjects.Sprite = this.add.sprite(x, y, "explosion");
    _explosion.setOrigin(0.5, 0.5).setDepth(1000).setScale(1.5);
    if (!this.anims.exists("enemy-explosion")) {
      let _explosionConfig: Phaser.Types.Animations.Animation = {
        key: "enemy-explosion",
        frames: this.anims.generateFrameNumbers("explosion", { frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24] }),
        frameRate: 30,

      }

      this.anims.create(_explosionConfig);
    }
    _explosion.play("enemy-explosion");
    _explosion.on("animationcomplete", () => {
      _explosion.destroy();
    }, this);

  }


  update(time: number, delta: number): void {
    this._counter += 0.01;
    this._camera.scrollY = this._camera.scrollY + this._yCameraMove;
    //fissiamo il movimento del player dentro una specifica area
    this.physics.world.setBounds(64, this._camera.scrollY + 32, 1280 - 64, 800 - 64);

    this._bg1.tilePositionY -= .1;
    this._bg2.tilePositionY -= .25;

    //console.log(this._enemyGroup.getChildren().length, this._bulletGroup.getChildren().length)

  }


}


