import Bonus from "./bonus/Bonus";
import BonusCoin from "./bonus/BonusCoin";
import Player from "./player/Player";

export default class GamePlay extends Phaser.Scene {

  private _mainCamera: Phaser.Cameras.Scene2D.Camera;
  private _player: Player;
  private _text: Phaser.GameObjects.Text;
  private _groupBonus: Phaser.GameObjects.Group;

  //i game objects relativi alla mappa di tile gestita con TILED
  private map: Phaser.Tilemaps.Tilemap;
  private tileset: Phaser.Tilemaps.Tileset;
  //in layer viene istanziato il livello di tile visibili
  private layer: Phaser.Tilemaps.TilemapLayer;
  //in layer 2 il livello per la gestione delle collisioni pavimento e piattaforme
  private layer2: Phaser.Tilemaps.TilemapLayer;

  constructor() {
    super({ key: "GamePlay" });
  }

  create() {

    this._mainCamera = this.cameras.main;
    this._mainCamera.setBackgroundColor(0xffffff);
    this._groupBonus = this.add.group({ runChildUpdate: true });

    this.add.image(0, 0, "bg6").setOrigin(0);


    this._text = this.add.text(0, 0, "")
      .setScrollFactor(0)
      .setFontSize(30)
      .setShadow(2, 2, "#000000", 2)
      .setStroke("#ff0000", 5);

    this._player = new Player({ scene: this, x: 100, y: 100, key: "robo-idle" });

    this.followPlayer();

    //richiamo il metodo createMap che gestisce la visualizzazione della mappa
    this.createMap();
    //creo i vari gameobjects prelevandoli dal layer di tiled
    this.setupObjects();

    this.physics.add.collider(this._player, this._groupBonus, this.hitBonus, undefined, this);

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
  }

  //metodo createMap
  //questo metodo crea la mappa partendo dal file .json e dal tileset
  createMap(): void {

    //se un istanza di map è già attiva la distruggo
    if (this.map != null) this.map.destroy();

    //creo la tilemap usando come chiave "level-" + this._level che è il livello che viene passato alla scena nell'init.
    this.map = this.make.tilemap({ key: "level-0" });

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
    this.tileset = this.map.addTilesetImage("tilemap-extruded");

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
      collide: true,
    });


    //definisco che la camera deve seguire il player
    this.cameras.main.startFollow(
      this._player,
      true,
      1,
      1,
      0,
      0);



    //creo un collider tra PLAYER e Layer2
    //senza di questo la collisione non verrebbe eseguita
    this.physics.add.collider(
      this._player,
      this.layer2,
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
        }



      });
    }

  }


  update(time: number, delta: number): void {
    this._player.update(time, delta);
  }

}
