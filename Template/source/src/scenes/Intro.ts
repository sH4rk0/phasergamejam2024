import { GameData } from "../GameData";

export default class Intro extends Phaser.Scene {

  constructor() {
    super({
      key: "Intro",
    });

  }


  preload() {
    this.cameras.main.setBackgroundColor(GameData.globals.bgColor);
  }

  create() {

    this.add.image(this.game.canvas.width / 2, this.game.canvas.height / 2, "phaser");
  }


  update(time: number, delta: number): void {

  }

}

