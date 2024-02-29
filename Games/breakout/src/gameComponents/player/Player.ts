import IPlayer from "./IPlayer";
import GamePlay from "../../scenes/GamePlay";
import { PlayerType } from "../../GameData";
import BulletOrb from "../bullets/Bullet.Orb";

export default class Player extends Phaser.GameObjects.Sprite implements IPlayer {

    protected _config: genericConfig;
    protected _body: Phaser.Physics.Arcade.Body;
    protected _scene: GamePlay;
    protected _isActivated: boolean = false;
    protected _isInvulnerable: boolean = false;
    protected _isTouch: boolean = false;
    protected _playerType: PlayerType;

    constructor(params: playerConfig) {

        super(params.scene, params.x, params.y, params.key);
        this._config = params;
        this._scene = <GamePlay>params.scene;
        this._playerType = params.playerType;
        this._config.scene.add.existing(this);
        this._config.scene.physics.world.enable(this, Phaser.Physics.Arcade.DYNAMIC_BODY);
        this._body = this.body as Phaser.Physics.Arcade.Body;





    }

    initPlayer() { }



    activate(): void {

        this._isActivated = true;
    }
    deactivate(): void {
        this._isActivated = false;
    }


    enterAnimation(): void {
        this.play("player-enter");
    }

    enterLevel(): void {

    }


    playAnimation(anim: string): void {
        this.play(anim, true);
    }

    enlarge(): void {
        this.setScale(1.5);
    }

    normalSize(): void {
        this.setScale(1);
    }



    handleInput(): void {

        if (this._isTouch) {
            this.handleMobileInput();
        }
    }

    handleMobileInput(): void {

    }

    handleKeyboardInput(): void {

    }




    update(time: number, delta: number) {


    }
}
