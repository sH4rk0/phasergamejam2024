export default class Intro extends Phaser.Scene {

  private _groupBomb: Phaser.GameObjects.Group;

  private _tile1: Phaser.GameObjects.TileSprite;


  private _text1: Phaser.GameObjects.Text;


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

    this._groupBomb = this.add.group();

    //setta il background di sfondo a bianco
    this.cameras.main.setBackgroundColor("#ffffff");
    this._tile1 = this.add.tileSprite(0, 0, 1024, 600, "space").setOrigin(0);


    let _animation: Phaser.Types.Animations.Animation = {
      key: "bomb-rotation",
      frames: this.anims.generateFrameNumbers("bomb", { frames: [0, 1, 2, 3, 4, 5] }),
      frameRate: 10,
      yoyo: false,
      repeat: -1
    };
    this.anims.create(_animation);



    for (let i = 0; i < 48; i++) {

      let _sprite = this.add.sprite(0, 0, "bomb");
      _sprite.play("bomb-rotation")
      this._groupBomb.add(_sprite);

    }

    Phaser.Actions.GridAlign(this._groupBomb.getChildren(), { width: 8, cellWidth: 58, cellHeight: 48, x: 320, y: 200 });

    let _animation4: Phaser.Types.Animations.Animation = {
      key: "explosion-anim",
      frames: this.anims.generateFrameNumbers("explosion", { frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27] }),
      frameRate: 20,
      yoyo: false,
      repeat: 0,

    };
    this.anims.create(_animation4);

    this._text1 = this.add.text(10, 10, 'bombs: ' + this._groupBomb.getLength()).setFontSize(40);
    this.input.on("pointerdown", () => {

      var invader: Phaser.GameObjects.Sprite = <Phaser.GameObjects.Sprite>Phaser.Utils.Array.RemoveRandomElement(this._groupBomb.getChildren());

      this._text1.setText('bombs: ' + this._groupBomb.getLength());

      if (invader) {
        this.createExplosion(invader.x, invader.y);
        invader.destroy();
      }


    });




  }


  createExplosion(x: number, y: number) {

    let _explo: Phaser.GameObjects.Sprite = this.add.sprite(x, y, "explosion");
    _explo.play("explosion-anim").on("animationcomplete", () => {
      console.log("animation complete");
      _explo.destroy();

    })

  }

  update(time: number, delta: number): void {



    this._tile1.tilePositionY += 0.2; //velocità lenta




  }

}

