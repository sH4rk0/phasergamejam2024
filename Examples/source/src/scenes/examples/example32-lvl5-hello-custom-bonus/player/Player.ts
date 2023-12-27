import IPlayer from "./IPlayer";
//Importiamo la scena di gameplay in modo da potervi accedere
import GamePlay from "../GamePlay";

export default class Player extends Phaser.GameObjects.Sprite implements IPlayer {
    private _config: genericConfig;
    //riferimento alla scena dove il nostro game object verrà inserito
    private _scene: GamePlay;
    //variabile locale di tipo arcade.body per poter accedere ai metodi del Body
    // descritti nel capitolo 7
    private _body: Phaser.Physics.Arcade.Body;
    //variabile locale per la gestione dei tasti cursore come visto nel capitolo 6
    private _cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    //variabile locale per impostare la velocità del body
    private _velocity: number = 200;
    //array di oggetti per la creazione dell’animazione
    private _animations: Array<{ key: string, frames: Array<number>, frameRate: number, yoyo: boolean, repeat: number }> = [
        { key: "idle", frames: [0, 1, 2, 3], frameRate: 10, yoyo: false, repeat: -1 },
        { key: "move", frames: [4, 5, 6, 7], frameRate: 10, yoyo: false, repeat: -1 }
    ];
    constructor(params: genericConfig) {
        super(params.scene, params.x, params.y, params.key);
        this._config = params;

        //richiamiamo il metodo create nel quale sono inserite alcune
        // inizializzazioni della nostra classe custom
        this.create();
        //richiamiamo un metodo locale per implementare le animazioni dello
        // sprite
        this.createAnimations();
    }

    create() {
        //Creiamo un riferimento alla scena in modo da poterlo utilizzare 
        // successivamente per richiamare dei metodi della scena
        this._scene = <GamePlay>this._config.scene;
        //Abilitiamo this ovvero la classe corrente alla fisica di phaser
        this._scene.physics.world.enable(this);
        //Inseriamo in this._body il cast di this.body
        //Lo facciamo perché altrimenti non riusciremmo ad avere accesso
        // ai metodi di body
        this._body = <Phaser.Physics.Arcade.Body>this.body;
        //indichiamo al body che deve collidere con i bounds del world
        this._body.setCollideWorldBounds(true);
        //Creiamo l’istanza dei cursori per poter muovere il Player
        this._cursors = this._scene.input.keyboard.createCursorKeys();
        //Settiamo il livello di profondità a 11
        this.setDepth(11);
        //Aggiungiamo il Player alla scena
        this._scene.add.existing(this);
    }

    createAnimations() {
        //creazione dell’animazione come visto nei capitoli precedenti
        this._animations.forEach(element => {

            if (!this._scene.anims.exists(element.key)) {
                let _animation: Phaser.Types.Animations.Animation = {
                    key: element.key,
                    frames: this.anims.generateFrameNumbers("robo", { frames: element.frames }),
                    frameRate: element.frameRate,
                    yoyo: element.yoyo,
                    repeat: element.repeat
                };

                this._scene.anims.create(_animation);
            }
        });
    }

    update(time: number, delta: number) {
        this.setDepth(this.y);
        //se il il cursore sinistro è premuto
        if (this._cursors.left.isDown) {
            //gira il PLAYER nella posizione iniziale, quella definita nello spritesheet
            this.setFlipX(false);
            //effettua il play dell'animazione
            this.anims.play('move', true);
            //setta la velocità x in modo da far muovere il player
            this._body.setVelocityX(-this._velocity);
        }
        //se il il cursore destro è premuto
        if (this._cursors.right.isDown) {
            //gira il PLAYER in direzione opposta da quella definita nello spritesheet
            this.setFlipX(true);
            //effettua il play dell'animazione
            this.anims.play('move', true);
            //setta la velocità x in modo da far muovere il player
            this._body.setVelocityX(this._velocity);
        }

        //se il il cursore in alto è premuto
        if (this._cursors.up.isDown) {
            //effettua il play dell'animazione
            this.anims.play('move', true);
            //setta la velocità x in modo da far muovere il player
            this._body.setVelocityY(-this._velocity);
        }
        //se il il cursore in basso è premuto
        if (this._cursors.down.isDown) {
            //effettua il play dell'animazione
            this.anims.play('move', true);
            //setta la velocità x in modo da far muovere il player
            this._body.setVelocityY(this._velocity);
        }

        if (!this._cursors.left.isDown && !this._cursors.right.isDown && !this._cursors.up.isDown && !this._cursors.down.isDown) {
            //setta la velocità x a 0 in modo da far fermare il PLAYER
            this._body.setVelocity(0);
            //effettua il play dell'animazione di pausa
            this.anims.play('idle', true);
        }
    }

}
