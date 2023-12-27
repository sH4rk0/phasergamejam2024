
export default class Intro extends Phaser.Scene {

  private _text: Phaser.GameObjects.Text;
  private _bomb: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  private _ground: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  private _groupBomb: Phaser.GameObjects.Group;

  constructor() {


    super({
      key: "Intro",
    });


  }


  create() {

    this._text = this.add.text(512, 50, "y:0").setTint(0x000000);
    this._bomb = this.physics.add.image(200, 400, "bomb").setScale(3);
    this._ground = this.physics.add.image(512, 600, "logo").setImmovable(true).setScale(.25);
    // creato gruppo
    this._groupBomb = this.add.group();
    this._ground.body.allowGravity = false;

    this.input.on("pointerdown", () => {

      if (this._bomb.body.touching.down) {

        this._bomb.body.setVelocityY(-300);
      }

    });

    //collider bomba su pavimento
    this.physics.add.collider(this._bomb, this._ground);
    //collider bomba con gruppo di bombe
    this.physics.add.collider(this._bomb, this._groupBomb, (obj1: any, obj2: any) => {
      this.scene.restart();
    }, undefined, this);


    this.time.addEvent({
      delay: 3000, loop: true, callback: () => {
        this.createBomb();
      }, callbackScope: this
    });


  }


  createBomb() {

    let _bomb = this.physics.add.image(900, 430, "bomb").setScale(2);
    _bomb.body.allowGravity = false;
    _bomb.body.setVelocityX(-200);

    this._groupBomb.add(_bomb);


  }


  update(time: number, delta: number): void {

    this._text.setText(this._bomb.x + "");

  }


}
