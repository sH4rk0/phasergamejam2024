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
    this.physics.accelerateTo(_sprite1, 200, 300, 100)

    let _sprite2 = this.physics.add.sprite(512, 200, "bomb").setScale(3);
    let _sprite3 = this.physics.add.sprite(900, 500, "bomb").setScale(3);
    this.physics.accelerateToObject(_sprite2, _sprite3, 100)



  }



  update(time: number, delta: number): void {



  }




}

