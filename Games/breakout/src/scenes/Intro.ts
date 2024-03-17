import CustomPipelineGlitch from "../gameComponents/pipelines/CustomPipelineGlitch";
import { Leaderboard } from "./LeaderBoard";

export default class Intro extends Phaser.Scene {

  private _startGameText: Phaser.GameObjects.Text;
  private _creditsText: Phaser.GameObjects.Text;
  private _creditsContainer: Phaser.GameObjects.Container;
  private _2024: Phaser.GameObjects.Text;
  private _music: Phaser.Sound.BaseSound;
  private _audioBtn: Phaser.GameObjects.Sprite;
  private _audioIsMuted: boolean = false;
  private _patternFront: Phaser.GameObjects.TileSprite;
  private _patternBack: Phaser.GameObjects.TileSprite;
  private _counter: number = 0;
  private _leaderBoard: Leaderboard;
  private _highScoresTexts: Array<Phaser.GameObjects.Text> = [];


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
    this._leaderBoard = new Leaderboard(this);
    console.log("Intro", this._leaderBoard.isLoaded());
  }


  setUpScene() {

    //carica la musica
    this._music = this.sound.add("intro", { loop: true, volume: .1 });
    this._music.play();

    this._patternBack = this.add.tileSprite(0, 0, 1280, 800, "patter-back").setOrigin(0, 0).setAlpha(0);
    this._patternFront = this.add.tileSprite(0, 0, 1280, 800, "patter-front").setOrigin(0, 0).setAlpha(0);

    this.tweens.add({
      targets: [this._patternBack, this._patternFront],
      alpha: 1,
      delay: this.tweens.stagger(100, {}),
      duration: 500,
    });


    this._audioBtn = this.add.sprite(1280 - 100, 750, "audioBtn", 0).setScale(0.5).setOrigin(0.5, 0.5).setInteractive().on("pointerdown", () => {

      if (!this._audioIsMuted) {
        this.game.sound.mute = true;
        this._audioIsMuted = true;

        this._audioBtn.setFrame(2);
      } else {
        this.game.sound.mute = false;
        this._audioIsMuted = false;
        this._audioBtn.setFrame(0);
      }


    }).on("pointerover", () => {

      if (!this._audioIsMuted) {
        this._audioBtn.setFrame(1);
      } else {
        this._audioBtn.setFrame(3);
      }

    }).on("pointerout", () => {

      if (!this._audioIsMuted) {
        this._audioBtn.setFrame(0);
      } else {
        this._audioBtn.setFrame(2);
      }
    })
      .setDepth(1001);

    let _logo: Phaser.GameObjects.Image = this.add.image(this.game.canvas.width / 2, this.game.canvas.height / 2 - 250, "arkanoid-logo").setScale(.2).setAlpha(0);

    if (!this.sys.game.device.input.touch) {
      const renderer = this.game
        .renderer as Phaser.Renderer.WebGL.WebGLRenderer;

      renderer.pipelines.addPostPipeline("glitch", CustomPipelineGlitch);
      _logo.setPostPipeline(CustomPipelineGlitch);
      this._patternBack.setPostPipeline(CustomPipelineGlitch);
      this._patternFront.setPostPipeline(CustomPipelineGlitch);
    }

    let _tweenConfig: Phaser.Types.Tweens.TweenBuilderConfig = {
      targets: _logo,
      scale: .75,
      alpha: 1,
      repeat: 0,
      yoyo: false,
      delay: 500,
      y: this.game.canvas.height / 2 - 200,
      ease: Phaser.Math.Easing.Sine.Out,
      duration: 1000,
      onComplete: () => { this.startIntro(); },
    }
    this.tweens.add(_tweenConfig)


    this._creditsContainer = this.add.container(0, 0).setDepth(1002).setAlpha(0);

    let _layer: Phaser.GameObjects.Image = this.add.image(0, 0, "layer").setOrigin(0, 0)
      .setInteractive()
      .on("pointerdown", () => { this.closeCredits(); });

    let _modal: Phaser.GameObjects.Image = this.add.image(1280 / 2, 800 / 2, "modal").setOrigin(0.5)
    let _creditLabel: Phaser.GameObjects.Text = this.add.text(1280 / 2, 200, "Credits").setOrigin(0.5, 0.5).setColor("#000000").setFontSize(40).setFontFamily("roboto");
    let _creditDescription: Phaser.GameObjects.Text = this.add.text(260, 230, "Questo videogame è stato implementato come esempio per la Phaser Game Jam 2024. In questa modale troviamo gli autori del gioco.\n\nGame Design: Luca Sartoni\nProgramming: Luca Sartoni\nGraphics: Luca Sartoni\nMusic: Luca Sartoni\nSound Effects: Luca Sartoni\n\n Clicca per chiudere la modale.").setOrigin(0).setColor("#000000").setFontSize(20).setFontFamily("roboto").setWordWrapWidth(700);

    this._creditsContainer.add([_layer, _modal, _creditLabel, _creditDescription]);



  }




  startIntro() {


    this._2024 = this.add.text(1280 / 2, 800 / 2, "Phaser Game Jam 0").setOrigin(0.5, 0.5).setColor("#ffffff").setFontSize(40).setFontFamily("'Press Start 2P'").setDepth(1001).setAlpha(0);

    let updateTween = this.tweens.addCounter({
      from: 2000,
      to: 2024,
      duration: 2000,
      ease: Phaser.Math.Easing.Sine.Out,
      onUpdate: (tween: Phaser.Tweens.Tween) => {
        const value = Math.round(tween.getValue());
        this._2024.setText(`Phaser Game Jam ${value}`);


      },
      onComplete: () => {
        this.displayLeaderBoard()
      }
    });

    this.tweens.add({
      targets: this._2024,
      alpha: 1,
      duration: 250,
      delay: 0,
      onComplete: () => { }
    });






    this._startGameText = this.add.text(this.game.canvas.width / 2, this.game.canvas.height / 2 + 280, "GIOCA")
      .setOrigin(0.5, 0)
      .setColor("#ffffff")
      .setFontSize(40)
      .setFontFamily("'Press Start 2P'").setDepth(1001).on("pointerdown", () => {

        this.scene.stop(this);

        this.scene.start("Prelevel", { level: 0 });

        if (this._music.isPlaying) {
          this._music.stop();
          this._music.destroy();
        }


      }).on("pointerover", () => {
        this.sound.playAudioSprite("sfx", "bounce1", { volume: .25 });
        this._startGameText.setColor("#ff0000");

      }).on("pointerout", () => {
        this._startGameText.setColor("#ffffff");

      }).setInteractive();


    this._creditsText = this.add.text(this.game.canvas.width / 2, this.game.canvas.height / 2 + 330, "Credits")
      .setOrigin(0.5, 0)
      .setColor("#ffffff")
      .setFontSize(20)
      .setFontFamily("'Press Start 2P'")
      .setDepth(1001)
      .on("pointerdown", () => { this.openCredits(); })
      .on("pointerover", () => {
        this._creditsText.setColor("#ff0000");
        this.sound.playAudioSprite("sfx", "bounce1", { volume: .25 });
      })
      .on("pointerout", () => { this._creditsText.setColor("#ffffff"); })
      .setInteractive();

  }


  openCredits() {

    let _tweenConfig: Phaser.Types.Tweens.TweenBuilderConfig = {
      targets: this._creditsContainer,
      alpha: 1,
      duration: 250,
    }
    this.tweens.add(_tweenConfig);
  }

  closeCredits() {

    let _tweenConfig: Phaser.Types.Tweens.TweenBuilderConfig = {
      targets: this._creditsContainer,
      alpha: 0,
      duration: 250,
    }
    this.tweens.add(_tweenConfig);

  }

  displayLeaderBoard() {
    let _highScores: Array<any> = this._leaderBoard.getHighScores();
    this._highScoresTexts = [];
    _highScores.forEach((score: any, index: number) => {
      let _text: Phaser.GameObjects.Text = this.add.text(1280 / 2, 800 / 2 + 100 + (index * 50), `${score.name} - ${score.score}`).setOrigin(0.5, 0.5).setColor("#ffffff").setFontSize(20).setFontFamily("roboto").setDepth(1002).setAlpha(0);
      this._highScoresTexts.push(_text);
    });

    this.tweens.add({
      targets: this._highScoresTexts,
      alpha: 1,
      duration: 250,
      delay: this.tweens.stagger(100, {}),
      onComplete: () => { }
    });


  }



  update(time: number, delta: number): void {

    if (this._leaderBoard.isLoaded()) {

      //aumento il counter
      this._counter += 0.01;
      //muovo le tile con moto circolare usanto seno e coseno
      this._patternBack.tilePositionX += Math.sin(this._counter) * -.25; //moltiplicatore per la velocità;
      this._patternBack.tilePositionY += Math.cos(this._counter) * -.25; //moltiplicatore per la velocità

      this._patternFront.tilePositionX += Math.sin(this._counter) * .75; //moltiplicatore per la velocità;
      this._patternFront.tilePositionY += Math.cos(this._counter) * .75; //moltiplicatore per la velocità

    }
  }



}

