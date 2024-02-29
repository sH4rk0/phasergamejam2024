
import IBullet from "./iBullet";
import Bullet from "./Bullet";
import PlayerShooter from "../player/Player.Shooter";

export default class BulletOrb
    extends Bullet
    implements IBullet {


    constructor(params: bulletConfig) {

        super(params);
        this.setName("orb");

        this.setImmovable(false).setScale(1);

        this.setCircle(15, 8, 8);

    }

    update(time: number, delta: number): void { }


    updateHealth(amount: number) {

        this._health -= amount;
        if (this._health <= 0) {
            this.remove();
        }
    }

    remove(): void {
        this._scene.removeFromBulletGroup(this);
        let _player: PlayerShooter = <PlayerShooter>this._scene.getPlayer();
        _player.deactivateOrb();
    }


}


