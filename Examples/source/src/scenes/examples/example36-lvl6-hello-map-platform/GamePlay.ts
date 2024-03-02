import Bonus from "./bonus/Bonus";
import BonusCoin from "./bonus/BonusCoin";
import Enemy from "./enemy/Enemy";
import EnemyBomb from "./enemy/EnemyBomb";
import EnemyRobot from "./enemy/EnemyRobot";
import Player from "./player/Player";

export default class GamePlay extends Phaser.Scene {

  private _mainCamera: Phaser.Cameras.Scene2D.Camera;
  private _player: Player;
  private _text: Phaser.GameObjects.Text;
  private _groupBonus: Phaser.GameObjects.Group;
  private _groupEnemy: Phaser.GameObjects.Group;

  private _bg: Phaser.GameObjects.TileSprite;
  private _bg2: Phaser.GameObjects.TileSprite;
  private _bg3: Phaser.GameObjects.TileSprite;

  //i game objects relativi alla mappa di tile gestita con TILED
  private map: Phaser.Tilemaps.Tilemap;
  private tileset: Phaser.Tilemaps.Tileset;
  //in layer viene istanziato il livello di tile visibili
  private layer: Phaser.Tilemaps.TilemapLayer;
  //in layer 2 il livello per la gestione delle collisioni pavimento e piattaforme
  private layer2: Phaser.Tilemaps.TilemapLayer;
  //in layer 3 il livello per la gestione dell'overlap con le tile
  private layer3: Phaser.Tilemaps.TilemapLayer;
  //in layer 4 il livello per la gestione della collisione tile speciali e nemici
  private layer4: Phaser.Tilemaps.TilemapLayer;
  private _respawnPoint: Phaser.Math.Vector2;

  private _gameCompleted: boolean = false;

  constructor() {
    super({ key: "GamePlay" });
  }

  create() {

    this._mainCamera = this.cameras.main;
    this._gameCompleted = false;
    this._groupBonus = this.add.group({ runChildUpdate: true });
    this._groupEnemy = this.add.group({ runChildUpdate: true });
    this._mainCamera.setBackgroundColor(0x000000);

    this._bg = this.add.tileSprite(0, 0, 1280, 800, "bg1").setOrigin(0, 0).setDepth(0).setScrollFactor(0);
    this._bg2 = this.add.tileSprite(0, 250, 1280, 450, "bg3").setOrigin(0, 0).setDepth(0).setScrollFactor(0);;
    this._bg3 = this.add.tileSprite(0, 250, 1280, 450, "bg4").setOrigin(0, 0).setDepth(0).setScrollFactor(0);;


    this._text = this.add.text(0, 0, "")
      .setScrollFactor(0)
      .setFontSize(30)
      .setShadow(2, 2, "#000000", 2)
      .setStroke("#ff0000", 5).setDepth(100);

    this._player = new Player({ scene: this, x: 500, y: 650, key: "robo-idle" });

    this.followPlayer();

    //richiamo il metodo createMap che gestisce la visualizzazione della mappa
    this.createMap();
    //creo i vari gameobjects prelevandoli dal layer di tiled
    this.setupObjects();

    this.physics.add.overlap(this._player, this._groupBonus, this.hitBonus, undefined, this);
    this.physics.add.collider(this._groupBonus, this.layer2, () => { }, undefined, this);
    this.physics.add.collider(this._groupEnemy, this.layer2, () => { }, undefined, this);
    this.physics.add.collider(this._player, this._groupEnemy, this.hitPlayer, undefined, this);

  }

  hitPlayer(player: any, bomb: any) {
    let _bomb: Enemy = <Enemy>bomb;
    _bomb.destroy();
    this._player.setPosition(this._respawnPoint.x, this._respawnPoint.y);
  }

  followPlayer() {
    this._mainCamera.startFollow(this._player, true, .1, .1);
  }

  unfollowPlayer() {
    this._mainCamera.stopFollow();
  }

