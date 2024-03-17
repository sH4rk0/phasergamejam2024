import nipplejs from 'nipplejs';
import BulletBasic from "../bullets/Bullet.Basic";
import { bulletDirection, PlayerType } from "../../GameData";
import BulletLaser from "../bullets/Bullet.Laser";
import BulletMissile from "../bullets/Bullet.Missile";
import BulletOrb from "../bullets/Bullet.Orb";
import Player from "./Player";
import IPlayerPlatform from "./IPlayer.Platform";

enum fireTypes {
    frontal,
    side,
    rear,
    missile,
    laser,
}


export default class PlayerPlatform
    extends Player
    implements IPlayerPlatform {

    private _speed: number = 600;
    private _maxSpeed: number = 350;

    private _canDoubleJump: boolean = true;



    constructor(params: playerConfig) {

        super(params);

        this.initPlayer();

        this._canDoubleJump = true;




        if (!this._config.scene.anims.exists("player-idle")) {
            this._config.scene.anims.create({
                key: "player-idle",
                frames: this._config.scene.anims.generateFrameNumbers(this._config.key, { frames: [0, 1, 2, 3] }),
                frameRate: 10,
                repeat: 0
            });
        }

        if (!this._config.scene.anims.exists("player-run")) {
            this._config.scene.anims.create({
                key: "player-run",
                frames: this._config.scene.anims.generateFrameNumbers(this._config.key, { frames: [4, 5, 6, 7] }),
                frameRate: 10,
                repeat: 0
            });
        }


    }

    stopVelocity(): void {

    }

    initPlayer(): void {

        this._body
            .setMaxVelocity(this._maxSpeed, this._maxSpeed)
            .setBounce(0, 0)
            .setCollideWorldBounds(true)
            .setGravityY(1000)
            .setImmovable(true)

        this.setDepth(101)
            .setOrigin(0.5, 0.5);

        this._body.enable = false;
        this.scene.add.existing(this);

        switch (this._playerType) {

            case PlayerType.PLAYER1:
                break;
            case PlayerType.PLAYER2:
                break;
            case PlayerType.PLAYER3:
                break;

        }




    }

    enterLevel(): void {

        this.activate();
        this.playAnimation("player-idle");
        this.handleInput();
        this._body.enable = true;


    }

    activate(): void {

        this._isActivated = true;

    }

    deactivate(): void {

        this._isActivated = false;
    }

    startFire(): void { }

    stopFire(): void { }

    activateInvulnerability(): void {
        //console.log("activate invulnerability");
        this._isInvulnerable = true;
    }
    deactivateInvulnerability(): void {
        //console.log("deactivate invulnerability");
        this._isInvulnerable = false;
    }


    handleInput(): void {

        if (this._isTouchDevice) {
            this.handleMobileInput();
        }
    }

    handleMobileInput(): void {

        // create a joystick manager
        let joystickManager: nipplejs.JoystickManager = nipplejs.create({ color: 'red' });

        // listener to be triggered when the joystick starts moving
        joystickManager.on('start', () => {
            this._body.setDamping(false);
        })

        // listener to be triggered when the joystick moves
        joystickManager.on('move', (data: nipplejs.EventData, output: nipplejs.JoystickOutputData) => {

            // get the force and don't let it be greater than 1
            let force: number = Math.min(output.force, 1);
            // get the angle, in radians
            let angle: number = output.angle.radian;
            // determine the speed, according to force and player speed
            let speed: number = this.getSpeed() * force;
            // set player velocity using trigonometry
            this._body.setVelocity(speed * Math.cos(angle), speed * Math.sin(angle) * -1);

        });

        // listener to be triggered when the joystick stops moving
        joystickManager.on('end', () => {
            this._body.setDamping(true);
        });
    }

    getSpeed(): number {
        return this._speed;
    }

    handleKeyboardInput(): void {

        if (this._body.blocked.down) { this._canDoubleJump = true; }

        //if left arrow key is pressed down set velocity with drag acceleration
        if (this._LEFT.isDown) {
            this._body.setVelocityX(-this.getSpeed());
            this.setFlipX(false);
            this.playAnimation("player-run");
        }

        //if right arrow key is pressed down set velocity with drag acceleration
        if (this._RIGHT.isDown) {
            this._body.setVelocityX(this.getSpeed());
            this.setFlipX(true);
            this.playAnimation("player-run");
        }

        //if up arrow key is pressed down then jump
        if (
            (this._body.blocked.down && Phaser.Input.Keyboard.JustDown(this._UP))) {

            this._body.setVelocityY(-this.getSpeed() * 2);

        }
        // double jump
        if (!this._body.blocked.down && Phaser.Input.Keyboard.JustDown(this._UP) && this._canDoubleJump) {
            this._canDoubleJump = false;
            this._body.setVelocityY(-this.getSpeed() * 2);
        }


        //if nothing is pressed stop the player
        if (!this._LEFT.isDown && !this._RIGHT.isDown) {
            this._body.setVelocityX(0);
            this.playAnimation("player-idle");
        }






    }







    update(time: number, delta: number): void {

        if (!this._isTouchDevice && this._isActivated) {
            this.handleKeyboardInput();
        }

    }

}


