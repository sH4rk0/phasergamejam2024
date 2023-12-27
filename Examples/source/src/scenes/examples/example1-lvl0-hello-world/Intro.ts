export default class Intro extends Phaser.Scene {

  private _text1: Phaser.GameObjects.Text;
  private _text2: Phaser.GameObjects.Text;
  private _text3: Phaser.GameObjects.Text;
  private _text4: Phaser.GameObjects.Text;
  private _text5: Phaser.GameObjects.Text;
  private _text6: Phaser.GameObjects.Text;
  private _counter: number = 0;

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



    this._text1 = this.add.text(20, 50, "Shadow Stroke", { fontFamily: "Arial Black", fontSize: "44px", color: "#c51b7d" });
    this._text1.setStroke('#de77ae', 8);
    this._text1.setShadow(2, 2, '#333333', 2, true, false);

    this._text2 = this.add.text(20, 180, "Shadow Fill", { fontFamily: "Arial Black", fontSize: "44px", color: "#c51b7d" });
    this._text2.setStroke('#de77ae', 8);
    this._text2.setShadow(2, 2, "#333333", 2, false, true);

    this._text3 = this.add.text(20, 310, "Shadow Both", { fontFamily: "Arial Black", fontSize: "44px", color: "#c51b7d" });
    this._text3.setStroke('#de77ae', 8);
    this._text3.setShadow(2, 2, "#333333", 2, true, true);

    this._text4 = this.add.text(20, 440, "Shadow None", { fontFamily: "Arial Black", fontSize: "44px", color: "#c51b7d" });
    this._text4.setStroke('#de77ae', 8);
    this._text4.setShadow(2, 2, "#333333", 2, false, false);

    this._text5 = this.add.text(700, 80, "Interactive", { fontFamily: "Arial Black", fontSize: "44px", color: "#c51b7d" })
      .setInteractive()
      .setStroke('#de77ae', 8)
      .setOrigin(.5)
      .on("pointerover", () => {
        this._text5.setFill("#ffffff").setShadow(2, 2, '#333333', 2, true, false).setAngle(5);
      })
      .on("pointerout", () => {
        this._text5.setFill("#c51b7d").setShadow(0, 0, '#333333', 0, true, false).setAngle(0);
      })
      .on("pointerdown", () => {
        this._counter++;
        this._text5.setText("Clicked:" + this._counter);
      })


    this._text6 = this.add.text(700, 300, "Rotating", { fontFamily: "Arial Black", fontSize: "44px", color: "#c51b7d" });
    this._text6.setStroke('#de77ae', 8).setShadow(2, 2, '#333333', 2, true, false).setOrigin(.5)



  }


  update(time: number, delta: number): void {


    this._text6.rotation += .01;

  }

}

