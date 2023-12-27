export default class Intro extends Phaser.Scene {

  //Variabile di tipo SmoothedKeyControl che consente di controllare il movimento 
  //e lo zoom di una camera utilizzando i tasti cursore.
  //E'possibile fornire a questo "controls" valori fisici per l'accelerazione, 
  //il trascinamento e la velocità massima per ottenere effetti più fluidi.
  //Per il corretto funzionamento è necessario richiamare il metodo update del "controls"
  //ogni frame (update)
  private _controls: Phaser.Cameras.Controls.SmoothedKeyControl;
  //definiamo una variabile per la nostra main camera
  private _mainCamera: Phaser.Cameras.Scene2D.Camera;
  //variabile cursor nella quale inizializzeremo un oggetto che contiene i riferimenti
  //ai tasti cursore
  private _cursors: Phaser.Types.Input.Keyboard.CursorKeys;


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

    //Settiamo i margini del viewport il doppio della misura del nostro gioco
    this.cameras.main.setBounds(
      0, //x
      0, //y
      this.game.canvas.width * 2, //laghezza
      this.game.canvas.height * 2 //altezza
    );

    //Settiamo la nostra main camera
    this._mainCamera = this.cameras.main;
    //Settiamo i tasti cursore
    this._cursors = this.input.keyboard.createCursorKeys();
    //creiamo un oggetto di configurazione per in nostro controller della camera
    const controlConfig: Phaser.Types.Cameras.Controls.SmoothedKeyControlConfig = {
      camera: this._mainCamera,
      //assegniamo a quale camera deve far riferimento il control
      left: this._cursors.left,
      //il cursore per lo spostamento a sinistra
      right: this._cursors.right,
      //il cursore per lo spostamento a destra
      up: this._cursors.up,
      //il cursore per lo spostamento in alto
      down: this._cursors.down,
      //il cursore per lo spostamento in basso
      acceleration: 0.06, //l'accelerazione
      drag: 0.0005, //il rallentamento quando fermiamo il movimento
      maxSpeed: 1.0 //la velocità massima
    };
    //creiamo il controller
    this._controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);


  }



  update(time: number, delta: number): void {

    this._controls.update(delta);


  }

}

