import { GameData } from "../GameData";

export default class Boot extends Phaser.Scene {


  constructor() {
    super({
      key: "Boot",
    });
  }

  preload() {
    this.cameras.main.setBackgroundColor(GameData.globals.bgColor);
    this.load.image("logo", "assets/images/phaser.png");
  }

  init() { }

  create() {

    this.scene.start("Preloader");

  }


}
