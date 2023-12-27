
export default class GamePlay extends Phaser.Scene {

  private _text1: Phaser.GameObjects.Text;
  constructor() {
    super({ key: "GamePlay" });
  }

  create() {
    console.log("create:gameplay");
    this.cameras.main.setBackgroundColor(0xff0000)
    let _level: number = this.registry.get("level");

    this._text1 = this.add.text(512, 100, "The registry 'level' value is:" + _level).setTint(0x000000).setOrigin(.5)

  }

  update(time: number, delta: number): void { }
}
