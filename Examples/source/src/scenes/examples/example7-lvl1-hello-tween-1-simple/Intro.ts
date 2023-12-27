export default class Intro extends Phaser.Scene {

  private _text: Phaser.GameObjects.Text;
  private _logo: Phaser.GameObjects.Image;
  private _bomb: Phaser.GameObjects.Image;
  private _flare: Phaser.GameObjects.Image;
  private _flareTween: Phaser.Tweens.Tween;




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
    this._text = this.add.text(512, 550, "").setFontSize(30).setOrigin(.5);
    this._logo = this.add.image(512, 50, "logo").setAlpha(0).setScale(.8).setDepth(10);
    this._bomb = this.add.image(512, 350, "bomb").setAlpha(0).setScale(2).setDepth(10).setInteractive().on("pointerdown", () => {
      console.log(this._flareTween.paused)
      if (this._flareTween.paused) {
        this._flareTween.paused = false;
        this._flareTween.resume();
      } else {
        this._flareTween.paused = true;
        this._flareTween.pause();
      }



    });
    this._flare = this.add.image(100, 450, "flares").setAlpha(1).setScale(2).setDepth(10);

    this._flareTween = this.tweens.add({
      targets: this._flare,

      duration: 3000,
      x: 924,
      ease: "Sine.easeInOut",
      delay: 1000,
      yoyo: true,
      repeat: -1
    });

    this.tweens.add({
      targets: this._logo,
      alpha: 1,
      duration: 3000,
      y: 100,
      ease: "Sine.easeOut",
      delay: 1000,
      onStart: () => {
        this._text.setText("Start logo animation");

      },
      onComplete: () => {

        this.bombAnimation();

      }
    });





  }

  bombAnimation() {

    this.tweens.add({
      targets: this._bomb,
      alpha: 1,
      duration: 3000,
      scale: 4,
      ease: "Bounce.easeInOut",
      onStart: () => {
        this._text.setText("Start bomb animation").setTint(0xff0000)
      },
      onComplete: () => {

        this._text.setText("Bomb animation completed").setTint(0x00ff00);
        this.add.text(512, 570, "Click the bomb to pause animation").setFontSize(20).setOrigin(.5);

      }
    });
  }



  update(time: number, delta: number): void {



  }

}

