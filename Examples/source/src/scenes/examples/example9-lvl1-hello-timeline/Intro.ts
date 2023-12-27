
export default class Intro extends Phaser.Scene {

  private _text1: Phaser.GameObjects.Text;
  private _text2: Phaser.GameObjects.Text;
  private _text3: Phaser.GameObjects.Text;
  private _timer: Phaser.Time.TimerEvent;
  private _counter: number = 0;
  private _myTimeline: Phaser.Time.Timeline;

  constructor() {

    super({ key: "Intro" });

  }


  create() {

    this._text1 = this.add.text(512, 50, "click to play the timeline").setTint(0x000000).setOrigin(.5);



    this._myTimeline = this.add.timeline([
      {
        at: 1000,
        tween: {
          targets: this.add.sprite(400, 700, 'bomb'),
          y: 400,
          duration: 3000,
          ease: 'Power2'
        }
      },
      {
        at: 2000,
        run: () => { this.add.sprite(400, 200, 'bomb').setScale(2) }
      },
      {
        at: 3000,
        run: () => { this.createRandomBomb(); }
      },
    ]);

    this.input.once('pointerdown', () => {

      this._myTimeline.play();

    });




  }


  createRandomBomb() {

    this.add.image(Phaser.Math.RND.integerInRange(100, 924), Phaser.Math.RND.integerInRange(100, 500), "bomb");

  }



  update(time: number, delta: number): void {



  }


}
