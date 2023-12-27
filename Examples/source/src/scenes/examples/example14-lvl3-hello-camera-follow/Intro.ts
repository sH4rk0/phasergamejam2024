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
    //definiamo il nostro player come image ma della classe physics
    this._player = this.add.image(this.game.canvas.width / 2, this.game.canvas.height / 2, "bomb").setScale(4);



    //Settiamo i tasti cursore
    this._cursors = this.input.keyboard.createCursorKeys();
    //Settiamo la nostra main camera
    this._mainCamera = this.cameras.main;
    //Settiamo i margini del viewport il doppio della misura del nostro gioco
    this._mainCamera.setBounds(
      0, //x
      0, //y
      this.game.canvas.width * 2, //width
      this.game.canvas.height * 2 //height
    );
    //indichiamo alla camera che deve seguire i movimenti del nostro player
    this._mainCamera.startFollow(this._player, true, 0.05, 0.05);



  }



  update(time: number, delta: number): void {

    //se il tasto cursore left è premuto
    if (this._cursors.left.isDown) {
      //sottraiamo 10px alla x del player
      this._player.x -= 10;
    }
    //se il tasto cursore right è premuto
    else if (this._cursors.right.isDown) {
      //aggiungiamo 10px alla x del player
      this._player.x += 10;
    }
    //se il tasto cursore up è premuto
    if (this._cursors.up.isDown) {
      //sottraiamo 10px alla y del player
      this._player.y -= 10;
    }
    //se il tasto cursore down è premuto
    else if (this._cursors.down.isDown) {
      //aggiungiamo 10px alla y del player
      this._player.y += 10;
    }



  }

}

