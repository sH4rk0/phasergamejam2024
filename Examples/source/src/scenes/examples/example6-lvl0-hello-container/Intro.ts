export default class Intro extends Phaser.Scene {

  private _containerCredits: Phaser.GameObjects.Container;

  private _tile1: Phaser.GameObjects.TileSprite;
  private _logo: Phaser.GameObjects.Image;

  private _bomb1: Phaser.GameObjects.Sprite;
  private _bomb2: Phaser.GameObjects.Sprite;

  private _text1: Phaser.GameObjects.Text;
  private _text2: Phaser.GameObjects.Text;


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
    this._tile1 = this.add.tileSprite(0, 0, 1280, 800, "space").setOrigin(0);

    this._logo = this.add.image(640, 400, "logo").setScale(.8).setAlpha(.25);

    let _animation: Phaser.Types.Animations.Animation = {
      key: "bomb-rotation",
      frames: this.anims.generateFrameNumbers("bomb", { frames: [0, 1, 2, 3, 4, 5] }),
      frameRate: 10,
      yoyo: false,
      repeat: -1
    };
    this.anims.create(_animation);

    this._text1 = this.add.text(640, 300, "Play").setOrigin(.5).setFontSize(40).setFontFamily("Roboto").setInteractive().on("pointerover", () => {
      this._text1.setTint(0xff0000);
      this.setBombsPosition(this._text1.x, this._text1.y)
    }).on("pointerout", () => {
      this._text1.clearTint();
    }).on("pointerdown", () => {
      //this.scene.stop("Intro");
      alert("Vai ad una nuova scena");
    });

    this._text2 = this.add.text(640, 400, "Credits").setOrigin(.5).setFontSize(40).setFontFamily("Roboto").setInteractive()
      .on("pointerover", () => {
        this._text2.setTint(0xff0000);
        this.setBombsPosition(this._text2.x, this._text2.y)
      })
      .on("pointerout", () => {
        this._text2.clearTint();
      }).on("pointerdown", () => {
        this._text1.disableInteractive();
        this._text2.disableInteractive();
        this._containerCredits.setAlpha(1);
      });

    this._bomb1 = this.add.sprite(this._text1.x - 100, this._text1.y, "bomb");
    this._bomb1.play("bomb-rotation");
    this._bomb2 = this.add.sprite(this._text1.x + 100, this._text1.y, "bomb");
    this._bomb2.play("bomb-rotation");

    //container code
    this._containerCredits = this.add.container().setAlpha(0);
    let _layer = this.add.image(640, 400, "layer").setAlpha(.8)
    let _popup = this.add.image(640, 400, "popup");
    let _text = this.add.text(640, 250, "Credits").setOrigin(.5).setFontFamily("Roboto").setFontSize(40);
    let _chiudi = this.add.text(640, 550, "Chiudi").setOrigin(.5).setFontFamily("Roboto").setFontSize(30).setInteractive().on("pointerdown", () => {
      this._containerCredits.setAlpha(0);
      this._text1.setInteractive();
      this._text2.setInteractive();
    })
    let _text2 = this.add.text(640, 350, "Questo è un esempio di container per inserire alcune informazioni utili al gioco.\n\nE' possibile inserire del testo lungo e per evitare che esca dai bordi del popup usiamo il metodo setWordWrapWidth(700). \n\nNel container è possibile aggiungere qualunque gameObject.").setOrigin(.5).setFontFamily("Roboto").setFontSize(20).setWordWrapWidth(700);
    this._containerCredits.add([_layer, _popup, _text, _text2, _chiudi]);

  }


  setBombsPosition(x: number, y: number) {

    this._bomb1.setPosition(x - 100, y);
    this._bomb2.setPosition(x + 100, y);
  }

  update(time: number, delta: number): void {

    this._tile1.tilePositionY += 0.2; //velocità lenta

  }

}

