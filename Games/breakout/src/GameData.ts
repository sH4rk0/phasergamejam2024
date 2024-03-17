export enum brickType {
  none = 0,
  blue = 10,
  red = 20,
  cyan = 30,
  yellow = 40,
  silver = 50,
  purple = 60,
  gold = 70,
  orange = 80,
  white = 90,
}



export enum bonusTypes {
  none = 'none',
  ball = 'ball',
  score = 'score',
  enlarge = 'enlarge',
  damage = 'damage',
  speed = 'speed',
  fireRate = 'firerate',
  shield = 'shield',
  missile = 'missile',
  laser = 'laser',
  invulnerability = 'invulnerability',
  rear = 'rear',
  side = 'side',
  orb = 'orb'
}

export enum enemyType {
  none = 'none',
  basic = 'basic',
  brick = 'brick',
}

export enum enemySprite {
  none = 'none',
  orb = 'orb',
  sphere = 'sphere',
  molecula = 'molecula',
  pyramid = 'pyramid',
  cube = 'cube',
  cone = 'cone',

}

export enum PlayerType {
  PLAYER1,
  PLAYER2,
  PLAYER3
}

export enum bulletDirection {
  up,
  upRight,
  right,
  downRight,
  down,
  downLeft,
  left,
  upLeft,
  follow,
  circular
}

export enum enemyMovementTypes {

  straight = "straight",
  toLeft = "toLeft",
  toRight = "toRight",
  sineToLeft = "sineToLeft",
  sineToRight = "sineToRight",
  toPlayer = "toPlayer",

}

export enum gameType {
  breakout = 'breakout',
  shooter = 'shooter',
  platform = 'platform',

}

export enum bulletType {
  ball = "ball",
  basic = "basic",
  missile = "missile",
  laser = "laser",
  orb = "orb",

}

export let GameData: gameData = {
  globals: {
    gameWidth: 1280,
    gameHeight: 800,
    bgColor: "#ffffff",
    debug: true,
    leaderboard: false,
  },

  preloader: {
    bgColor: "000000",
    image: "logo",
    imageX: 1280 / 2,
    imageY: 800 / 2,
    loadingText: "Caricamento...",
    loadingTextFont: "roboto",
    loadingTextComplete: "Tappa/clicca per iniziare!!",
    loadingTextY: 465,
    loadingBarColor: 0x0000ff,
    loadingBarY: 430,
  },


  levels: [

    {
      title: "Level 1",
      gameType: gameType.platform,
      shooter: {
        map: "level-0-platform",
      }

    },

    {
      title: "Level 1",
      gameType: gameType.breakout,
      breakout: {
        offset: { x: 32 * 4, y: 64 * 2 },
        bricks: [
          0, 0, 0, 0, 0, 0, 0, 0, 30, 0, 0, 0, 0, 0, 0, 0,
        ]
      }
    },


    {
      title: "Level 1",
      gameType: gameType.shooter,
      shooter: {
        map: "level-0-shooter",
      }

    },



    {
      title: "Level 1",
      gameType: gameType.platform,
      shooter: {
        map: "level-0-platform",
      }

    },

    /*{
      title: "Level 1",
      gameType: gameType.breakout,
      breakout: {
        offset: { x: 32 * 4, y: 64 * 2 },
        bricks: [
          10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          70, 70, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30,
        ]
      }
    },*/

    {
      title: "Level 1",
      gameType: gameType.breakout,
      breakout: {
        offset: { x: 32 * 4, y: 64 * 2 },
        bricks: [

          0, 0, 0, 0, 0, 0, 0, 0, 30, 0, 0, 0, 0, 0, 0, 0,
        ]
      }
    },




    {
      title: "Level 2",
      gameType: gameType.breakout,
      breakout: {
        offset: { x: 32 * 4, y: 64 * 2 },
        bricks: [
          10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30,
        ]
      }
    }
  ],

  tilemaps: [
    {
      key: "level-0-shooter",
      path: "assets/map/level-0-shooter.json",
    },
    {
      key: "level-0-platform",
      path: "assets/map/level-0-platform.json",
    },

  ],

  spritesheets: [

    { name: "bricks", path: "assets/images/bricks.png", width: 64, height: 32, frames: 50 },
    { name: "bonus", path: "assets/images/bonus.png", width: 66, height: 36, frames: 152 },
    { name: "paddle", path: "assets/images/paddle.png", width: 87, height: 22, frames: 23 },
    { name: "paddle-explosion", path: "assets/images/paddle-explosion.png", width: 123, height: 50, frames: 5 },
    { name: "stars", path: "assets/images/stars.png", width: 2, height: 2, frames: 3 },
    { name: "balls", path: "assets/images/balls.png", width: 22, height: 22, frames: 2 },
    { name: "enemies", path: "assets/images/enemies.png", width: 44, height: 44, frames: 150 },
    { name: "explosion", path: "assets/images/explosion.png", width: 64, height: 64, frames: 25 },
    {
      name: "robo-player",
      path: "assets/images/robo-player.png",
      width: 30,
      height: 50,
      frames: 8
    },
    {
      name: "robo-enemy",
      path: "assets/images/robo-enemy.png",
      width: 30,
      height: 50,
      frames: 8
    },

    {
      name: "tilemap-extruded",
      path: "assets/map/tilemap-extruded.png",
      width: 32,
      height: 32,
      spacing: 2,
      margin: 1,
    },
  ],
  images: [

    { name: "arkanoid-logo", path: "assets/images/arkanoid-logo.png" },
    { name: "borders", path: "assets/images/borders.png" },
    { name: "bg-tile", path: "assets/images/bg-tile.jpg" },
    { name: "bg-tile-2", path: "assets/images/bg-tile.png" },
    { name: "bg-0", path: "assets/images/bg-0.jpg" },
    { name: "bg-1", path: "assets/images/bg-1.jpg" },
    { name: "bg-2", path: "assets/images/bg-2.jpg" },
    { name: "platform-bg-2", path: "assets/images/bg-tile-platform.png" },
    { name: "platform-bg-3", path: "assets/images/bg-tile-platform-2.png" },
    { name: "patter", path: "assets/images/pattern.jpg" },
    { name: "patter-front", path: "assets/images/pattern-front.png" },
    { name: "patter-back", path: "assets/images/pattern-back.png" },

    /* */
    { name: "phaser", path: "assets/images/logo-phaser.png" },




  ],
  atlas: [{
    key: "explosionParticles",
    imagepath: "assets/images/explosionParticles.png",
    jsonpath: "assets/images/explosionParticles.json",
  }
  ],
  sounds: [
    {
      name: "intro",
      paths: ["assets/sounds/intro.ogg", "assets/sounds/intro.m4a"],
    }
  ],

  videos: [],
  audios: [
    {
      name: "sfx",
      jsonpath: "assets/sounds/sfx.json",
      paths: ["assets/sounds/sfx.ogg", "assets/sounds/sfx.m4a"],
      instance: { instance: 10 }
    }
  ],

  scripts: [],
  fonts: [{ key: 'Roboto' }, { key: 'Press+Start+2P' }],
  bitmapfonts: [],
};
