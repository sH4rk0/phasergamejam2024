import IEnemy from "./iEnemy";
import Enemy from "./Enemy";

export default class EnemyBrick
    extends Enemy
    implements IEnemy {

    constructor(params: enemyConfig) {

        super(params);
        this.initBrick();

    }

    initBrick() {
        this.setFrame(this._config.frame);
        this._body.setBounce(1).setImmovable(true);
        this.setOrigin(0.5, 0.5);
        //10% chance of having a bonus  
        if (Math.random() > 0.9) {
            this._hasBonus = true;
        }
    }


    updateDamage(damage: number): number {

        this._currentHits += damage;
        this._config.scene.sound.playAudioSprite('sfx', 'bounce1', { volume: this._scene.getSfxVolume() });

        if (this.isDestroyed()) {

            this._body.setEnable(false);
            this.setTintFill(0xffffff);
            this._scene.tweens.add({
                targets: this,
                scale: 1.5,
                alpha: 0,
                duration: 100,
                onComplete: () => {
                    this._scene.removeFromEnemyGroup(this);
                }
            });

        }

        return this._health;

    }

    isIndistructible(): boolean {
        return false;
    }

    getScore(): number {
        return this._score;
    }

    hasBonus(): boolean {
        return this._hasBonus;
    }


}


