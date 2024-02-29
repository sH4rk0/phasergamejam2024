
import GamePlay from "../../scenes/GamePlay";
import IBonus from "./IBonus";
import { bonusTypes } from "../../GameData";


export default class Bonus
    extends Phaser.GameObjects.Sprite
    implements IBonus {

    protected _bonusData: bonusData;
    protected _scene: GamePlay;
    protected _type: bonusTypes;
    protected _config: bonusConfig;
    protected _body: Phaser.Physics.Arcade.Body;
    protected _isCollected: boolean = false;
    protected _bonusAnimations: Array<Array<number>> = [

        [0, 1, 2, 3, 4, 5, 6, 7], //0 L
        [8, 9, 10, 11, 12, 13, 14, 15], //1 E
        [16, 17, 18, 19, 20, 21, 22, 23], //2 C
        [24, 25, 26, 27, 28, 29, 30, 31], //3 S
        [32, 33, 34, 35, 36, 37, 38, 39], //4 R
        [40, 41, 42, 43, 44, 45, 46, 47], //5 M
        [48, 49, 50, 51, 52, 53, 54, 55], //6 D
        [56, 57, 58, 59, 60, 61, 62, 63], //7 B
        [64, 65, 66, 67, 68, 69, 70, 71], //8 T green
        [72, 73, 74, 75, 76, 77, 78, 79], //9 P
        [80, 81, 82, 83, 84, 85, 86, 87], //10 W
        [88, 89, 90, 91, 92, 93, 94, 95], //11 B
        [96, 97, 98, 99, 100, 101, 102, 103], //12 V
        [104, 105, 106, 107, 108, 109, 110, 111], //13 T blue
        [112, 113, 114, 115, 116, 117, 118, 119], //14 I
        [120, 121, 122, 123, 124, 125, 126, 127], //15 N
        [128, 129, 130, 131, 132, 133, 134, 135], //16 G
        [136, 137, 138, 139, 140, 141, 142, 143], //17 F
        [144, 145, 146, 147, 148, 149, 150, 151], //18 R
    ];

    constructor(params: bonusConfig) {

        super(params.scene, params.x, params.y, params.key);
        this._config = params;
        this._bonusData = params.bonusData;
        this._scene = this._config.scene as GamePlay;
        this._scene.add.existing(this);
        this._scene.physics.world.enable(this);
        this._body = this.body as Phaser.Physics.Arcade.Body;
        this._type = bonusTypes.none;


        let _animFrames: Array<number> = [];

        switch (this._config.bonusData.type) {
            case bonusTypes.ball:
                _animFrames = this._bonusAnimations[11];
                this._type = bonusTypes.ball;
                break;
            case bonusTypes.laser:
                _animFrames = this._bonusAnimations[0];
                this._type = bonusTypes.laser;
                break;
            case bonusTypes.score:
                _animFrames = this._bonusAnimations[3];
                this._type = bonusTypes.score;
                break;
            case bonusTypes.enlarge:
                _animFrames = this._bonusAnimations[1];
                this._type = bonusTypes.enlarge;
                break;
            case bonusTypes.damage:
                _animFrames = this._bonusAnimations[6];
                this._type = bonusTypes.damage;
                break;
            case bonusTypes.fireRate:
                _animFrames = this._bonusAnimations[17];
                this._type = bonusTypes.fireRate;
                break;
            case bonusTypes.speed:
                _animFrames = this._bonusAnimations[3];
                this._type = bonusTypes.speed;
                break;
            case bonusTypes.shield:
                _animFrames = this._bonusAnimations[14];
                this._type = bonusTypes.shield;
                break;
            case bonusTypes.invulnerability:
                _animFrames = this._bonusAnimations[14];
                this._type = bonusTypes.invulnerability;
                break;
            case bonusTypes.missile:
                _animFrames = this._bonusAnimations[5];
                this._type = bonusTypes.missile;
                break;
            case bonusTypes.side:
                _animFrames = this._bonusAnimations[10];
                this._type = bonusTypes.side;
                break;
            case bonusTypes.rear:
                _animFrames = this._bonusAnimations[18];
                this._type = bonusTypes.rear;
                break;
            case bonusTypes.orb:
                _animFrames = this._bonusAnimations[9];
                this._type = bonusTypes.orb;
                break;

        }

        if (!this._scene.anims.exists("bonus-" + this._type)) {

            let _animConfig: Phaser.Types.Animations.Animation = {
                key: "bonus-" + this._type,
                frames: this._config.scene.anims.generateFrameNumbers(this._config.key, { frames: _animFrames }),
                frameRate: 10,
                randomFrame: true,
                repeat: -1
            }

            this.scene.anims.create(_animConfig);

        }

        if (this._type != bonusTypes.none) {
            this.play("bonus-" + this._type, true);
        }

    }

    update(time: number, delta: number): void { }


    getBonus(): void {

        this.setTintFill(0xffffff);
        this._scene.tweens.add({
            targets: this,
            alpha: 0,
            duration: 250,
            onComplete: () => {
                this.remove()
            }
        })
    }

    getType(): bonusTypes {
        return this._type;
    }

    isCollected(): boolean {
        return this._isCollected;
    }

    remove() {

        this._scene.removeFromBonusGroup(this);

    }


}


