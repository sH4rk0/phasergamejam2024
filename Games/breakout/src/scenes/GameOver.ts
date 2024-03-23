import { GameData } from "../GameData";
import { Leaderboard } from "./LeaderBoard";

export default class GameOver extends Phaser.Scene {
  private _leaderBoard: Leaderboard;

  private _chars: Array<Array<string>>;
  private _cursor: Phaser.Math.Vector2;
  private _name: string;
  private _charLimit: number;
  private _block: Phaser.GameObjects.Image;
  private _text: Phaser.GameObjects.BitmapText;
  private _gamepad: Phaser.Input.Gamepad.Gamepad;
  private _moved: boolean = false;
  private _pressed: boolean = false;
  private _rub: Phaser.GameObjects.Image;
  private _end: Phaser.GameObjects.Image;
  private _scoreTitle: Phaser.GameObjects.BitmapText;
  private _scoreText: Phaser.GameObjects.BitmapText;
  private _score: number = 0;
  private _nameTitle: Phaser.GameObjects.BitmapText;
  private _nameText: Phaser.GameObjects.BitmapText;
  private _inputContainer: Phaser.GameObjects.Container;

  constructor() {
    super({
      key: "GameOver",
    });

    this._chars = [
      ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
      ["K", "L", "M", "N", "O", "P", "Q", "R", "S", "T"],
      ["U", "V", "W", "X", "Y", "Z", ".", "-", "<", ">"],
    ];

    this._cursor = new Phaser.Math.Vector2();
    this._name = "";
    this._charLimit = 8;
  }


  create() {
    this.cameras.main.setBackgroundColor("#000000");
    this._leaderBoard = new Leaderboard(this);
    this._inputContainer = this.add.container().setAlpha(0);
  }

  setUpScene() {

    this._name = "";
    this._text = this.add.bitmapText(
      180,
      20,
      "arcade",
      "ABCDEFGHIJ\n\nKLMNOPQRST\n\nUVWXYZ.-"
    );
    this._text.setLetterSpacing(20);
    this._text.setInteractive();

    this._rub = this.add
      .image(this._text.x + 430, this._text.y + 148, "rub")
      .setInteractive()
      .on("pointerdown", () => {
        this.rub();
      });
    this._end = this.add
      .image(this._text.x + 482, this._text.y + 148, "end")
      .setTint(0x00ff00)
      .setInteractive()
      .on("pointerdown", () => {
        this.end();
      });

    this._block = this.add
      .image(this._text.x - 10, this._text.y - 2, "block")
      .setOrigin(0);


    this.input.keyboard.on("keyup", this.anyKey, this);

    this._text.on("pointermove", this.moveBlock, this);
    this._text.on("pointerover", this.moveBlock, this);
    this._text.on("pointerup", this.pressKey, this);

    this.tweens.add({
      targets: this._block,
      alpha: 0.2,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
      duration: 350,
    });

    this._scoreTitle = this.add
      .bitmapText(180, 210, "arcade", "SCORE")
      .setTint(0xfed500)
      .setFontSize(22)

    this._nameTitle = this.add
      .bitmapText(400, 210, "arcade", "YOUR NAME")
      .setTint(0xfed500).setFontSize(22)

    this._score = <number>this.registry.get("score");

    if (this._score == null || this._score == undefined) this._score = 0;

    this._scoreText = this.add
      .bitmapText(180, 250, "arcade", this._score + "")
      .setTint(0xffffff);

    this._nameText = this.add
      .bitmapText(400, 250, "arcade", "--------")
      .setTint(0xffffff);

    this._inputContainer.add([
      this._text,
      this._nameTitle,
      this._scoreTitle,
      this._nameText,
      this._scoreText,
      this._block,
      this._end,
      this._rub,
      this.add
        .bitmapText(180, -30, "arcade", "Digita il tuo nome")
        .setFontSize(24)
        .setOrigin(0).setTint(0xfed500)
    ]);

    this._inputContainer.setX(200).setY(200);
    this.tweens.add({
      targets: this._inputContainer,
      alpha: 1,
      y: 250,
      duration: 500,
      ease: "Sine.easeInOut",
    });


  }

  update(time: number, delta: number) {

    if (this.input.gamepad != null && this.input.gamepad.total > 0 && this._gamepad == undefined) {
      this._gamepad = this.input.gamepad.gamepads[0];
    } else if (this.input.gamepad != null && this.input.gamepad.total > 0 && this._gamepad != undefined) {
      if (this._gamepad.axes[0].getValue() == -1 && !this._moved) {
        this.moveLeft();
        this._moved = true;
      } else if (this._gamepad.axes[0].getValue() == 1 && !this._moved) {
        this.moveRight();
        this._moved = true;
      } else if (this._gamepad.axes[1].getValue() == -1 && !this._moved) {
        this.moveUp();
        this._moved = true;
      } else if (this._gamepad.axes[1].getValue() == 1 && !this._moved) {
        this.moveDown();
        this._moved = true;
      } else if (
        this._gamepad.axes[0].getValue() == 0 &&
        this._gamepad.axes[1].getValue() == 0
      ) {
        this._moved = false;
      }


      this.pressKey();

    }
  }

