import GamePlay from "../../scenes/GamePlay";
import BonusShooter from "../bonus/Bonus.Shooter";
import BonusBasic from "../bonus/Bonus.Shooter";
import EnemyBasic from "../enemy/Enemy.Basic";
import EnemyRobot from "../enemy/Enemy.Robot";
import ITrigger from "./iTrigger";

export default class Trigger
    extends Phaser.GameObjects.Image
    implements ITrigger {

    private _data: triggerData;
    private _scene: GamePlay;

    constructor(params: triggerConfig) {

        super(params.scene, params.x, params.y, params.key);
        this.setOrigin(0.5, 1);
        this.scene.add.existing(this);
        this._data = params.triggerData;
        this._scene = <GamePlay>params.scene;

    }

    create() { }

    update(time: number, delta: number): void {

        if (
            this.scene.cameras.main.worldView.contains(this.x, this.y) &&
            this._data.activatedOn === "enter"
        ) {
            this.executeTrigger();
        }
    }

    executeTrigger() {

        console.log(this._data.type, this._data.data.type);


        switch (this._data.type) {

            case "enemy":

                console.log(this._data.data.type);
                switch (this._data.data.type) {
                    case "basic":
                        this._scene.addToEnemyGroup(new EnemyBasic({ scene: this._scene, x: this.x, y: this.y, key: this._data.data.texture, enemyData: this._data.data }));
                        break;

                    case "robot":
                        console.log("robot!!!")
                        this._scene.addToEnemyGroup(new EnemyRobot({ scene: this._scene, x: this.x, y: this.y, key: this._data.data.texture, enemyData: this._data.data }));
                        break;

                }
                break;



            case "bonus":


                this._scene.addToBonusGroup(
                    new BonusShooter({ scene: this._scene, x: this.x, y: this.y, key: "bonus", type: "", bonusData: this._data.data })
                );

                break;



        }

        this.destroy();

    }

}


