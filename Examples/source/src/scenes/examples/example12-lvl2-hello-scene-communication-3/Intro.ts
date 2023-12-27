
export default class Intro extends Phaser.Scene {

  private _text1: Phaser.GameObjects.Text;

  constructor() {

    super({ key: "Intro" });

  }


  create() {


    this._text1 = this.add.text(512, 100, "click here to go to game play").setTint(0x000000).setOrigin(.5).setInteractive().on("pointerdown", () => {

      //stoppo la scena corrente
      this.scene.stop("Intro");
      //faccio partire la scena gameplay
      this.scene.start("GamePlay", { level: 20 });
      //faccio partire la scena HUD
      this.scene.start("Hud");
      //porto la scena HUD in primo piano
      this.scene.bringToTop("Hud");





    }, this)

  }




  update(time: number, delta: number): void {



  }


}
