import GamePlay from "../../scenes/GamePlay";
import { enemyMovementTypes } from "../../GameData";
import IEnemy from "./iEnemy";

export default class Enemy
    extends Phaser.GameObjects.Sprite
    implements IEnemy {

    protected _health: number = 0;
    protected _startHealth: number = 0;
    protected _scene: GamePlay;
    protected _enemyTimeline: Phaser.Time.Timeline;
    protected _enemyData: enemyData;
    protected _actions: enemyActions;
    protected _body: Phaser.Physics.Arcade.Body;
    protected _config: enemyConfig;
    protected _maxHits: number = 1;
    protected _currentHits: number = 0;
    protected _score: number = 0;
    protected _hasBonus: boolean = false;
    protected _isIndistructible: boolean = false;
    protected _isDestroyed: boolean = false;

    constructor(params: enemyConfig) {

        super(params.scene, params.x, params.y, params.key);
        this._config = params;
        this._scene = <GamePlay>params.scene;
        this._enemyData = params.enemyData;
        this.scene.physics.world.enable(this);
        this._body = this.body as Phaser.Physics.Arcade.Body;
        this.scene.add.existing(this);

    }

    actions(actions: enemyActions) { }

    update(time: number, delta: number): void { }

    updateDamage(damage: number): number {

        this._health -= damage;


        if (this._health <= 0) {
            this.remove();
        } else {
            this.setTintFill(0xffffff);
            this._scene.time.addEvent({ delay: 100, callback: () => { this.clearTint(); }, callbackScope: this, loop: false });

        }
        return this._health;
    }

    getStartingHealth(): number {
        return this._startHealth;
    }

    getHealth(): number {
        return this._health;
    }

    remove(): void {

        if (this._enemyTimeline != undefined)
            this._enemyTimeline.destroy();
        this._scene.removeFromEnemyGroup(this);
    }



    isDestroyed(): boolean {
        if (this._currentHits == this._maxHits) return true;
        return false;
    };


    getScore(): number { return this._score };

    isIndistructible(): boolean {
        return this._isIndistructible;
    }

    hasBonus(): boolean { return this._hasBonus; }

    changeDirection(): void { }

    isBlocked(): Phaser.Types.Physics.Arcade.ArcadeBodyCollision {
        return this._body.blocked;
    }

    isTouching(): Phaser.Types.Physics.Arcade.ArcadeBodyCollision {
        return this._body.touching;
    }

}


