interface gameData {

  globals: {
    gameWidth: number,
    gameHeight: number,
    bgColor: string,
    debug: boolean,
    leaderboard: boolean,
  },

  preloader: {
    bgColor: string,
    image: string,
    imageX: number,
    imageY: number,
    loadingText: string,
    loadingTextFont: string,
    loadingTextComplete: string,
    loadingTextY: number
    loadingBarColor: number,
    loadingBarY: number
  },

  levels: Array<levelConfig>,



  spritesheets?: Array<SpritesheetsAsset>,
  images?: Array<ImageAsset>,
  atlas?: Array<AtlasAsset>,
  sounds?: Array<SoundAsset>,
  videos?: Array<VideoAsset>,
  audios?: Array<AudioSpriteAsset>,
  bitmapfonts?: Array<BitmapfontAsset>,
  scripts?: Array<ScriptAsset>,
  tilemaps?: Array<TileMapsAsset>,
  fonts?: Array<FontAsset>,

}

interface levelConfig {
  title: string;
  gameType: string;
  breakout?: {
    bricks?: Array<number>;
    offset?: { x: number, y: number };
  };
  shooter?: {
    map?: string;
  };

}

interface genericConfig {
  scene: Phaser.Scene;
  x: number;
  y: number;
  key: string;
  frame?: string | number;
}



interface bonusConfig extends genericConfig {
  type: string;
}

interface playerConfig extends genericConfig {

  frame?: string | number;
  playerType?: number;
}


interface fireObjects {

  frontal: { active: boolean };
  side: { active: boolean };
  rear: { active: boolean };
  missile: { active: boolean };
  laser: { active: boolean };

}

interface enemyConfig extends genericConfig {
  enemyData: enemyData;
}

interface enemyData {
  health?: number;
  speed?: number;
  frame?: string | number;
  actions?: enemyActions;
  type?: string | number;
  texture?: string;
  sprite?: string;
  hasBonus?: boolean;
  hit?: number;
}
interface enemyActions {
  movement: enemyMovement;
}
interface enemyMovement {
  type: string;
  data?: any;

}

interface bulletConfig extends genericConfig {
  damage: number;
  health?: number;
  direction?: number;
  speed?: number;
}

interface triggerConfig extends genericConfig {
  triggerData: triggerData;
}

interface triggerData {
  activatedOn: string;
  type: string;
  data: any;
}

interface bonusConfig extends genericConfig {
  bonusData: bonusData;
}

interface bonusData {
  score: number;
  type: string;
}


interface ImageAsset {
  name: string;
  path: string;
}

interface VideoAsset {
  name: string;
  path: string;
}

interface ScriptAsset {
  key: string;
  path: string;
}

interface TileMapsAsset {
  key: string;
  path: string;
}

interface FontAsset {
  key: string;
}

interface SpritesheetsAsset {
  name: string;
  path: string;
  width: number;
  height: number;
  frames?: number;
  spacing?: number;
  margin?: number;
}

interface SoundAsset {
  name: string;
  paths: Array<string>;
}

interface AudioSpriteAsset {
  name: string;
  jsonpath: string;
  paths: Array<string>;
  instance: { instance: number };
}

interface BitmapfontAsset {
  name: string;
  imgpath: string;
  xmlpath: string;
}

interface AtlasAsset {
  key: string;
  imagepath: string;
  jsonpath: string;
}



