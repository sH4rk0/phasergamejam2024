export default class Intro extends Phaser.Scene {

  private _containerCredits: Phaser.GameObjects.Container;
  private _groupStars: Phaser.GameObjects.Group;

  private _tile1: Phaser.GameObjects.TileSprite;
  private _logo: Phaser.GameObjects.Image;

  private _bomb1: Phaser.GameObjects.Sprite;
  private _bomb2: Phaser.GameObjects.Sprite;

  private _text1: Phaser.GameObjects.Text;
  private _text2: Phaser.GameObjects.Text;
  private _close: Phaser.GameObjects.Text;


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
    this._tile1 = this.add.tileSprite(0, 0, 1024, 600, "nebula").setOrigin(0);

    this._logo = this.add.image(512, 50, "logo").setScale(.3).setAlpha(0).setDepth(10);

    let _animation: Phaser.Types.Animations.Animation = {
      key: "bomb-rotation",
      frames: this.anims.generateFrameNumbers("bomb", { frames: [0, 1, 2, 3, 4, 5] }),
      frameRate: 10,
      yoyo: false,
      repeat: -1
    };
    this.anims.create(_animation);

    this._text1 = this.add.text(512, 350, "Play").setDepth(10).setAlpha(0).setOrigin(.5).setFontSize(40).setFontFamily("Roboto").setInteractive().on("pointerover", () => {
      this._text1.setTint(0xff0000);
      this.setBombsPosition(this._text1.x, this._text1.y)
    }).on("pointerout", () => {
      this._text1.clearTint();
    }).on("pointerdown", () => {
      alert("Vai ad una nuova scena")
      //this.scene.stop("Intro");
      //this.scene.start("GamePlay");
    });

    this._text2 = this.add.text(512, 450, "Credits").setDepth(10).setAlpha(0).setOrigin(.5).setFontSize(40).setFontFamily("Roboto").setInteractive()
      .on("pointerover", () => {
        this._text2.setTint(0xff0000);
        this.setBombsPosition(this._text2.x, this._text2.y)
      })
      .on("pointerout", () => {
        this._text2.clearTint();
      }).on("pointerdown", () => {
        this.showCredits();

      });

    this._bomb1 = this.add.sprite(this._text1.x - 100, this._text1.y, "bomb");
    this._bomb1.play("bomb-rotation").setAlpha(0).setDepth(10);
    this._bomb2 = this.add.sprite(this._text1.x + 100, this._text1.y, "bomb");
    this._bomb2.play("bomb-rotation").setAlpha(0).setDepth(10);

    //container code
    //--------------------------------------------------------
    this._containerCredits = this.add.container(0, -50).setAlpha(0).setDepth(11);
    let _layer = this.add.image(512, 300, "layer").setAlpha(.8)
    let _popup = this.add.image(512, 300, "popup");
    let _text = this.add.text(512, 150, "Credits").setOrigin(.5).setFontFamily("Roboto").setFontSize(40);
    this._close = this.add.text(512, 450, "Chiudi").setOrigin(.5).setFontFamily("Roboto").setFontSize(30)
      .on("pointerover", () => {
        this._close.setTint(0xff0000);
      })
      .on("pointerout", () => {
        this._close.clearTint();
      })
      .on("pointerdown", () => {
        this.hideCredits();
      })
    let _text2 = this.add.text(512, 250, "Questo è un esempio di container per inserire alcune informazioni utili al gioco.\n\nE' possibile inserire del testo lungo e per evitare che esca dai bordi del popup usiamo il metodo setWordWrapWidth(700). \n\nNel container è possibile aggiungere qualunque gameObject.").setOrigin(.5).setFontFamily("Roboto").setFontSize(20).setWordWrapWidth(700);
    this._containerCredits.add([_layer, _popup, _text, _text2, this._close]);

    //codice del tween
    //---------------------------------------------------------------------------
    this.tweens.add({
      targets: this._logo, alpha: 1, y: 150, duration: 1000, ease: "Sine.easeOut", onComplete: () => {

        this.tweens.add({
          targets: this._logo, alpha: 1, y: "-=50", duration: 1500, ease: "Sine.easeInOut", yoyo: true, repeat: -1
        });

        this.tweens.add({ targets: [this._text1, this._text2], alpha: 1, duration: 1000, delay: this.tweens.stagger(300, {}) });

        this.tweens.add({ targets: [this._bomb1, this._bomb2], alpha: 1, duration: 1000, delay: 600 });

        this.tweens.add({ targets: [this._bomb1, this._bomb2], scale: 1.5, duration: 1000, yoyo: true, repeat: -1, delay: 600 });
      }
    });



    this._groupStars = this.add.group();

    for (let i = 0; i < 16; i++) {

      let _flare = this.add.sprite(0, 0, "flares").setBlendMode("ADD");
      _flare.setAlpha(0)
      this._groupStars.add(_flare)

    }
    let circle = new Phaser.Geom.Circle(512, 400, 100);

    Phaser.Actions.PlaceOnCircle(this._groupStars.getChildren(), circle);


    this.tweens.add({
      targets: this._tile1,
      tilePositionX: "+=100",
      ease: 'Sine.easeInOut',
      duration: 5000,
      yoyo: true,
      repeat: -1
    });

    this.tweens.add({
      targets: circle,
      radius: 200,
      ease: 'Sine.easeInOut',
      duration: 1500,
      yoyo: true,
      repeat: -1,
      delay: 2000,
      onStart: () => {
        this.tweens.add({
          targets: this._groupStars.getChildren(), alpha: .5,
          duration: 1000
        });
      },
      onUpdate: () => {
        Phaser.Actions.RotateAroundDistance(this._groupStars.getChildren(), { x: 512, y: 400 }, 0.02, circle.radius);
      }
    });





  }

  showCredits() {
    this._text1.disableInteractive();
    this._text2.disableInteractive();
    this.tweens.add({
      targets: this._containerCredits, y: 0, alpha: 1, duration: 300, ease: "Sine.easeOut", onComplete: () => {
        this._close.setInteractive();
      }
    })

  }
  hideCredits() {
    this.tweens.add({
      targets: this._containerCredits, y: -50, alpha: 0, ease: "Sine.easeOut", duration: 300, onComplete: () => {
        this._text1.setInteractive();
        this._text2.setInteractive();
      }
    })
  }


  setBombsPosition(x: number, y: number) {

    this._bomb1.setPosition(x - 100, y);
    this._bomb2.setPosition(x + 100, y);
  }

  update(time: number, delta: number): void {

    this._tile1.tilePositionY += 0.4; //velocità lenta

  }

}

