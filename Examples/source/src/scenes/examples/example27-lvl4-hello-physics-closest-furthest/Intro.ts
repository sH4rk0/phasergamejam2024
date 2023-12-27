export default class Intro extends Phaser.Scene {


  private _enemyGroup: Phaser.GameObjects.Group;
  private _sprite1: Phaser.GameObjects.Sprite;
  private _sprite2: Phaser.GameObjects.Sprite;
  private _sprite3: Phaser.GameObjects.Sprite;
  private _gfx: Phaser.GameObjects.Graphics;

  constructor() {
    super({
      key: "Intro",
    });


  }

  preload() {


  }

  create() {
    this._gfx = this.add.graphics();
    this._sprite1 = this.physics.add.sprite(200, 200, "bomb"); //source sprite

    this._enemyGroup = this.add.group({ runChildUpdate: true });
    this._sprite2 = this.physics.add.sprite(100, 200, "bomb").setScale(3);
    this._sprite3 = this.physics.add.sprite(400, 500, "bomb").setScale(3);
    this._enemyGroup.add(this._sprite2);
    this._enemyGroup.add(this._sprite3);

    this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      this._sprite1.setVisible(true).setPosition(pointer.x, pointer.y);
    });




  }



  update(time: number, delta: number): void {

    let _closest = <Phaser.GameObjects.Sprite>this.physics.closest(this._sprite1, this._enemyGroup.getChildren());
    let _furthest = <Phaser.GameObjects.Sprite>this.physics.furthest(this._sprite1, this._enemyGroup.getChildren());


    this._gfx.clear()
      .lineStyle(2, 0xff3300)
      .lineBetween(_closest.x, _closest.y, this._sprite1.x, this._sprite1.y)
      .lineStyle(2, 0x0099ff)
      .lineBetween(_furthest.x, _furthest.y, this._sprite1.x, this._sprite1.y);

  }




}

