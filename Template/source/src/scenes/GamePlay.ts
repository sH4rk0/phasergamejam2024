import { GameData } from "../GameData";

export default class GamePlay extends Phaser.Scene {

  private _difficulty: number;
  private _image1: Phaser.GameObjects.Image;
  private _tile1: Phaser.GameObjects.TileSprite;
  private _tile2: Phaser.GameObjects.TileSprite;
  private _tile3: Phaser.GameObjects.TileSprite;
  private _tile4: Phaser.GameObjects.TileSprite;
  private _tile5: Phaser.GameObjects.TileSprite;
  private _tile6: Phaser.GameObjects.TileSprite;
  private _tile7: Phaser.GameObjects.TileSprite;
  private _myGroup: Phaser.GameObjects.Group;
  private _controls: Phaser.Cameras.Controls.SmoothedKeyControl;
  private _win: boolean = false;


  constructor() {
    super({
      key: "GamePlay",
    });
  }


  init(data: { difficulty: number }) {

    if (data != undefined && data.difficulty != undefined) {
      this._difficulty = data.difficulty;
    } else {
      this._difficulty = 0;
    }


  }


  create() {

    this._win = false

    this._myGroup = this.add.group({ runChildUpdate: true, maxSize: 100 });


    let _point: { x: number, y: number };
    for (let i = 0; i < 10; i++) {
      _point = { x: Phaser.Math.RND.integerInRange(0, 1280), y: Phaser.Math.RND.integerInRange(0, 800) };

      let _image = this.add.image(_point.x, _point.y, "phaser").setOrigin(0.5, 0.5).setScale(0.5).setDepth(1);
      this._myGroup.add(_image);
    }




    this._tile1 = this.add.tileSprite(0, 0, 1280, 600, "bg-1").setOrigin(0, 0).setScrollFactor(0);
    this._tile2 = this.add.tileSprite(0, 0, 1280, 600, "bg-2").setOrigin(0, 0).setScrollFactor(0);
    this._tile3 = this.add.tileSprite(0, 600, 1280, 450, "bg-3").setOrigin(0, 1).setScrollFactor(0);
    this._tile4 = this.add.tileSprite(0, 650, 1280, 450, "bg-4").setOrigin(0, 1).setScrollFactor(0);
    this._tile5 = this.add.tileSprite(0, 700, 1280, 450, "bg-5").setOrigin(0, 1).setScrollFactor(0);
    this._tile6 = this.add.tileSprite(0, 750, 1280, 450, "bg-6").setOrigin(0, 1).setScrollFactor(0);
    this._tile7 = this.add.tileSprite(0, 800, 1280, 450, "bg-7").setOrigin(0, 1).setScrollFactor(0);


    /*  console.log("GamePlay");
      this.startGame(this._difficulty);
  
      this._image1 = this.add.image(this.game.canvas.width / 2, this.game.canvas.height / 2, "phaser");
      this._image1
        .setInteractive()
        .on("pointerdown", () => {
          this.updateScore(100);
          this.updateEnergy(10);
        });
  
        */

    let cursors = this.input.keyboard.createCursorKeys();

    let controlConfig: Phaser.Types.Cameras.Controls.SmoothedKeyControlConfig = {
      camera: this.cameras.main,
      left: cursors.left,
      right: cursors.right,
      up: cursors.up,
      down: cursors.down,
      acceleration: 0.06,
      drag: 0.0005,
      maxSpeed: 1.0
    };

    this._controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);

    this.input.on("pointerdown", () => {

      if (this._win) return;
      let _enemy: Phaser.GameObjects.Image = <Phaser.GameObjects.Image>Phaser.Utils.Array.GetRandom(this._myGroup.getChildren());
      _enemy.setTintFill(0xff0000);

      this._myGroup.remove(_enemy, true, true);

    });
  }

  update(time: number, delta: number): void {




    this._controls.update(delta);

    this._tile2.tilePositionX += 0.3; //velocità lenta

    this._tile3.tilePositionX = this.cameras.main.scrollX * .01;
    this._tile4.tilePositionX = this.cameras.main.scrollX * .03;
    this._tile5.tilePositionX = this.cameras.main.scrollX * .05;
    this._tile6.tilePositionX = this.cameras.main.scrollX * .08;
    this._tile7.tilePositionX = this.cameras.main.scrollX * .1;

    if (!this._win) this.checkEnemyNumber();

  }

  checkEnemyNumber() {
    if (this._myGroup.getLength() == 0) {
      this._win = true;
      console.log("hai vinto");
    }
  }

  updateScore(amount: number) {
    console.log("updateScore");
    this.events.emit("update-score", [amount]);
  }

  updateEnergy(amount: number) {
    console.log("updateEnergy");
    this.events.emit("update-energy", [amount]);
  }

  startGame(difficulty: number) {

    console.log("startGame", difficulty);

    switch (difficulty) {
      case 0:
        console.log("Easy");
        break;
      case 1:
        console.log("Medium");
        break;
      case 2:
        console.log("Hard");
        break;
    }

  }




}
