
export default class GamePlay extends Phaser.Scene {

  private _text1: Phaser.GameObjects.Text;
  private _level: number = 0;
  constructor() {
    super({ key: "GamePlay" });
  }

  init(data: { level: number }) {
    //recuperiamo il valore level e controlliamo che questo valore non sia null
    if (data.level != null) {
      this._level = data.level
    } else {
      //se è null settiamo il livello = 0 (primo livello)
      this._level = 0;
    }
  }


  create() {
    console.log("create:gameplay");
    this.cameras.main.setBackgroundColor(0xff0000)
    this._text1 = this.add.text(512, 100, "The registry 'level' value is:" + this._level).setTint(0x000000).setOrigin(.5)

  }

  update(time: number, delta: number): void { }
}
