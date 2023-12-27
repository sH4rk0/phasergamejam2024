export default class Intro extends Phaser.Scene {

  private _image1: Phaser.GameObjects.Image;
  private _image2: Phaser.GameObjects.Image;
  private _image3: Phaser.GameObjects.Image;
  private _image4: Phaser.GameObjects.Image;
  private _image5: Phaser.GameObjects.Image;
  private _counter: number = 0;
  private _clicked: boolean = false;

  constructor() {
    super({
      key: "Intro",
    });


  }

  preload() {


  }
  create() {

    //setta il background di sfondo a bianco
    this.cameras.main.setBackgroundColor("#ffffff");

    this._image1 = this.add.image(150, 150, "logo-phaser");
    this._image2 = this.add.image(150, 300, "logo-phaser").setAngle(45).setScale(.5);
    this._image3 = this.add.image(150, 450, "logo-phaser").setAngle(45).setScale(.75).setTintFill(0x000000, 0xff0000, 0x00ff00, 0x0000ff);

    this._image4 = this.add.image(450, 150, "logo-phaser")
      .setAngle(45)
      .setScale(.75)
      .setInteractive()
      .on("pointerover", () => {
        this._image4.setTintFill(0x000000, 0xff0000, 0x00ff00, 0x0000ff);
      })
      .on("pointerout", () => { this._image4.clearTint(); })
      .on("pointerdown", () => {
        if (this._clicked) {
          this._image4.setAlpha(0.5).setFlip(true, true)
        } else {
          this._image4.setAlpha(1).setFlip(false, false)
        }
        this._clicked = !this._clicked;

      })



    this._image5 = this.add.image(450, 350, "logo-phaser")
      .setAngle(45)
      .setScale(1)
      .setInteractive()

      .on("pointerover", () => { })
      .on("pointerout", () => { })
      .on("pointerdown", () => {

        this._image5.destroy();
      })




  }


  update(time: number, delta: number): void {


    this._image5.rotation += .01;

  }

}

