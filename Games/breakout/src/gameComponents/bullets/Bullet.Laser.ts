
import IBullet from "./iBullet";
import Bullet from "./Bullet";
import { bulletDirection } from "../../GameData";
export default class BulletLaser
    extends Bullet
    implements IBullet {

    constructor(params: bulletConfig) {

        super(params);
        this.setName("laser");

        this.setVelocityY(-params.speed);


    }

    update(time: number, delta: number): void {

        super.update(time, delta);
    }


}


