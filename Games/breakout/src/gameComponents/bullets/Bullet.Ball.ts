
import IBullet from "./iBullet";
import Bullet from "./Bullet";
import { bulletDirection } from "../../GameData";
export default class BulletBall
    extends Bullet
    implements IBullet {

    constructor(params: bulletConfig) {

        super(params);

        this.setName("ball");
        this.initBall();
    }

    initBall() {

        this.setFrame(this._config.frame);
        this._config.scene.add.existing(this);
        this._body.setCollideWorldBounds(true).setBounce(1);
        this._body.onWorldBounds = true;


        //set random name value
        this.name = "ball" + Math.random();

        this._config.scene.physics.world.on('worldbounds', (body: any) => {

            let _ball: BulletBall = body.gameObject as BulletBall;
            if (_ball.name == this.name)
                this._config.scene.sound.playAudioSprite("sfx", "bounce2", { volume: this._scene.getSfxVolume() });
        }, this);

    }

    /* setVelocity(x: number, y: number) {
         this._body.setVelocity(x, y);
     }
 
     setVelocityX(x: number) {
         this._body.setVelocityX(x);
     }*/

    disable() {
        this._scene.tweens.add({
            targets: this,
            alpha: 0,
            duration: 200,
            onComplete: () => {
                this.setActive(false);
                this.setVisible(false);
                this._body.setEnable(false);
            }

        })

    }

    update(time: number, delta: number) {
        //check if the ball is out of the screen
        if (this.y > 800) {

            this._scene.checkBallsInPlay(this);
        }

    }

}


