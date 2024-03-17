import firebase, { FirebaseApp, initializeApp } from 'firebase/app';
import { Database, ref, set, push, getDatabase, DatabaseReference, onValue } from 'firebase/database';
import { Auth, getAuth, signInAnonymously } from 'firebase/auth';
import GameOver from './GameOver';
import Intro from './Intro';

export class Leaderboard {

    private firebaseConfig: firebase.FirebaseOptions = {
        apiKey: "AIzaSyDqLNdD7WPEGJMR6XpZ9Eks0npuU2SeVS0",
        authDomain: "phasergamejam2024-game.firebaseapp.com",
        projectId: "phasergamejam2024-game",
        storageBucket: "phasergamejam2024-game.appspot.com",
        databaseURL: "https://phasergamejam2024-game-default-rtdb.europe-west1.firebasedatabase.app/",
        messagingSenderId: "239736026466",
        appId: "1:239736026466:web:92ccd22c856c43bcb5a83b"
    };

    private _fireBaseApp: FirebaseApp;
    private _fireBaseDb: Database;
    private _scores: DatabaseReference;
    private _highScores: Array<any> = [];
    private _auth: Auth;
    private _scene: GameOver | Intro;
    private _isLoaded: boolean = false;

    constructor(scene: Phaser.Scene) {

        this._fireBaseApp = initializeApp(this.firebaseConfig);
        this._fireBaseDb = getDatabase(this._fireBaseApp);
        this._scores = ref(this._fireBaseDb, 'highscores');
        this._highScores = [];
        this._auth = getAuth(this._fireBaseApp);
        this._scene = <GameOver | Intro>scene;


        signInAnonymously(this._auth).then(() => {
            console.log("Signed in");

            this.getSnapshot().then((data) => {
                this._isLoaded = true;
                this._scene.setUpScene();
            });



        }).catch((error) => {
            console.log("Error signing in", error);
        });
    }

    public saveScore(scoreObj: { score: number, name: string, date: string }): void {
        console.log(scoreObj);
        push(this._scores, scoreObj);
    }

    public isLoaded(): boolean {
        return this._isLoaded;
    }

    private async getSnapshot(): Promise<any> {

        this._highScores = [];


        return new Promise((resolve, reject) => {
            onValue(this._scores, (snapshot: any) => {

                Object.entries(snapshot.val()).forEach((entry: any) => {
                    this._highScores.push(entry[1]);
                });
                //sort the array by score
                this._highScores.sort((a, b) => {
                    return b.score - a.score;
                });
                // return top 3
                this._highScores = this._highScores.slice(0, 3);

                resolve(this._highScores)


            });

        });



    }


    public getHighScores(): Array<any> {

        return this._highScores;
    }




}
