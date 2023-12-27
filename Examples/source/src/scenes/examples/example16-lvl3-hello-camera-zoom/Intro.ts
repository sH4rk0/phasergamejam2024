export default class Intro extends Phaser.Scene {

  //definiamo una variabile per la nostra main camera
  private _mainCamera: Phaser.Cameras.Scene2D.Camera;
  //variabile cursor nella quale inizializzeremo un oggetto che contiene 
  //i riferimenti ai tasti cursore
  private _cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  //l’istanza del nostro personaggio sarà una semplice immagine
  private _player: Phaser.GameObjects.Image;


  constructor() {
    super({
      key: "Intro",
    });


  }

  preload() {


  }

  create() {

    //aggiungiamo tre sprite alla nostra scena
    this.add.sprite(0, 0, "grid").setOrigin(0);
    this.add.sprite(1024, 0, "grid").setOrigin(0);

    //Settiamo la nostra main camera
    this._mainCamera = this.cameras.main;
    //Settiamo i margini del viewport il doppio della misura del nostro gioco
    this._mainCamera.setBounds(
      0, //x
      0, //y
      this.game.canvas.width * 2, //width
      this.game.canvas.height * 2 //height
    );


    this.time.addEvent({ delay: 2000, callback: this.zoomTo, callbackScope: this })


  }



  update(time: number, delta: number): void {



  }


  zoomTo() {

    this._mainCamera.zoomTo(
      5, //valore dello zoom
      1000, //duration
      "Sine.easeInOut", //ease function
      true, // force
      (camera: Phaser.Cameras.Scene2D.Camera, progress: number) => {
        if (progress === 1) { console.log("zoom completed"); }
      }, //callback
      this //callback context
    );


  }



}

