import GamePlay from "./GamePlay";

export default class Hud extends Phaser.Scene {

  private _gamePlay: GamePlay;
  private _score: number = 0;
  private _scoreText: Phaser.GameObjects.Text;

  constructor() {
    super({
      key: "Hud",
    });
  }

  preload() { }

  create() {

    //recuperiamo l'istanza di gameplay e la assegnamo alla nostra variabile locale.
    this._gamePlay = <GamePlay>this.scene.get("GamePlay");

    //rimuoviamo il listener per l'aggiornamento del punteggio
    this._gamePlay.events.off("update-score", this.updateScore, this);
    //ricreiamo il listener per l'aggiornamento del punteggio
    this._gamePlay.events.on("update-score", this.updateScore, this);


    this._scoreText = this.add.text(20, 20, "0").setTint(0xffffff).setOrigin(0).setFontFamily("Roboto").setFontSize(40)
    console.log("create:HUD")

  }

  //metodo privato di Hud richiamato quando si deve aggiornare il punteggio
  private updateScore(parameters: Array<any>): void {
    // il primo valore dell’array è lo score 
    // che aggiungiamo allo score corrente
    this._score += parameters[0];
    // settiamo il valore del gameobject
    this._scoreText.setText(this._score + "");
    // salviamo il valore nel registry in modo che possa essere utilizzato
    // nella scena di GameOver se dovesse servire
    this.registry.set("score", this._score);
  }

}
