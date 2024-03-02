export let GameData: gameData = {
  globals: {
    gameWidth: 1280,
    gameHeight: 800,
    bgColor: "#ffffff",
    debug: true
  },

  preloader: {
    bgColor: "ffffff",
    image: "logo",
    imageX: 1280 / 2,
    imageY: 800 / 2,
    loadingText: "Loading...",
    loadingTextFont: "roboto",
    loadingTextComplete: "Tap/click to start!!!",
    loadingTextY: 700,
    loadingBarColor: 0xff0000,
    loadingBarY: 630,
  },

  tilemaps: [
    {
      key: "level-0",
      path: "assets/map/level-0.json",
    },
    {
      key: "level-1",
      path: "assets/map/level-1.json",
    },
    {
      key: "level-0-platform",
      path: "assets/map/level-0-platform.json",
    },

  ],

  spritesheets: [
    {
      name: "tilemap-extruded",
      path: "assets/map/tilemap-extruded.png",
      width: 32,
      height: 32,
      spacing: 2,
      margin: 1,
    },
    {
      name: "platform-extruded",
      path: "assets/map/platform-extruded.png",
      width: 32,
      height: 32,
      spacing: 2,
      margin: 1,
    },
    {
      name: "robo-idle",
      path: "assets/images/robo-idle.png",
      width: 30,
      height: 50,
      frames: 4
    },
    {
      name: "robo-run",
      path: "assets/images/robo-run.png",
      width: 30,
      height: 50,
      frames: 4
    },
    {
      name: "players",
      path: "assets/images/players.png",
      width: 52,
      height: 70,
      frames: 84
    },
    {
      name: "bomb",
      path: "assets/images/bomb.png",
      width: 33,
      height: 31,
      frames: 6
    },
    {
      name: "explosion",
      path: "assets/images/explosion.png",
      width: 80,
      height: 80,
      frames: 28
    },

    {
      name: "asteroid-0",
      path: "assets/images/asteroid-0.png",
      width: 80,
      height: 80,
      frames: 12
    },
    {
      name: "asteroid-1",
      path: "assets/images/asteroid-1.png",
      width: 80,
      height: 80,
      frames: 12
    },
    {
      name: "asteroid-2",
      path: "assets/images/asteroid-2.png",
      width: 100,
      height: 100,
      frames: 15
    },
    {
      name: "robo",
      path: "assets/images/robo.png",
      width: 30,
      height: 50,
      frames: 8
    },
    {
      name: "robo2",
      path: "assets/images/robo2.png",
      width: 30,
      height: 50,
      frames: 8
    },
    {
      name: "asteroid-3",
      path: "assets/images/asteroid-3.png",
      width: 70,
      height: 70,
      frames: 13
    },
    {
      name: "flares",
      path: "assets/images/flares.png",
      width: 130,
      height: 132,
      frames: 5
    }, {
      name: "bonus-heart",
      path: "assets/images/bonus-heart.png",
      width: 40,
      height: 40,
      frames: 2
    },
    {
      name: "bonus-key",
      path: "assets/images/bonus-key.png",
      width: 40,
      height: 40,
      frames: 2
    },
    {
      name: "bonus-coin",
      path: "assets/images/bonus-coin.png",
      width: 64,
      height: 64,
      frames: 8
    }, {
      name: "players",
      path: "assets/images/players.png",
      width: 52,
      height: 70,
      frames: 84
    },
    {
      name: "bomb",
      path: "assets/images/bomb.png",
      width: 33,
      height: 31,
      frames: 6
    },
    {
      name: "explosion",
      path: "assets/images/explosion.png",
      width: 80,
      height: 80,
      frames: 28
    },
    {
      name: "explosion-2",
      path: "assets/images/explosion2.png",
      width: 64,
      height: 64,
      frames: 25
    },

    {
      name: "asteroid-0",
      path: "assets/images/asteroid-0.png",
      width: 80,
      height: 80,
      frames: 12
    },
    {
      name: "asteroid-1",
      path: "assets/images/asteroid-1.png",
      width: 80,
      height: 80,
      frames: 12
    },
    {
      name: "asteroid-2",
      path: "assets/images/asteroid-2.png",
      width: 100,
      height: 100,
      frames: 15
    },
    {
      name: "robo",
      path: "assets/images/robo.png",
      width: 30,
      height: 50,
      frames: 8
    },
    {
      name: "robo2",
      path: "assets/images/robo2.png",
      width: 30,
      height: 50,
      frames: 8
    },
    {
      name: "asteroid-3",
      path: "assets/images/asteroid-3.png",
      width: 70,
      height: 70,
      frames: 13
    },
    {
      name: "flares",
      path: "assets/images/flares.png",
      width: 130,
      height: 132,
      frames: 5
    }, {
      name: "bonus-heart",
      path: "assets/images/bonus-heart.png",
      width: 40,
      height: 40,
      frames: 2
    },
    {
      name: "bonus-key",
      path: "assets/images/bonus-key.png",
      width: 40,
      height: 40,
      frames: 2
    },
    {
      name: "bonus-coin",
      path: "assets/images/bonus-coin.png",
      width: 64,
      height: 64,
      frames: 8
    }],
  images: [
    { name: "cannon_head", path: "assets/images/cannon_head.png" },
    { name: "cannon_body", path: "assets/images/cannon_body.png" },
    { name: "logo", path: "assets/images/galaxian.png" },
    { name: "layer", path: "assets/images/layer.png" },
    { name: "popup", path: "assets/images/popup.png" },
    { name: "bg1", path: "assets/images/1.png" },
    { name: "bg2", path: "assets/images/2.png" },
    { name: "bg3", path: "assets/images/3.png" },
    { name: "bg4", path: "assets/images/4.png" },
    { name: "bg5", path: "assets/images/5.png" },
    { name: "bg6", path: "assets/images/6.png" },
    { name: "bg7", path: "assets/images/7.png" },
    { name: "space", path: "assets/images/bg.jpg" },
    { name: "nebula", path: "assets/images/nebula.jpg" },
    { name: "grid", path: "assets/images/grid.png" },
    {
      name: "logo-phaser",
      path: "assets/images/logo-phaser.png",
    },
  ],
  atlas: [],
  sounds: [{
    name: "intro",
    paths: ["assets/sounds/intro.ogg", "assets/sounds/intro.m4a"],
  },
  ],
  audios: [
    {
      name: "sfx",
      jsonpath: "assets/sounds/sfx.json",
      paths: ["assets/sounds/sfx.ogg", "assets/sounds/sfx.m4a"],
      instance: { instance: 10 },
    },
  ],
  bitmapfonts: []
};