  hitBonus(player: any, bonus: any) {

    //effettuiamo una conversione dal tipo any al tipo corretto
    const _bonus: Bonus = <Bonus>bonus;
    //viene esguito il metodo getBonus
    _bonus.getBonus();

  }

  updateValues(x: number, y: number) {
    this._text.setText("player position:" + Math.round(x) + " " + Math.round(y));

  }

  addBonus(bonus: Bonus) {
    this._groupBonus.add(bonus);
  }

  removeBonus(bonus: Bonus) {
    this._groupBonus.remove(bonus, true, true);
    this.events.emit("update-score", [100]);
  }

  addEnemy(enemy: Enemy) {
    this._groupEnemy.add(enemy);
  }

  removeEnemy(enemy: Enemy) {
    this._groupEnemy.remove(enemy, true, true);

  }

  //metodo createMap
  //questo metodo crea la mappa partendo dal file .json e dal tileset
  createMap(): void {

    this._respawnPoint = new Phaser.Math.Vector2(500, 650);

    //se un istanza di map è già attiva la distruggo
    if (this.map != null) this.map.destroy();

    //creo la tilemap usando come chiave "level-" + this._level che è il livello che viene passato alla scena nell'init.
    this.map = this.make.tilemap({ key: "level-0-platform" });

    //definisco i bounds della camera
    //sono posizionati a x:0,y:0 e come larghezza e altezza corrispondono all'altezza e larghezza della mappa
    this.cameras.main.setBounds(
      0, //x
      0, //y
      this.map.widthInPixels, //width
      this.map.heightInPixels //height
    );

    //definisco i bounds della fisica
    //sono posizionati a x:0,y:0 e come larghezza e altezza corrispondono all'altezza e larghezza della mappa
    this.physics.world.setBounds(
      0, //x
      0, //y
      this.map.widthInPixels, //width
      this.map.heightInPixels //height
    );

    //creo il tileset che sarà utilizzato nei singoli layer come texture per le tile
    this.tileset = this.map.addTilesetImage("platform-extruded");

    //creo il primo layer che ospiterà le tile del pavimento e delle piattaforme
    //questo layer è solamente visuale e non c'è interazione con nessun game object
    this.layer = this.map
      .createLayer("world", this.tileset, 0, 0)
      .setDepth(9)
      .setAlpha(1);

    //il secondo layer contiene invece le tile con il collide:true per cui i game object potranno interagire con esso
    //questo layer viene settato con alpha a zero
    this.layer2 = this.map
      .createLayer("collision", this.tileset, 0, 0)
      .setDepth(0)
      .setAlpha(1);

    //definisco che tutte le TILE di questo layer con la property collide devono aver collisione con i gameobject
    this.layer2.setCollisionByProperty({
      collide: true
    });

    this.layer2.forEachTile((tile: Phaser.Tilemaps.Tile) => {

      if (tile.properties.collideTop != undefined && tile.properties.collideTop == true) {
        tile.setCollision(false, false, true, false);
      }

    });



    //il terzo layer contiene invece le tile con il collide:true per cui i game object potranno interagire con esso
    //questo layer viene settato con alpha a zero
    this.layer3 = this.map
      .createLayer("overlap", this.tileset, 0, 0)
      .setDepth(0)
      .setAlpha(0);

    //definisco che tutte le TILE di questo layer con la property collide devono aver collisione con i gameobject
    this.layer3.setCollisionByProperty({
      collide: true
    });

    //il quarto layer contiene invece le tile con il collide:true per cui i game object potranno interagire con esso
    //questo layer viene settato con alpha a zero
    this.layer4 = this.map
      .createLayer("collisionEnemy", this.tileset, 0, 0)
      .setDepth(0)
      .setAlpha(0);

    //definisco che tutte le TILE di questo layer con la property collide devono aver collisione con i gameobject
    this.layer4.setCollisionByProperty({
      collide: true
    });



    //creo un collider tra PLAYER e Layer2
    //senza di questo la collisione non verrebbe eseguita
    this.physics.add.collider(
      this._player,
      this.layer2,
      (_player: any, _tile: any) => {
        //qui è possibile eseguire del codice specifico per verificare la collisione tra il gameObject ed una specifica tile
        // ad esempio la tile oltre alla proprietà collide=true potrebbe avere una proprietà exit=true perché è la tile che ci permette di passare al livello successivo

        if (_tile.properties.death == true) {
          // eseguo del codice specifico o richiamo un metodo						
          this._player.setPosition(this._respawnPoint.x, this._respawnPoint.y);
        }

      },
      undefined,
      this
    );

    //creo un overlap tra PLAYER e Layer2
    //senza di questo l'overlap non verrebbe eseguita
    this.physics.add.overlap(
      this._player,
      this.layer3,
      (_player: any, _tile: any) => {
        //qui è possibile eseguire del codice specifico per verificare la collisione tra il gameObject ed una specifica tile
        // ad esempio la tile oltre alla proprietà collide=true potrebbe avere una proprietà exit=true perché è la tile che ci permette di passare al livello successivo
        if (_tile.properties.exit == true && !this._gameCompleted) {
          // eseguo del codice specifico o richiamo un metodo		
          this._gameCompleted = true;
          console.log("level completed");
        }

        if (_tile.properties.respawn == true) {
          // eseguo del codice specifico o richiamo un metodo	
          this._respawnPoint = new Phaser.Math.Vector2(_tile.pixelX, _tile.pixelY);
        }


      },
      undefined,
      this
    );

    //creo un collider tra Enemy e Layer4
    //senza di questo la collisione non verrebbe eseguita
    this.physics.add.overlap(
      this._groupEnemy,
      this.layer4,
      (_enemy: any, _tile: any) => {

        if (_tile.properties.changeDirection == true && _enemy.name == "robot") {
          //console.log("changeDirection");
          let enemy: EnemyBomb = <EnemyBomb>_enemy;
          // eseguo del codice specifico o richiamo un metodo						
          enemy.changeDirection();

        }

      },
      undefined,
      this
    );

  }

