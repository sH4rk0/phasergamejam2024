export let GameData: gameData = {
  globals: {
    gameWidth: 1280,
    gameHeight: 800,
    bgColor: "#ffffff",
    debug: false
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

  spritesheets: [
    // { name: "robo", path: "assets/images/robo.png", width: 30, height: 50, frames: 8 },

  ],
  images: [
    { name: "phaser", path: "assets/images/logo-phaser.png" },
  ],
  atlas: [],
  sounds: [
    /*{
    name: "music",
    paths: ["assets/sounds/intro.ogg", "assets/sounds/intro.m4a"],
    volume: 1,
    loop: true,
    frame: 1,
  }*/
  ],

  videos: [

    // { name: "video", path: "/assets/video/video.mp4" },

  ],
  audios: [

    /*{
    name: "sfx",
    jsonpath: "assets/sounds/sfx.json",
    paths: ["assets/sounds/sfx.ogg", "assets/sounds/sfx.m4a"],
    instances: 10,
  }*/
  ],

  scripts: [],
  fonts: [{ key: 'Roboto' }],

  bitmapfonts: [],
};
