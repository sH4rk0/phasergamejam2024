

import IPlayer from "./IPlayer";
import GamePlay from "../GamePlay";

export default class Player extends Phaser.GameObjects.Sprite implements IPlayer {

    private _config: genericConfig;
    private _scene: GamePlay;
    private _body: Phaser.Physics.Arcade.Body;
    private _cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private _velocity: number = 200;
    private _w: Phaser.Input.Keyboard.Key;
    private _a: Phaser.Input.Keyboard.Key;
    private _s: Phaser.Input.Keyboard.Key;
    private _d: Phaser.Input.Keyboard.Key;
    private _animations: Array<{ sprite: string, key: string, frames: Array<number>, frameRate: number, yoyo: boolean, repeat: number }> = [
        { sprite: "robo-idle", key: "idle", frames: [0, 1, 2, 3], frameRate: 10, yoyo: false, repeat: -1 },
        { sprite: "robo-run", key: "move", frames: [0, 1, 2, 3], frameRate: 10, yoyo: false, repeat: -1 }
    ];

    constructor(params: genericConfig) {
        super(params.scene, params.x, params.y, params.key);
        this._config = params;
        this.create();
        this.createAnimations();

    }

    create() {


        this._scene = <GamePlay>this._config.scene;
        this._scene.physics.world.enable(this);
        this._body = <Phaser.Physics.Arcade.Body>this.body;
        this._body.setCollideWorldBounds(true);
        this._cursors = this._scene.input.keyboard.createCursorKeys();
        this.setDepth(11);
        this._scene.add.existing(this);

        this._body.setSize(24, 30).setOffset(3, 20);

        this._w = this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this._a = this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this._s = this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this._d = this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    }

    createAnimations() {
        this._animations.forEach(element => {

            if (!this._scene.anims.exists(element.key)) {

                let _animation: Phaser.Types.Animations.Animation = {
                    key: element.key,
                    frames: this.anims.generateFrameNumbers(element.sprite, { frames: element.frames }),
                    frameRate: element.frameRate,
                    yoyo: element.yoyo,
                    repeat: element.repeat
                };

                this._scene.anims.create(_animation);
            }

        });
    }


    update(time: number, delta: number) {

        this._scene.updateValues(this.x, this.y);


        this.setDepth(this.y);
        //se il il cursore sinistro è premuto
        if (this._cursors.left.isDown || this._a.isDown) {
            //gira il PLAYER nella posizione iniziale, quella definina nello spritesheet
            this.setFlipX(false);
            //effettual il play dell'animazione
            this.anims.play('move', true);
            //setta la velocità x in modo da far muovere il player
            this._body.setVelocityX(-this._velocity);

        }


        //se il il cursore destro è premuto
        if (this._cursors.right.isDown || this._d.isDown) {
            //gira il PLAYER in direzione opposta da quella definina nello spritesheet
            this.setFlipX(true);
            //effettual il play dell'animazione
            this.anims.play('move', true);
            //setta la velocità x in modo da far muovere il player
            this._body.setVelocityX(this._velocity);
        }

        //se il il cursore in alto è premuto
        if ((this._cursors.up.isDown || this._w.isDown) && this._body.onFloor()) {

            //setta la velocità x in modo da far muovere il player
            this._body.setVelocityY(-400);
        }


        if (
            !this._cursors.left.isDown && !this._cursors.right.isDown && !this._cursors.up.isDown && !this._cursors.down.isDown
            && !this._a.isDown && !this._d.isDown && !this._w.isDown && !this._s.isDown) {
            //setta la velocità x a 0 in modo da far fermare il PLAYER
            this._body.setVelocityX(0);
            //effettual il play dell'animazione
            this.anims.play('idle', true);

        }

    }

}