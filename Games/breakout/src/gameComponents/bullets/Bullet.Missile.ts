
import IBullet from "./iBullet";
import Bullet from "./Bullet";
import { bulletDirection } from "../../GameData";
export default class BulletMissile
    extends Bullet
    implements IBullet {

    private _turnDegreesPerFrame: number = 3;
    private _missile: Phaser.GameObjects.Image;
    private _autoDestroyDelay: number = 5000;
    private _autoDestroyTimer: Phaser.Time.TimerEvent;

    constructor(params: bulletConfig) {

        super(params);
        this.setName("missile");

        this.setImmovable(true);

        this._missile = this.scene.add.image(this.x, this.y, "missile").setDepth(100);

        this._missile.setOrigin(0.9, 0.5).setAngle(0);
        let _radius: number = 9;
        this._missile.y += _radius
        this._missile.x += _radius

        this.setCircle(_radius);

        this._autoDestroyTimer = this.scene.time.addEvent({
            delay: 5000,
            callback: this.remove,
            callbackScope: this,
            loop: false
        });
    }

    update(time: number, delta: number): void {

        if (this.getDirection() == bulletDirection.follow) this.follow()

    }

    follow(): void {

        let targetAngle: number = 0;
        let _enemies = this._scene.getEnemies();

        if (_enemies.length > 0) {

            let _enemy: any = this.scene.physics.closest(
                this,
                _enemies
            );

            targetAngle = Phaser.Math.Angle.Between(
                this.x,
                this.y,
                _enemy.x,
                _enemy.y
            );

        }

        else {

            targetAngle = Phaser.Math.Angle.Between(
                this.x,
                this.y,
                this._scene.getPlayerPosition().x,
                this._scene.getPlayerPosition().y
            );
        }

        // clamp to -PI to PI for smarter turning
        let diff = Phaser.Math.Angle.Wrap(targetAngle - this._missile.rotation);

        // set to targetAngle if less than turnDegreesPerFrame
        if (Math.abs(diff) < Phaser.Math.DegToRad(this._turnDegreesPerFrame)) {
            this._missile.rotation = targetAngle;
        } else {
            let angle = this._missile.angle;
            if (diff > 0) {
                // turn clockwise
                angle += this._turnDegreesPerFrame;
            } else {
                // turn counter-clockwise
                angle -= this._turnDegreesPerFrame;
            }

            this._missile.setAngle(angle);
        }

        // move missile in direction facing
        const vx = Math.cos(this._missile.rotation);
        const vy = Math.sin(this._missile.rotation);

        this.setVelocityX(vx * this._params.speed);
        this.setVelocityY(vy * this._params.speed);


        this._missile.x = this.x;
        this._missile.y = this.y;
    }

    remove(): void {
        if (this._autoDestroyTimer) this._autoDestroyTimer.destroy();
        this._missile.destroy();
        super.remove();
    }


}


