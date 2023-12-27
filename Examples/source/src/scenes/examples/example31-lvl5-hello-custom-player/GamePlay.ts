//importiamo la classe Player nella scena
import Player from "./player/Player";


export default class GamePlay extends Phaser.Scene {

  //variabile locale che associeremo alla main camera
  private _mainCamera: Phaser.Cameras.Scene2D.Camera;
  //variabile locale che conterrà l’istanza del Player
  private _player: Player;

  constructor() {
    super({ key: "GamePlay" });
  }

  create() {

    this._mainCamera = this.cameras.main;
    this._mainCamera.setBackgroundColor(0x000000);
    //aggiungiamo un’immagine qualunque alla scena in modo da renderci conto
    // del movimento del Player
    // potete inserire una qualunque immagine abbastanza grande in modo
    // da poter percepire il movimento del Player e quindi della camera 
    this.add.image(0, 0, "grid").setOrigin(0);
    this.add.image(1024, 0, "grid").setOrigin(0);
    //settiamo i bounds della camera e del world
    this._mainCamera.setBounds(
      0, //x
      0, //y
      this.game.canvas.width * 2, //laghezza
      this.game.canvas.height * 2 //altezza
    );

    this.physics.world.setBounds(
      0, //x
      0, //y
      this.game.canvas.width * 2, //laghezza
      this.game.canvas.height * 2 //altezza
    );
    //Creiamo l’istanza del Player
    this._player = new Player({ scene: this, x: 512, y: 300, key: "robo" });
    //Richiamiamo un metodo custom della nostra scena che attiva il follow
    //della camera sul nostro player
    this.followPlayer();




  }

  followPlayer() {
    //associamo la main camera alla nostra istanza di Player
    // come visto nel capitolo dedicato alla camera
    this._mainCamera.startFollow(this._player, true, .1, .1);
  }

  update(time: number, delta: number): void {
    //richiamiamo il metodo update del player per rendere attivo
    // il controllo sui tasti
    this._player.update(time, delta);
  }

}
