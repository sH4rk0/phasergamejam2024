import GamePlay from "./GamePlay";

export default class Hud extends Phaser.Scene {

  private _score: number = 0;
  private _scoreText: Phaser.GameObjects.Text;

  private _livesArray: Array<Phaser.GameObjects.Sprite> = [];

  private _lives: number = 3;
  private _gamePlay: GamePlay;

  constructor() {
    super({
      key: "Hud",
    });
  }


  create() {

    this._score = 0;
    this._lives = 3;

    if (!this.anims.exists("paddle-explosion")) {
      let _paddleExplosionConfig: Phaser.Types.Animations.Animation = {
        key: "paddle-explosion",
        frames: this.anims.generateFrameNumbers("paddle-explosion", { frames: [1, 2, 3, 4] }),
        frameRate: 15,
      };

      this.anims.create(_paddleExplosionConfig);

    }
    for (let i = 0; i < this._lives; i++) {
      let _live = this.add.sprite(1100 + (i * 60), 40, "paddle-explosion").setScale(.5);
      _live.setOrigin(.5, .5);



      this._livesArray.push(_live);
    }

    this._gamePlay = <GamePlay>this.scene.get("GamePlay");

    //rimuoviamo il listener per l'aggiornamento del punteggio
    this._gamePlay.events.off("update-score", this.updateScore, this);
    //ricreiamo il listener per l'aggiornamento del punteggio
    this._gamePlay.events.on("update-score", this.updateScore, this);

    //rimuoviamo il listener per l'aggiornamento del punteggio
    this._gamePlay.events.off("update-lives", this.updateLives, this);
    //ricreiamo il listener per l'aggiornamento del punteggio
    this._gamePlay.events.on("update-lives", this.updateLives, this);


    this._scoreText = this.add.text(20, 20, this._score + "", { color: "#ffffff" }).setFontFamily("'Press Start 2P'").setFontSize(30);

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

  private updateLives(): void {
    this._lives--;
    //remove the first element of the array

    let _live: Phaser.GameObjects.Sprite = this._livesArray.shift();
    _live.play("paddle-explosion");
    _live.on("animationcomplete", () => {
      _live.destroy();
    });

    if (this._lives == 0) {
      this.gameOver();
    }

  }


  gameOver() {
    this.scene.stop(this);
    this.scene.stop(this._gamePlay);
    this.scene.start("GameOver");
  }





}
