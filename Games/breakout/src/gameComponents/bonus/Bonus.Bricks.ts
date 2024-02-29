import { bonusTypes } from "../../GameData";
import Bonus from "./Bonus";
import IBonus from "./IBonus";

export default class BonusBricks extends Bonus implements IBonus {



    constructor(params: bonusConfig) {

        super(params);
        this._body.setVelocityY(100);
    }



    getBonus(): void {

        if (this._isCollected) return;
        this._isCollected = true;

        super.getBonus();

    }


    update(time: number, delta: number) {


    }
}
