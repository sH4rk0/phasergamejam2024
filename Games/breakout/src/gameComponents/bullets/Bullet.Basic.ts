
import IBullet from "./iBullet";
import Bullet from "./Bullet";
import { bulletDirection } from "../../GameData";
export default class BulletBasic
    extends Bullet
    implements IBullet {

    constructor(params: bulletConfig) {

        super(params);

        this.setName("basic");
        this._body.setCircle(10, 2, 2);

        switch (this._direction) {
            case bulletDirection.up:
                this.setVelocityY(-params.speed);
                break;
            case bulletDirection.down:
                this.setVelocityY(params.speed);
                break;
            case bulletDirection.left:
                this.setVelocityX(-params.speed);
                break;
            case bulletDirection.right:
                this.setVelocityX(params.speed);
                break;
        }

    }



    update(time: number, delta: number): void {

        super.update(time, delta);

    }


}