  moveBlock(pointer: Phaser.Input.Pointer, x: number, y: number) {
    let cx = Phaser.Math.Snap.Floor(x, 52, 0, true);
    let cy = Phaser.Math.Snap.Floor(y, 64, 0, true);
    let char = this._chars[cy][cx];
    this._cursor.set(cx, cy);
    this._block.x = this._text.x - 10 + cx * 52;
    this._block.y = this._text.y - 2 + cy * 64;
  }

  moveLeft() {

    if (this._cursor.x > 0) {
      this._cursor.x--;
      this._block.x -= 52;
    } else {
      this._cursor.x = 9;
      this._block.x += 52 * 9;
    }
  }

  moveRight() {
    if (this._cursor.x < 9) {
      this._cursor.x++;
      this._block.x += 52;
    } else {
      this._cursor.x = 0;
      this._block.x -= 52 * 9;
    }
  }

  moveUp() {
    if (this._cursor.y > 0) {
      this._cursor.y--;
      this._block.y -= 64;
    } else {
      this._cursor.y = 2;
      this._block.y += 64 * 2;
    }
  }

  moveDown() {
    if (this._cursor.y < 2) {
      this._cursor.y++;
      this._block.y += 64;
    } else {
      this._cursor.y = 0;
      this._block.y -= 64 * 2;
    }
  }

  anyKey(event: any) {
    //  Only allow A-Z . and -

    let code: any = event.keyCode;
    if (code === Phaser.Input.Keyboard.KeyCodes.LEFT) {
      this.moveLeft();
    }
    else if (code === Phaser.Input.Keyboard.KeyCodes.RIGHT) {
      this.moveRight();
    }
    else if (code === Phaser.Input.Keyboard.KeyCodes.UP) {
      this.moveUp();
    }
    else if (code === Phaser.Input.Keyboard.KeyCodes.DOWN) {
      this.moveDown();
    }
    else if (code === Phaser.Input.Keyboard.KeyCodes.ENTER) {
      this.pressKey();
    }
    else if (code === Phaser.Input.Keyboard.KeyCodes.SPACE) {
      this.pressKey();
    }
    else if (code === Phaser.Input.Keyboard.KeyCodes.PERIOD) {
      this._cursor.set(6, 2);
      this.pressKey();
    }
    else if (code === Phaser.Input.Keyboard.KeyCodes.MINUS) {
      this._cursor.set(7, 2);
      this.pressKey();
    }
    else if (
      code === Phaser.Input.Keyboard.KeyCodes.BACKSPACE ||
      code === Phaser.Input.Keyboard.KeyCodes.DELETE
    ) {
      this._cursor.set(8, 2);
      this.pressKey();
    }
    else if (
      code >= Phaser.Input.Keyboard.KeyCodes.A &&
      code <= Phaser.Input.Keyboard.KeyCodes.Z
    ) {
      code -= 65;
      let y = Math.floor(code / 10);
      let x = code - y * 10;

      this._cursor.set(x, y);
      this.pressKey();
    }
  }

  rub() {
    let nameLength = this._name.length;
    this._name = this._name.substr(0, nameLength - 1);
    this._nameText.setText(this._name);
  }

  end() {
    if (this._name == "<") this._name = "";
    let _scoreObj = { score: this._score, name: this._name, date: new Date().toISOString() }
    this._leaderBoard.saveScore(_scoreObj);
    this.tweens.add({
      targets: this._inputContainer,
      alpha: 0,
      y: 200,
      duration: 500,
      ease: "Sine.easeInOut",
      onComplete: () => {
        this.scene.stop(this)
        this.scene.start("Intro");
      },
    })
  }

  pressKey() {
    let x = this._cursor.x;
    let y = this._cursor.y;
    let nameLength = this._name.length;

    this._block.x = this._text.x - 10 + x * 52;
    this._block.y = this._text.y - 2 + y * 64;

    if (x === 9 && y === 2) {
      this.end();
    } else if (x === 8 && y === 2 && nameLength > 0) {
      this.rub();
    } else if (this._name.length < this._charLimit) {
      this._name = this._name.concat(this._chars[y][x]);
      this._nameText.setText(this._name);
    }
  }
}

