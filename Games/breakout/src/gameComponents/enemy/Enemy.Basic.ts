
import IEnemy from "./iEnemy";
import Enemy from "./Enemy";
import { enemyMovementTypes, enemySprite } from "../../GameData";

export default class EnemyBasic
    extends Enemy
    implements IEnemy {

    private _enemyAnimations: Array<Array<number>> = [

        [0, 1, 2, 3, 4, 15, 16, 17, 18, 19, 30, 31, 32, 33, 34, 45, 46, 47, 48, 49, 60, 61, 62, 63, 64],//0 orb
        [5, 6, 7, 8, 9, 20, 21, 22, 23, 24, 35, 36, 37, 38, 39, 50, 51, 52, 53, 54, 65, 66, 67, 68, 69],//1 sphere
        [10, 11, 12, 13, 14, 25, 26, 27, 28, 29, 40, 41, 42, 43, 44, 55, 56, 57, 58, 59, 70, 71, 72, 73, 74], //2 molecula
        [75, 76, 77, 78, 79, 90, 91, 92, 93, 94, 105, 106, 107, 108, 109, 120, 121, 122, 123, 124, 135, 136, 137, 138, 139], //3 pyramid
        [80, 81, 82, 83, 84, 95, 96, 97, 98, 99, 110, 111, 112, 113, 114, 125, 126, 127, 128, 129, 140, 141, 142, 143, 144], //4 cube
        [85, 86, 87, 88, 89, 100, 101, 102, 103, 104, 115, 116, 117, 118, 119, 130, 131, 132, 133, 134, 145, 146, 147, 148, 149] //5 cone

    ]

    constructor(params: enemyConfig) {

        super(params);

        this._health = this._enemyData.health;
        this._startHealth = this._health;

        this._actions = this._enemyData.actions;


        this.setOrigin(0.5, 0.5).setDepth(100).setAlpha(0)
        this._body.setCircle(15, 7, 7);


        if (this._enemyData.hasBonus != undefined && this._enemyData.hasBonus)
            this._hasBonus = true;


        this.scene.tweens.add({
            targets: this,
            alpha: 1,
            duration: 250,
            ease: 'Linear'
        })

        this.actions(this._actions);

        let _animIndex: number = null;

        switch (this._enemyData.sprite) {
            case enemySprite.orb:
                _animIndex = 0;
                break;
            case enemySprite.sphere:
                _animIndex = 1;
                break;
            case enemySprite.molecula:
                _animIndex = 2;
                break;
            case enemySprite.pyramid:
                _animIndex = 3;
                break;
            case enemySprite.cube:
                _animIndex = 4;
                break;
            case enemySprite.cone:
                _animIndex = 5;
                break;
            default:
                break;
        }


        let _anim: string = "enemy-animation-" + _animIndex;
        this.setScale(1.5)

        if (!this.scene.anims.exists(_anim)) {
            let _animConfig: Phaser.Types.Animations.Animation = {
                key: _anim,
                frames: this.scene.anims.generateFrameNumbers(this._config.key, { frames: this._enemyAnimations[_animIndex] }),
                frameRate: 10,
                repeat: -1
            }
            this.scene.anims.create(_animConfig);
        }
        this.play(_anim);


    }

    create() { }

    actions(actions: enemyActions) {

        if (actions.movement != undefined)
            this.setUpMovement(actions.movement);

    }

    setUpMovement(movement: enemyMovement) {

        let _accY: number = 150;
        let _accX: number = 350;

        if (movement.data = undefined && movement.data.accY != undefined) _accY = movement.data.accY;
        if (movement.data = undefined && movement.data.accX != undefined) _accX = movement.data.accX;

        switch (movement.type) {
            case enemyMovementTypes.straight:
                this._body.setAccelerationY(_accY);
                break;

            case enemyMovementTypes.toLeft:
                this._body.setAccelerationY(_accY);
                this.scene.time.addEvent({ delay: 2000, callback: () => { this._body.setAccelerationX(-_accX); }, callbackScope: this, loop: false });

                break;
            case enemyMovementTypes.toRight:
                this._body.setVelocityY(_accY);
                this.scene.time.addEvent({ delay: 2000, callback: () => { this._body.setAccelerationX(_accX); }, callbackScope: this, loop: false });
                break;

            case enemyMovementTypes.sineToLeft:
                this._enemyTimeline = this.scene.add.timeline([{
                    at: 0,
                    run: () => {
                        this._body.setAccelerationY(_accY);
                        this._body.setAccelerationX(-_accX);
                    }

                }, {

                    at: 1000,
                    run: () => {

                        this._body.setAccelerationX(_accX);
                    }
                }, {

                    at: 4000,
                    run: () => {

                        this._body.setAccelerationX(-_accX);
                    }
                }]
                ).play();


                break;

            case enemyMovementTypes.sineToRight:

                this._enemyTimeline = this.scene.add.timeline([{
                    at: 0,
                    run: () => {

                        this._body.setAccelerationY(_accY);
                        this._body.setAccelerationX(_accX);
                    }

                }, {

                    at: 1000,
                    run: () => {

                        this._body.setAccelerationX(-_accX);
                    }
                }, {

                    at: 4000,
                    run: () => {

                        this._body.setAccelerationX(_accX);
                    }
                }]
                ).play();


                break;




            default:
                break;
        }
    }

    update(time: number, delta: number): void {
        if (!this.scene.cameras.main.worldView.contains(this.x, this.y)) {

            this.remove();
        }
    }


}


