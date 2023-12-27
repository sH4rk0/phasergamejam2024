import "phaser";
import Boot from "../Boot";
import Hud from "../Hud";
import Preloader from "../Preloader";
import GamePlay from "../examples/example37-lvl6-virtual-joystick/GamePlay";
import GameOver from "../GameOver";
import Intro from "../examples/example37-lvl6-virtual-joystick/Intro";
import { GameData } from "../../GameData";

window.addEventListener("load", () => {

    const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.WEBGL,
        backgroundColor: GameData.globals.bgColor,
        parent: "my-game",
        scale: {
            mode: Phaser.Scale.FIT,
            width: GameData.globals.gameWidth,
            height: GameData.globals.gameHeight,
        },

        scene: [
            Boot,
            Hud,
            Preloader,
            Intro,
            GamePlay,
            GameOver
        ],


        physics: {
            default: "arcade",
            arcade: {
                debug: GameData.globals.debug,
                gravity: { y: 600 }
            }
        },

        input: {
            activePointers: 2,
            keyboard: true,
        },
        render: {
            pixelArt: false,
            antialias: true,
        },
    };

    const game = new Phaser.Game(config);

});
