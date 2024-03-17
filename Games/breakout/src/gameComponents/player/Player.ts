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
    protected _isTouchDevice: boolean = false;
    protected _playerType: PlayerType;

    protected _LEFT: Phaser.Input.Keyboard.Key;
    protected _RIGHT: Phaser.Input.Keyboard.Key;
    protected _UP: Phaser.Input.Keyboard.Key;
    protected _DOWN: Phaser.Input.Keyboard.Key;
    protected _SPACE: Phaser.Input.Keyboard.Key;

    constructor(params: playerConfig) {

        super(params.scene, params.x, params.y, params.key);
        this._config = params;
        this._scene = <GamePlay>params.scene;
        this._playerType = params.playerType;
        this._config.scene.add.existing(this);
        this._config.scene.physics.world.enable(this, Phaser.Physics.Arcade.DYNAMIC_BODY);
        this._body = this.body as Phaser.Physics.Arcade.Body;
        this._isTouchDevice = this.scene.sys.game.device.input.touch;

        this._LEFT = this._scene.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.LEFT
        );
        this._RIGHT = this._scene.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.RIGHT
        );
        this._UP = this._scene.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.UP
        );
        this._DOWN = this._scene.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.DOWN
        );
        this._SPACE = this._scene.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.SPACE
        );





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

        if (this._isTouchDevice) {
            this.handleMobileInput();
        }
    }

    handleMobileInput(): void {

    }

    handleKeyboardInput(): void {

    }

    isBlocked(): Phaser.Types.Physics.Arcade.ArcadeBodyCollision {
        return this._body.blocked;
    }

    isTouching(): Phaser.Types.Physics.Arcade.ArcadeBodyCollision {
        return this._body.touching;
    }


    activateInvulnerability(): void {
        //console.log("activate invulnerability");
        this._isInvulnerable = true;
    }
    deactivateInvulnerability(): void {
        //console.log("deactivate invulnerability");
        this._isInvulnerable = false;
    }

    setInvulerability(time: number): void {

        this.activateInvulnerability();
        this._scene.time.addEvent({ delay: time, callback: () => { this.deactivateInvulnerability(); }, callbackScope: this, loop: false });
        this._scene.tweens.add({ targets: this, alpha: 0.5, duration: time / 10, yoyo: true, repeat: 10 });
    }

    isInvulnerable(): boolean {
        return this._isInvulnerable;
    }



    update(time: number, delta: number) {


    }
}
