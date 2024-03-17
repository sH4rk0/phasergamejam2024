import { GameData } from "../GameData";
import { Leaderboard } from "./LeaderBoard";

export default class GameOver extends Phaser.Scene {

  private _leaderBoard: Leaderboard;

  constructor() {
    super({
      key: "GameOver",
    });
  }



  create() {
    this._leaderBoard = new Leaderboard(this);
    console.log("GameOver", this.registry.get("score"));
  }


  setUpScene() { }




}
