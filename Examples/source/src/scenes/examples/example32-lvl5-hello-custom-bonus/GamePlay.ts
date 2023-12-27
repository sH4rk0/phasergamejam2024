
// [1]
import Bonus from "./bonus/Bonus";
import BonusCoin from "./bonus/BonusCoin";
import Player from "./player/Player";
export default class GamePlay extends Phaser.Scene {
  private _mainCamera: Phaser.Cameras.Scene2D.Camera;
  private _player: Player;
  private _text: Phaser.GameObjects.Text;
  // [2]
  //Variabile per la gestione dei bonus
  private _groupBonus: Phaser.GameObjects.Group;

  constructor() {
    super({ key: "GamePlay" });
  }
  create() {
    this._mainCamera = this.cameras.main;
    this._mainCamera.setBackgroundColor(0xffffff);
    // [3]
    //creiamo l’istanza di gruppo
    this._groupBonus = this.add.group({ runChildUpdate: true });

    this.add.image(0, 0, "grid").setOrigin(0);
    this.add.image(1024, 0, "grid").setOrigin(0);
    this._text = this.add.text(0, 0, "")
      .setScrollFactor(0)
      .setFontSize(30)
      .setShadow(2, 2, "#000000", 2)
      .setStroke("#ff0000", 5);
    this._mainCamera.setBounds(0, 0, this.game.canvas.width * 2, this.game.canvas.height * 2);
    this.physics.world.setBounds(0, 0, this.game.canvas.width * 2, this.game.canvas.height * 2);

    this._player = new Player({ scene: this, x: 512, y: 300, key: "robo" });
    // [4]
    // richiamiamo il metodo locale addBonus per aggiungere
    // un bonus al gruppo alla posizione 100 100
    this.addBonus(new BonusCoin({ scene: this, x: 100, y: 100, key: "bonus-coin" }));

    this.followPlayer();
    // [5]
    // Creiamo un collider tra il player e il bonus group
    // quando collidono viene richiamato il metodo hitBonus
    this.physics.add.collider(this._player, this._groupBonus, this.hitBonus, undefined, this);

  }
  followPlayer() {
    this._mainCamera.startFollow(this._player, true, .1, .1);
  }
  unfollowPlayer() {
    this._mainCamera.stopFollow();
  }
  updateValues(x: number, y: number) {
    this._text.setText("player position:" + Math.round(x) + " " + Math.round(y));
  }
  // [6]
  //il metodo che viene richiamato quando c’è collisione tra player e bonus
  hitBonus(player: any, bonus: any) {
    //effettuiamo una conversione dal tipo any al tipo corretto
    const _bonus: Bonus = <Bonus>bonus;
    //viene richiamato il metodo getBonus della classe Bonus
    _bonus.getBonus();
  }
  // [7]
  //metodo per aggiungere un bonus al gruppo
  addBonus(bonus: Bonus) {
    this._groupBonus.add(bonus);
  }
  // [8]
  //metodo per rimuovere un bonus dal gruppo
  removeBonus(bonus: Bonus) {
    this._groupBonus.remove(bonus, true, true);
  }

  update(time: number, delta: number): void {
    this._player.update(time, delta);
  }
}
