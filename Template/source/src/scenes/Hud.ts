import GamePlay from "./GamePlay";

export default class Hud extends Phaser.Scene {

  private _score: number = 0;
  private _energy: number = 100;
  private _energyText: Phaser.GameObjects.Text;
  private _scoreText: Phaser.GameObjects.Text;
  private _gamePlay: GamePlay;

  constructor() {
    super({
      key: "Hud",
    });
  }


  create() {

    this._gamePlay = <GamePlay>this.scene.get("GamePlay");

    //rimuoviamo il listener per l'aggiornamento del punteggio
    this._gamePlay.events.off("update-score", this.updateScore, this);
    //ricreiamo il listener per l'aggiornamento del punteggio
    this._gamePlay.events.on("update-score", this.updateScore, this);

    //rimuoviamo il listener per l'aggiornamento dell'energia
    this._gamePlay.events.off("update-energy", this.updateEnergy, this);
    //ricreiamo il listener per l'aggiornamento dell'energia
    this._gamePlay.events.on("update-energy", this.updateEnergy, this);


    console.log("Hud");

    this._scoreText = this.add.text(10, 10, this._score + "", { font: "26px Courier", color: "#ff0000" });
    this._energyText = this.add.text(10, 40, this._energy + "", { font: "26px Courier", color: "#00ff00" });
  }

  //metodo privato di Hud richiamato quando si deve aggiornare il punteggio
  private updateScore(parameters: Array<any>): void {
    // il primo valore dell’array è lo score 
    // che aggiungiamo allo score corrente
    this._score += parameters[0];
    // settiamo il valore del gameobject
    this._scoreText.setText(this._score + "");
    // salviamo il valore nel registry in modo che possa essere utilizzato
    // nella scena di GameOver
    this.registry.set("score", this._score);
  }

  private updateEnergy(parameters: Array<any>): void {
    // il primo valore dell’array è lo score 
    // che aggiungiamo allo score corrente
    this._energy -= parameters[0];
    // settiamo il valore del gameobject
    this._energyText.setText(this._energy + "");
    if (this._energy <= 0) {
      this.gameOver();
    }
  }

  gameOver() {
    this.scene.stop(this);
    this.scene.stop(this._gamePlay);
    this.scene.start("GameOver");
  }





}
