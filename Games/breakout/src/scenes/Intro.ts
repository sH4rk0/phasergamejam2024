import CustomPipelineGlitch from "../gameComponents/pipelines/CustomPipelineGlitch";
import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
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
  private rexUI: UIPlugin;
  private _scrollablePanel: UIPlugin.ScrollablePanel;
  private _notesEmitter: Phaser.GameObjects.Particles.ParticleEmitter;
  private _audioTween: Phaser.Tweens.Tween;

  constructor() {
    super({
      key: "Intro",
    });
  }

  preload() { }


  create() {
    //setta il background di sfondo a bianco
    this.cameras.main.setBackgroundColor("#000000");
    //quando viene inizializzata (autenticazione + recupero della classifica) la classe leaderBoard richiama la funzione setUpScene
    this._leaderBoard = new Leaderboard(this);

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

    //creo il bottone audio
    this._audioBtn = this.add.sprite(1280 - 50, 750, "audiobtn", 0).setScale(.5).setOrigin(.5).setInteractive().on("pointerdown", () => {

      if (!this._audioIsMuted) {
        this.game.sound.mute = true;
        this._audioIsMuted = true;
        this._notesEmitter.stop();
        this._audioTween.pause();
        this._audioBtn.setAlpha(.75);

      } else {
        this.game.sound.mute = false;
        this._audioIsMuted = false;
        this._notesEmitter.start();
        this._audioTween.resume();
        this._audioBtn.setAlpha(1);

      }

    }).setDepth(1001);

    //https://labs.phaser.io/edit.html?src=src\fx\barrel\barrel%20squish%20fx.js
    //deformazione del bottone audio
    let _barrel: Phaser.FX.Barrel = this._audioBtn.preFX.addBarrel(0.75);

    //creo il tween per la deformazione del bottone audio
    this._audioTween = this.tweens.add({
      targets: _barrel,
      amount: 1.4,
      yoyo: true,
      duration: 500,
      loop: -1,
      ease: 'sine.inout'
    });

    //creo l'emitter per le note musicali
    this._notesEmitter = this.add.particles(this._audioBtn.x, this._audioBtn.y, 'notes', {
      speed: 40,
      frame: [0, 1, 2, 3],
      lifespan: 1200,
      scale: { start: 3, end: 2 },
      alpha: { start: 1, end: 0 },
      gravityY: -200,
      frequency: 200

    }).setDepth(1000);

    let _logo: Phaser.GameObjects.Image = this.add.image(this.game.canvas.width / 2, this.game.canvas.height / 2 - 250, "arkanoid-logo").setScale(.2).setAlpha(0);

    //Shader per il post pipeline
    //se non è un dispositivo touch aggiungo il post pipeline
    if (!this.sys.game.device.input.touch) {
      //aggiungo il post pipeline
      const renderer = this.game.renderer as Phaser.Renderer.WebGL.WebGLRenderer;
      //inserisco nel renderer il post pipeline
      renderer.pipelines.addPostPipeline("glitch", CustomPipelineGlitch);
      //applico il post pipeline all'oggetto
      _logo.setPostPipeline(CustomPipelineGlitch);

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


    this._creditsContainer = this.add.container(0, 0).setDepth(1005).setAlpha(0);


    this._scrollablePanel = this.rexUI.add.scrollablePanel({
      x: 690, y: 450,
      height: 400,
      width: 700,
      scrollMode: 'y',
      background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 10, 0xffffff).setInteractive(),
      panel: {
        child: this.createPanel(),
        mask: { padding: 1, },
      },

      slider: {
        track: this.rexUI.add.roundRectangle(0, 0, 5, 0, { radius: 5 }, 0x260e04),
        thumb: this.rexUI.add.roundRectangle(0, 0, 5, 150, { radius: 5 }, 0x7b5e57),
      },
      mouseWheelScroller: {
        focus: false,
        speed: 0.1
      },
      space: { left: 20, right: 20, top: 20, bottom: 20, panel: 3, header: 5, footer: 5 }
    }).layout().scrollToBottom().scrollToTop().setDepth(1005)



    let _layer: Phaser.GameObjects.Image = this.add.image(0, 0, "layer").setInteractive().on("pointerdown", () => { this.closeCredits(); }).setOrigin(0, 0);

    this._creditsContainer.add([_layer, this._scrollablePanel]);

  }

  //crea il pannello delle credits
  //ritorna un container
  //contenente il testo
  createPanel() {
    var text = this.add.text(0, 0, '').setColor("#000000").setText("Questo videogame è stato implementato come esempio per la Phaser Game Jam 2024.\n\nIn questa modale troviamo gli autori del gioco.\n\nGame Design: Mario Rossi\n\nProgramming: Mario Rossi\n\nGraphics: Mario Rossi\n\nMusic: Mario Rossi\n\nSound Effects: Mario Rossi").setFontSize(22).setWordWrapWidth(600).setLineSpacing(8).setFontFamily("'Press Start 2P'")
    var container = this.add.container()
      .add(text)
      .setSize(600, text.height);

    return container;
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
      let _text: Phaser.GameObjects.Text = this.add.text(1280 / 2, 800 / 2 + 100 + (index * 50), `${score.name} - ${score.score}`).setOrigin(0.5, 0.5).setColor("#ffffff").setFontSize(20).setFontFamily("'Press Start 2P'").setDepth(1002).setAlpha(0);
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

    //se la classifica è stata caricata
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

