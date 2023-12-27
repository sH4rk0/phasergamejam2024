export default class Intro extends Phaser.Scene {

  private _sprite1: Phaser.GameObjects.Sprite;
  private _gfx: Phaser.GameObjects.Graphics;
  private _line: Phaser.Geom.Line;
  private _angle: number = 0;

  constructor() {
    super({
      key: "Intro",
    });


  }

  preload() {


  }

  create() {
    var cannonHead = this.add.image(130, 416, 'cannon_head').setDepth(1);
    var cannon = this.add.image(130, 464, 'cannon_body').setDepth(1);

    this._sprite1 = this.add.sprite(cannon.x, cannon.y - 50, 'bomb');
    this.physics.world.enableBody(this._sprite1);
    let _body: Phaser.Physics.Arcade.Body = <Phaser.Physics.Arcade.Body>this._sprite1.body;
    _body.setGravityY(300);

    this._gfx = this.add.graphics().setDefaultStyles({ lineStyle: { width: 10, color: 0xffdd00, alpha: 0.5 } });
    this._line = new Phaser.Geom.Line();
    this._angle = 0;

    _body.enable = false;


    this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      this._angle = Phaser.Math.Angle.BetweenPoints(cannon, pointer);
      cannonHead.rotation = this._angle;
      Phaser.Geom.Line.SetToAngle(this._line, cannon.x, cannon.y - 50, this._angle, 128);
      this._gfx.clear().strokeLineShape(this._line);
    }, this);

    this.input.on('pointerup', () => {
      //_body.enable = false;
      _body.enable = true;
      this._sprite1.setPosition(cannon.x, cannon.y - 50)


      this.physics.velocityFromRotation(this._angle, 300, _body.velocity);
    }, this);


  }



  update(time: number, delta: number): void {



  }




}

