
enum playerState {
  IDLE,
  RUNNING,
  JUMPING,
  FALLING
}

export default class Intro extends Phaser.Scene {

  private _image1: Phaser.GameObjects.Image;
  private _startGameText: Phaser.GameObjects.Text;
  private _player: Phaser.GameObjects.Sprite;
  private _playerState: playerState = playerState.IDLE;


  constructor() {
    super({
      key: "Intro",
    });

  }

  preload() {


  }
  create() {

    //setta il background di sfondo a bianco
    this.cameras.main.setBackgroundColor("#000000");


    this._image1 = this.add.image(this.game.canvas.width / 2, this.game.canvas.height / 2, "phaser")
      .setDepth(1)
      .setBlendMode(Phaser.BlendModes.ADD);

    this.add.image(this.game.canvas.width / 2, this.game.canvas.height / 2, "intro-bg").setScale(2);
    this.add.image(this.game.canvas.width / 2, this.game.canvas.height / 2 - 100, "freedoom").setScale(1);
    this.add.image(20, 780, "thelucasart").setScale(0.5).setOrigin(0, 1);

    this._startGameText = this.add.text(this.game.canvas.width / 2, this.game.canvas.height / 2 + 280, "GIOCA").setOrigin(0.5, 0).setColor("#ffffff").setFontSize(40).setFontFamily("roboto").setDepth(1001).on("pointerdown", () => {
      this.scene.stop("Intro");
      this.scene.start("GamePlay");

    }).on("pointerover", () => {
      this._startGameText.setColor("#ff0000");
      this._player.play("player-running");
    }).on("pointerout", () => {
      this._startGameText.setColor("#ffffff");
      this._player.play("player-idle");
    }).setInteractive();

    this._player = this.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 2 + 200, "player", 10).setOrigin(0.5, 0.5).setScale(2)


    let _animation: Phaser.Types.Animations.Animation = {
      key: "player-running",
      frames: this.anims.generateFrameNumbers("player", { frames: [10, 11, 12, 13, 14, 15, 16, 17] }),
      frameRate: 10,
      yoyo: false,
      repeat: -1
    };

    this.anims.create(_animation);

    _animation = {
      key: "player-idle",
      frames: this.anims.generateFrameNumbers("player", { frames: [0, 1, 2, 3] }),
      frameRate: 5,
      yoyo: false,
      //repeat: -1
    };
    this.anims.create(_animation);

    this._player.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
      this.releaseItem();
    }, this);


    if (this._playerState == playerState.IDLE)
      this._player.play("player-idle");
    else if (this._playerState == playerState.RUNNING)
      this._player.play("player-running");


  }

  releaseItem() {

    const item = this.add.image(500, 500, 'logo').setScale(.25);

    this.tweens.add({
      targets: item,
      props: {
        alpha: { value: 0, duration: 3000, ease: 'Power1' },
        y: {
          value: -200,
          ease: 'Linear',
          duration: 3000,
        },
        x: {
          value: '+=128',
          ease: 'Sine.inOut',
          duration: 500,
          yoyo: true,
          repeat: 4
        }
      },
      onComplete: () => {
        console.log('Complete and destroy');
        item.destroy();
      }
    });
  }





  update(time: number, delta: number): void {

    //this._image1.angle += 1;

  }

}

