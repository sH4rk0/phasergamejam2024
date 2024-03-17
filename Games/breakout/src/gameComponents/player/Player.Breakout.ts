import IPlayerBreakout from "./IPlayer.Breakout";
import Player from "./Player";
export default class PlayerBreakout extends Player implements IPlayerBreakout {

    private _ballIsOnPaddle: boolean = false;
    constructor(params: genericConfig) {

        super(params);
        this.initPlayer();
    }

    initPlayer() {

        this._body.setImmovable(true);
        this._body.setCollideWorldBounds(true);
        if (!this._config.scene.anims.exists("player-enter")) {
            this._config.scene.anims.create({
                key: "player-enter",
                frames: this._config.scene.anims.generateFrameNumbers(this._config.key, { frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] }),
                frameRate: 10,
                repeat: 0
            });
        }

        if (!this._config.scene.anims.exists("player-blink")) {
            this._config.scene.anims.create({
                key: "player-blink",
                frames: this._config.scene.anims.generateFrameNumbers(this._config.key, { frames: [15, 16, 17, 18, 19, 20, 21, 22] }),
                frameRate: 10,
                repeat: -1
            });
        }

        this.enterAnimation();

    }

    isBallOnPaddle(): boolean {
        return this._ballIsOnPaddle;
    }

    setBallOnPaddle(value: boolean): void {

    }

    enlarge(): void {
        this.setScale(1.5);
    }

    normalSize(): void {
        this.setScale(1);
    }

    update(time: number, delta: number) {

        if (!this._isTouchDevice && this._isActivated) {
            this.handleKeyboardInput();
        }

    }

    getSpeed(): number {
        return 900;
    }

    handleKeyboardInput(): void {

        //if left arrow key is pressed down set velocity with drag acceleration
        if (this._LEFT.isDown) {
            this._body.setVelocityX(-this.getSpeed());
        }

        //if right arrow key is pressed down set velocity with drag acceleration
        if (this._RIGHT.isDown) {
            this._body.setVelocityX(this.getSpeed());
        }

        //if nothing is pressed stop the player
        if (!this._LEFT.isDown && !this._RIGHT.isDown) {
            this._body.setVelocityX(0);
        }

    }
}
