

export default class Intro extends Phaser.Scene {




  constructor() {

    super({ key: "Intro" });

  }


  create() {


    this.add.text(512, 400, "PLAY").setOrigin(.5).setTint(0xff0000).setFontSize(40).setFontFamily("Roboto").setInteractive().on("pointerdown", () => {
      this.scene.stop("Intro");
      this.scene.start("GamePlay");
    });


  }

  update(time: number, delta: number): void {



  }


}
