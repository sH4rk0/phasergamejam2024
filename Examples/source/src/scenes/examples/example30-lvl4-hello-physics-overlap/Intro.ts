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

    let _sprite1 = this.physics.add.sprite(200, 200, "bomb").setScale(4);
    _sprite1.body.setVelocity(-200, -200).setCollideWorldBounds(true).setBounce(1, 1).setGravityY(100).setCircle(14, 4, 4)

    let _sprite2 = this.physics.add.sprite(100, 300, "bomb").setScale(4);
    _sprite2.body.setVelocity(-200, -200).setCollideWorldBounds(true).setBounce(1, 1).setGravityY(100).setCircle(14, 4, 4)


    this.physics.add.overlap(_sprite1, _sprite2, this.onCollide, null, this);



  }

  onCollide(object1: any, object2: any) {

    const _sprite1 = <Phaser.GameObjects.Sprite>object1;
    const _sprite2 = <Phaser.GameObjects.Sprite>object2;

    _sprite1.setTint(Math.random() * 0xffffff);
    _sprite2.setTint(Math.random() * 0xffffff);
  }




  update(time: number, delta: number): void {



  }




}

