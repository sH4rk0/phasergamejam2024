
import IBullet from "./iBullet";
import { bulletDirection } from "../../GameData";
import GamePlay from "../../scenes/GamePlay";

export default class Bullet
    extends Phaser.Physics.Arcade.Sprite
    implements IBullet {

    protected _direction: bulletDirection = bulletDirection.up;
    protected _scene: GamePlay
    protected _params: bulletConfig;
    protected _health: number = 0;
    protected _config: bulletConfig;
    protected _body: Phaser.Physics.Arcade.Body;

    constructor(params: bulletConfig) {

        super(params.scene, params.x, params.y, params.key, params.frame);
        this._config = params;
        this._scene = <GamePlay>params.scene;
        this._params = params;
        if (params.health != null) this._health = params.health;
        this.scene.physics.world.enable(this, Phaser.Physics.Arcade.DYNAMIC_BODY);
        this._body = this.body as Phaser.Physics.Arcade.Body;
        this.setOrigin(0.5, 0.5).setDepth(100);
        this.setDirection(params.direction);
        this.scene.add.existing(this);

    }

    update(time: number, delta: number): void {

        if (!this.scene.cameras.main.worldView.contains(this.x, this.y)) {
            this.destroy();
        }
    }

    setDirection(direction: bulletDirection) {
        this._direction = direction;
    }

    getDirection(): bulletDirection {
        return this._direction;
    }

    remove(): void {
        this._scene.removeFromBulletGroup(this);
    }

    getDamage(): number {
        return this._params.damage;
    }


    updateHealth(amount: number) {

    }



}


