
import IEnemy from "./iEnemy";
import Enemy from "./Enemy";
import { brickType } from "../../GameData";

export default class EnemyBrickUnbreakable
    extends Enemy
    implements IEnemy {

    private _animFrames: Array<Array<number>> = [
        [8, 7, 6, 5, 4, 3, 2, 1, 0, 9],
        [18, 17, 16, 15, 14, 13, 12, 11, 10, 19],
    ];
    constructor(params: enemyConfig) {

        super(params);
        this.setFrame(this._config.frame);
        this._body.setBounce(1).setImmovable(true);
        this.setOrigin(0.5, 0.5);
        this.initAnim();
        this._isIndistructible = true;

    }
    initAnim() {


        let _anim: string = "";
        let _animFramesIndex: number = null;

        if (this._config.enemyData.type == brickType.silver) _anim = "brick-silver"; _animFramesIndex = 0;
        if (this._config.enemyData.type == brickType.gold) _anim = "brick-gold"; _animFramesIndex = 1;


        if (!this.scene.anims.exists(_anim)) {
            let _animConfig: Phaser.Types.Animations.Animation = {
                key: _anim,
                frames: this._config.scene.anims.generateFrameNumbers(this._config.key, { frames: this._animFrames[_animFramesIndex] }),
                frameRate: 20,
                repeat: 0
            }
            this.scene.anims.create(_animConfig);
        }

    }

    updateDamage(damage: number): number {

        this._config.scene.sound.playAudioSprite('sfx', 'fx6', { volume: this._scene.getSfxVolume() });
        if (this._config.enemyData.type == brickType.silver) { this.play("brick-silver"); }
        if (this._config.enemyData.type == brickType.gold) { this.play("brick-gold"); }
        return this._health;

    }



    update(time: number, delta: number): void {
        super.update(time, delta);
    }


}


