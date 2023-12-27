export default class Intro extends Phaser.Scene {

  private _sprite1: Phaser.GameObjects.Sprite;
  private _sprite2: Phaser.GameObjects.Sprite;
  private _sprite3: Phaser.GameObjects.Sprite;
  private _sprite4: Phaser.GameObjects.Sprite;
  private _sprite5: Phaser.GameObjects.Sprite;
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

    this._sprite1 = this.add.sprite(100, 50, "players").setInteractive().on("pointerdown", () => {

      this._sprite1.setFrame(23);

    });



    this._sprite2 = this.add.sprite(100, 200, "players").setScale(2);
    let _animation: Phaser.Types.Animations.Animation = {
      key: "player-running",
      frames: this.anims.generateFrameNumbers("players", { frames: [0, 1, 2, 3, 4, 5, 6, 7] }),
      frameRate: 10,
      yoyo: false,
      repeat: -1
    };
    this.anims.create(_animation);
    this._sprite2.play("player-running")


    this._sprite3 = this.add.sprite(100, 400, "players").setScale(2);
    let _animation2: Phaser.Types.Animations.Animation = {
      key: "player-idle",
      frames: this.anims.generateFrameNumbers("players", { frames: [8, 9, 10, 11, 12, 13] }),
      frameRate: 10,
      yoyo: false,
      repeat: -1
    };
    this.anims.create(_animation2);
    this._sprite3.play("player-idle").setInteractive().on("pointerdown", () => {

      if (this._clicked) {
        this._sprite3.play("player-idle")
      } else {
        this._sprite3.play("player-running")
      }
      this._clicked = !this._clicked;
    });

    this._sprite4 = this.add.sprite(300, 400, "asteroid-1").setScale(1);
    let _animation3: Phaser.Types.Animations.Animation = {
      key: "asteroid-rotation",
      frames: this.anims.generateFrameNumbers("asteroid-1", { frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }),
      frameRate: 10,
      yoyo: false,
      repeat: -1
    };

    this.anims.create(_animation3);
    this._sprite4.play("asteroid-rotation").setInteractive().on("pointerdown", () => {
      console.log("create explosion")
      this.createExplosion(this._sprite4.x, this._sprite4.y);
      this._sprite4.destroy();
    });

    let _animation4: Phaser.Types.Animations.Animation = {
      key: "explosion-anim",
      frames: this.anims.generateFrameNumbers("explosion", { frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27] }),
      frameRate: 10,
      yoyo: false,
      repeat: 0,

    };
    this.anims.create(_animation4);

  }

  createExplosion(x: number, y: number) {

    let _explo: Phaser.GameObjects.Sprite = this.add.sprite(x, y, "explosion");
    _explo.play("explosion-anim").on("animationcomplete", () => {
      console.log("animation complete");
      _explo.destroy();

    })

  }


  update(time: number, delta: number): void {


    this._sprite4.rotation += 0.01;

  }

}

