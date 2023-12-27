
export default class Intro extends Phaser.Scene {

  private _text1: Phaser.GameObjects.Text;
  private _text2: Phaser.GameObjects.Text;
  private _text3: Phaser.GameObjects.Text;
  private _timer: Phaser.Time.TimerEvent;
  private _counter: number = 0;

  constructor() {

    super({ key: "Intro" });

  }


  create() {

    this._text1 = this.add.text(512, 50, "Waiting").setTint(0x000000).setOrigin(.5);

    this._text3 = this.add.text(512, 100, "Click here to pause bomb release").setTint(0x000000).setOrigin(.5).setInteractive().on("pointerdown", () => {
      if (this._timer.paused == false) {
        this._timer.paused = true;
        this._text3.setText("Click here to resume bomb release").setTint(0xff0000);
      } else {
        this._timer.paused = false;
        this._text3.setText("Click here to pause bomb release").setTint(0x00000);

      }
    }, this);

    this._text2 = this.add.text(512, 400, "Waiting").setTint(0x000000).setOrigin(.5);;




    this._timer = this.time.addEvent({
      delay: 1000,
      loop: true,
      callback: () => {
        this.createBomb();
      },
      callbackScope: this
    })
    //this._timer.paused = true;


    this.time.addEvent({
      delay: 3000,
      callback: this.myCustomMethod,
      callbackScope: this
    });


  }


  createBomb() {
    this._counter++;
    this._text1.setText("bomb: " + this._counter);
    this.add.image(Phaser.Math.RND.integerInRange(100, 924), Phaser.Math.RND.integerInRange(100, 500), "bomb");

  }

  myCustomMethod() {
    this._text2.setText("custom method fired after 3 seconds");
  }


  update(time: number, delta: number): void {


    console.log(this.time.now)

  }


}
