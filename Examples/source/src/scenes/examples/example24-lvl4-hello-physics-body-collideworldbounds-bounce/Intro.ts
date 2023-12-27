export default class Intro extends Phaser.Scene {


  constructor() {
    super({
      key: "Intro",
    });


  }

  preload() {


  }

  create() {

    this.cameras.main.setBackgroundColor("#000000");

    let _sprite1 = this.physics.add.sprite(512, 200, "bomb").setScale(3);
    _sprite1.body.setVelocity(-100, -100).setCollideWorldBounds(true).setBounce(1, 1);

    let _sprite = this.add.sprite(512, 300, "bomb").setScale(3);
    this.physics.world.enableBody(_sprite);
    let _body: Phaser.Physics.Arcade.Body = <Phaser.Physics.Arcade.Body>_sprite.body;
    _body.setVelocity(100, 100).setCollideWorldBounds(true, 1, 1, true)

    this.physics.world.on('worldbounds', (body: Phaser.Physics.Arcade.Body) => {
      let _gameObject: Phaser.GameObjects.Sprite = <Phaser.GameObjects.Sprite>body.gameObject;

      _gameObject.setAlpha(Phaser.Math.RND.realInRange(0, 1));
    });



  }



  update(time: number, delta: number): void {



  }




}

