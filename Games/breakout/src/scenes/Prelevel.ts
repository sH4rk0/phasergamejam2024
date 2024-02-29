import { GameData, gameType } from "../GameData";
import GamePlay from "./GamePlay";
import GamePlayBreakout from "./GamePlayBreakout";
import GamePlayPlatform from "./GamePlayPlatform";
import GamePlayShooter from "./GamePlayShooter";


export default class Prelevel extends Phaser.Scene {

  private _level: number = 0;
  private _levelData: levelConfig;

  constructor() {
    super({
      key: "Prelevel",
    });

  }

  init(data: { level: number }): void {
    // recupero il livello da caricare
    if (data == null || data.level == null) {
      this._level = 0;
    } else {
      this._level = data.level;
    }
    //inserisco i dati del livello in una variabile
    this._levelData = GameData.levels[this._level];
  }

  create() {

    // fermo questa scena
    this.scene.stop(this)
    // se esiste la scena di gioco la rimuovo perchè ne devo creare una nuova
    if (this.scene.getIndex("GamePlay")) this.scene.remove("GamePlay");

    let _gameplay: GamePlay;

    // in base al tipo di gioco creo la scena di gioco
    // nell'enum gameType sono presenti i tipi di gioco

    switch (this._levelData.gameType) {

      case gameType.breakout:
        _gameplay = <GamePlay>new GamePlayBreakout();
        break;

      case gameType.shooter:
        _gameplay = <GamePlay>new GamePlayShooter();
        break;

      case gameType.platform:
        _gameplay = <GamePlay>new GamePlayPlatform();
        break;

    }

    // aggiungo la scena di gioco
    this.scene.add("GamePlay", _gameplay, false);
    // avvio la scena di gioco
    this.scene.start("GamePlay", { level: this._level });

    if (this._level === 0) {
      this.scene.start("Hud");
    }
    this.scene.bringToTop("Hud");

  }

}
