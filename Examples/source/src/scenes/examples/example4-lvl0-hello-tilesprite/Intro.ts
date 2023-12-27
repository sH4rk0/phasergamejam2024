export default class Intro extends Phaser.Scene {

  private _tile1: Phaser.GameObjects.TileSprite;
  private _tile2: Phaser.GameObjects.TileSprite;
  private _tile3: Phaser.GameObjects.TileSprite;
  private _tile4: Phaser.GameObjects.TileSprite;
  private _tile5: Phaser.GameObjects.TileSprite;
  private _tile6: Phaser.GameObjects.TileSprite;
  private _tile7: Phaser.GameObjects.TileSprite;

  private _text1: Phaser.GameObjects.Text;
  private _sprite1: Phaser.GameObjects.Sprite;
  private _animations: Array<{ key: string, frames: Array<number>, frameRate: number, yoyo: boolean, repeat: number }> = [
    { key: "player-running", frames: [0, 1, 2, 3, 4, 5, 6, 7], frameRate: 8, yoyo: false, repeat: -1 },
    { key: "player-idle", frames: [8, 9, 10, 11], frameRate: 8, yoyo: false, repeat: -1 }
  ];

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
    this._tile1 = this.add.tileSprite(0, 0, 1024, 450, "bg1").setOrigin(0);
    this._tile2 = this.add.tileSprite(0, 0, 1024, 450, "bg2").setOrigin(0);
    this._tile3 = this.add.tileSprite(0, 50, 1024, 450, "bg3").setOrigin(0);
    this._tile4 = this.add.tileSprite(0, 50, 1024, 450, "bg4").setOrigin(0);
    this._tile5 = this.add.tileSprite(0, 50, 1024, 450, "bg5").setOrigin(0);
    this._tile6 = this.add.tileSprite(0, 50, 1024, 450, "bg6").setOrigin(0);
    this._tile7 = this.add.tileSprite(0, 50, 1024, 450, "bg7").setOrigin(0);

    this._sprite1 = this.add.sprite(100, 420, "players");

    this._animations.forEach(element => {
      let _animation: Phaser.Types.Animations.Animation = {
        key: element.key,
        frames: this.anims.generateFrameNumbers("players", { frames: element.frames }),
        frameRate: element.frameRate,
        yoyo: element.yoyo,
        repeat: element.repeat
      };
      this.anims.create(_animation);
    });

    this._sprite1.play("player-idle");

    this.input.on("pointerdown", () => {

      if (!this._clicked) {
        this._sprite1.play("player-running");
        this._text1.setText("")
      } else {
        this._sprite1.play("player-idle");
        this._text1.setText("Click to Start!")
      }
      this._clicked = !this._clicked;

    });

    this._text1 = this.add.text(512, 300, "Click to Start!").setOrigin(.5).setFontSize(50);

  }


  update(time: number, delta: number): void {

    if (this._clicked) {
      this._tile1.tilePositionX += 0.2; //velocità lenta
      this._tile2.tilePositionX += 0.4; //velocità media 	
      this._tile3.tilePositionX += 0.6; //velocità alta
      this._tile4.tilePositionX += 0.8; //velocità alta
      this._tile5.tilePositionX += 0.8; //velocità alta
      this._tile6.tilePositionX += 0.9; //velocità alta
      this._tile7.tilePositionX += 1; //velocità alta
    }


  }

}

