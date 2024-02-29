import nipplejs from 'nipplejs';
import BulletBasic from "../bullets/Bullet.Basic";
import { bulletDirection, PlayerType } from "../../GameData";
import BulletLaser from "../bullets/Bullet.Laser";
import BulletMissile from "../bullets/Bullet.Missile";
import BulletOrb from "../bullets/Bullet.Orb";
import Player from "./Player";
import IPlayerShooter from "./IPlayer.Shooter";

enum fireTypes {
    frontal,
    side,
    rear,
    missile,
    laser,
}


export default class PlayerShooter
    extends Player
    implements IPlayerShooter {

    private _speed: number = 350;
    private _maxSpeed: number = 350;
    private _bonusSpeed: number = 5;
    private _maxBonusSpeed: number = 5;
    private _bulletSpeed: number = 500;
    private _missileSpeed: number = 350;
    private _laserSpeed: number = 700;
    private _fireRate: number = 200;
    private _bonusFireRate: number = 1;
    private _maxBonusFireRate: number = 5;


    private _fireBulletTimer: Phaser.Time.TimerEvent;
    private _fireMissileTimer: Phaser.Time.TimerEvent;
    private _fireLaserTimer: Phaser.Time.TimerEvent;
    private _bonusDamage: number = 1
    private _maxBonusDamage: number = 5;
    private _fireLaserMaxDamage: number = .2;
    private _fireBulletMaxDamage: number = 4;
    private _fireMissileMaxDamage: number = 10;
    private _fireLaserDuration: number = 5000;
    private _fireMissileDuration: number = 5000;
    private _shieldDuration: number = 5000;
    private _invulnerabilityDuration: number = 5000;

    private _fireObject: fireObjects = {
        frontal: { active: true },
        side: { active: false },
        rear: { active: false },
        missile: { active: false },
        laser: { active: false },
    }

    private _orbCircle: Phaser.Geom.Circle;
    private _orb: BulletOrb;
    private _orbIsActivated: boolean = false;

    constructor(params: playerConfig) {

        super(params);

        this.initPlayer();





    }

    stopVelocity(): void {

    }

    initPlayer(): void {

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

        this._body.setCollideWorldBounds(true, 0.1, 0.1);
        this._body.setMaxVelocity(this._maxSpeed, this._maxSpeed);
        this._body.setBounce(0, 0);
        this.setDepth(101);
        this._body.setDamping(true);
        this._body.setDrag(.01, .01);
        this.setOrigin(0.5, 0.5);
        this.setAlpha(0);
        this._body.setImmovable(true)
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

        this._isTouch = this.scene.sys.game.device.input.touch;

        this.createOrbOrbit();
    }

    enterLevel(): void {
        this.enterAnimation();
        this.scene.tweens.add({
            targets: this,
            y: this.y - 200,
            delay: 0,
            duration: 1500,
            ease: 'Power2',
            yoyo: false,
            alpha: 1,
            repeat: 0,
            onComplete: () => {
                this.activate();
                this.playAnimation("player-blink");
                this.handleInput();
                this._body.enable = true;
            }
        });
    }


    activate(): void {

        this._isActivated = true;
        this.startFire();
    }

    deactivate(): void {

        this._isActivated = false;
    }

    startFire(): void {

        this._fireBulletTimer = this.scene.time.addEvent({
            delay: this.getFireRate(),
            callback: this.fireBullet,
            callbackScope: this,
            loop: true
        });

        //this.activateMissile();
        //this.activateLaser();

    }

    stopFire(): void {

        if (this._fireBulletTimer != null)
            this._fireBulletTimer.remove(false);

    }

    fireBullet(): void {

        this._scene.sound.playAudioSprite('sfx', 'fx13', { volume: this._scene.getSfxVolume() });

        if (this._fireObject.frontal.active) {
            this._scene.addToBulletGroup(new BulletBasic({ scene: this.scene, x: this.x, y: this.y, key: 'balls', frame: 0, direction: bulletDirection.up, speed: this._bulletSpeed, damage: this.getBulletDamage() }));
        }

        if (this._fireObject.side.active) {
            this._scene.addToBulletGroup(new BulletBasic({ scene: this.scene, x: this.x, y: this.y, key: 'balls', frame: 0, direction: bulletDirection.left, speed: this._bulletSpeed, damage: this.getBulletDamage() }));
            this._scene.addToBulletGroup(new BulletBasic({ scene: this.scene, x: this.x, y: this.y, key: 'balls', frame: 0, direction: bulletDirection.right, speed: this._bulletSpeed, damage: this.getBulletDamage() }));
        }

        if (this._fireObject.rear.active) {
            this._scene.addToBulletGroup(new BulletBasic({ scene: this.scene, x: this.x, y: this.y, key: 'balls', frame: 0, direction: bulletDirection.down, speed: this._bulletSpeed, damage: this.getBulletDamage() }));
        }

    }

    fireMissile(): void {

        this._scene.addToBulletGroup(new BulletMissile({ scene: this.scene, x: this.x, y: this.y, key: 'balls', direction: bulletDirection.follow, frame: 0, speed: this._missileSpeed, damage: this.getMissileDamage() }));

    }

    fireLaser(): void {
        this._scene.addToBulletGroup(new BulletLaser({ scene: this.scene, x: this.x - 20, y: this.y, key: 'balls', frame: 0, speed: this._laserSpeed, damage: this.getLaserDamage(), direction: bulletDirection.up }));

        this._scene.addToBulletGroup(new BulletLaser({ scene: this.scene, x: this.x + 20, y: this.y, key: 'balls', frame: 0, speed: this._laserSpeed, damage: this.getLaserDamage(), direction: bulletDirection.up }));
    }

    getBulletDamage(): number {
        return this._fireBulletMaxDamage * (this._bonusDamage / this._maxBonusDamage);
    }

    getMissileDamage(): number {
        return this._fireMissileMaxDamage * (this._bonusDamage / this._maxBonusDamage);
    }

    getLaserDamage(): number {
        return this._fireLaserMaxDamage * (this._bonusDamage / this._maxBonusDamage);
    }

    getSpeed(): number {
        return this._speed * (this._bonusSpeed / this._maxBonusSpeed);
    }

    getFireRate(): number {
        // console.log(this._fireRate / (this._bonusFireRate / this._maxBonusFireRate))
        return this._fireRate / (this._bonusFireRate / this._maxBonusFireRate);
    }

    increaseDamage(amount: number): void {
        // console.log("increase damage", this._bonusDamage);
        this._bonusDamage += amount;
        if (this._bonusDamage > this._maxBonusDamage) this._bonusDamage = this._maxBonusDamage;
    }

    increaseSpeed(amount: number): void {
        //console.log("increase speed", this._bonusSpeed);
        this._bonusSpeed += amount;
        if (this._bonusSpeed > this._maxBonusSpeed) this._bonusSpeed = this._maxBonusSpeed;
    }

    increaseFireRate(amount: number): void {
        //console.log("increase fire rate", this._bonusFireRate);
        this._bonusFireRate += amount;
        this.stopFire();
        this.startFire();

        if (this._bonusFireRate > this._maxBonusFireRate) this._bonusFireRate = this._maxBonusFireRate;

    }

    activateInvulnerability(): void {
        //console.log("activate invulnerability");
        this._isInvulnerable = true;
    }
    deactivateInvulnerability(): void {
        //console.log("deactivate invulnerability");
        this._isInvulnerable = false;
    }

    activateLaser(): void {
        console.log("activate laser");
        this._fireObject.laser.active = true;

        this._fireLaserTimer = this.scene.time.addEvent({
            delay: this.getFireRate(),
            callback: this.fireLaser,
            callbackScope: this,
            loop: true
        });

    }
    deactivateLaser(): void {
        //console.log("deactivate laser");
        this._fireObject.laser.active = false;
        this._fireLaserTimer.remove(false);
    }

    activateMissile(): void {
        //console.log("activate missile");
        this._fireObject.missile.active = true;

        this._fireMissileTimer = this.scene.time.addEvent({
            delay: 2000,
            callback: this.fireMissile,
            callbackScope: this,
            loop: true
        });
    }

    deactivateMissile(): void {
        //console.log("deactivate missile");
        this._fireObject.missile.active = false;
        this._fireMissileTimer.remove(false);
    }

    activateShield(): void {
        console.log("activate shield");
    }

    deactivateShield(): void {
        console.log("deactivate shield");

    }

    activateSideFire(): void {
        console.log("activate side fire");
        this._fireObject.side.active = true;
    }
    deactivateSideFire(): void {
        console.log("deactivate side fire");
        this._fireObject.side.active = false;
    }

    activateRearFire(): void {
        console.log("activate rear fire");
        this._fireObject.rear.active = true;
    }

    deactivateRearFire(): void {
        console.log("deactivate rear fire");
        this._fireObject.rear.active = false;
    }

    activateOrb(): void {
        this._orbIsActivated = true;
        this._orb = new BulletOrb({
            scene: this.scene,
            x: this.x,
            y: this.y,
            key: "enemies",
            frame: 0, direction: bulletDirection.circular, health: 5, damage: 10
        })

        this._scene.addToBulletGroup(this._orb);
        Phaser.Actions.PlaceOnCircle([this._orb], this._orbCircle);


    }

    deactivateOrb(): void {
        this._orbIsActivated = false;
    }

    handleInput(): void {

        if (this._isTouch) {
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

    handleKeyboardInput(): void {

        //if left arrow key is pressed down set velocity with drag acceleration
        if (this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT).isDown) {
            this._body.setVelocityX(-this.getSpeed());
        }

        //if right arrow key is pressed down set velocity with drag acceleration
        if (this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT).isDown) {
            this._body.setVelocityX(this.getSpeed());
        }

        //if up arrow key is pressed down set velocity with drag acceleration
        if (this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP).isDown) {
            this._body.setVelocityY(-this.getSpeed());
        }

        //if down arrow key is pressed down set velocity with drag acceleration
        if (this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN).isDown) {
            this._body.setVelocityY(this.getSpeed());
        }


    }



    createOrbOrbit() {

        this._orbCircle = new Phaser.Geom.Circle(this.x, this.y, 250);

    }




    update(time: number, delta: number): void {

        if (!this._isTouch && this._isActivated) {
            this.handleKeyboardInput();
        }

        if (this._orbIsActivated) {
            Phaser.Actions.RotateAroundDistance(
                [this._orb],
                { x: this.x, y: this.y },
                0.08, 100
            );
        }




    }

}


