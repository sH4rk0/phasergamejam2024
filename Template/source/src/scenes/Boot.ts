//viene importato un riferimento a gamedata per poter usare le variabili globali
import { GameData } from "../GameData";

//creiamo la classe Boot che estende Phaser.Scene
export default class Boot extends Phaser.Scene {


  private _text: Phaser.GameObjects.Text;
  //il costruttore richiama il costruttore della classe Phaser.Scene
  //si usa il metodo super per richiamare il costruttore della classe Phaser.Scene

  constructor() {
    // il metodo super prende come parametro un oggetto con una chiave key che ha come valore il nome della scena
    super({
      key: "Boot",
    });

  }

  //il metodo init viene chiamato all'inizio della scena
  //in questo caso non esegue nessuna operazione
  init() {

  }
  //il metodo preload viene chiamato dopo il metodo init
  //nel metodo preload vengono caricati gli assets che servono per il caricamento della scena successiva
  preload() {


    //settiamo il colore di sfondo della scena
    this.cameras.main.setBackgroundColor("#ffffff");
    //precarichiamo l'immagine del logo
    this.load.image("logo", "assets/images/phaser.png");

  }

  //il metodo create viene chiamato dopo il metodo preload
  create() {


    //fermiamo la scena corrente
    this.scene.stop("Boot");
    //richiamiamo il metodo start della scena Preloader per
    //passare alla scena successiva
    this.scene.start("Preloader");

  }

  update(time: number, delta: number): void {

    //this._text.angle += 1;

  }




}
