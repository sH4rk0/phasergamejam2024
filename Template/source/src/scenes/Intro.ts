export default class Intro extends Phaser.Scene {

  private _image1: Phaser.GameObjects.Image;



  constructor() {
    super({
      key: "Intro",
    });

  }

  preload() {


  }
  create() {

    //setta il background di sfondo a bianco
    this.cameras.main.setBackgroundColor("#000000");


    this._image1 = this.add.image(this.game.canvas.width / 2, this.game.canvas.height / 2, "phaser")

  }

  update(time: number, delta: number): void {

    this._image1.angle += 1;

  }

}