  setupObjects(): void {

    //recuperiamo il layer object dalla mappa di TILED
    let _objLayer: Phaser.Tilemaps.ObjectLayer = this.map.getObjectLayer("gameObjects");


    // controlliamo che _objLayer non sia null
    if (_objLayer != null) {
      // recuperiamo gli objects all'interno del layer
      let _objects: any = _objLayer.objects as any[];
      // cicliamo l'array 
      _objects.forEach((tile: Phaser.Tilemaps.Tile) => {


        //convertiamo la property in un oggetto al quale possiamo accedere
        var _objectValue = JSON.parse(tile.properties[0].value).type;

        switch (_objectValue) {
          case "bonus":

            this.addBonus(new BonusCoin({
              scene: this, x: tile.x, y: tile.y, key: "bonus-coin"
            }));
            break;
          case "enemyBomb":
            console.log("enemyBomb");
            this.addEnemy(new EnemyBomb({
              scene: this, x: tile.x, y: tile.y, key: "bomb"
            }));
            break;

          case "enemyRobot":
            console.log("enemyRobot");
            this.addEnemy(new EnemyRobot({
              scene: this, x: tile.x, y: tile.y, key: "robo2"
            }));
            break;
        }



      });
    }

  }


  update(time: number, delta: number): void {

    if (!this._gameCompleted) {
      this._player.update(time, delta);
      this._bg.tilePositionX = this._mainCamera.scrollX * .05;
      this._bg2.tilePositionX = this._mainCamera.scrollX * .07;
      this._bg3.tilePositionX = this._mainCamera.scrollX * .15;
    } else {
      this.scene.stop(this);
      this.scene.start("GameOver");
    }

  }

}
