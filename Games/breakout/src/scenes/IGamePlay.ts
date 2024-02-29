
import Bonus from "../gameComponents/bonus/Bonus.Bricks";
import Bullet from "../gameComponents/bullets/Bullet";
import BulletBall from "../gameComponents/bullets/Bullet.Ball";
import Enemy from "../gameComponents/enemy/Enemy";


interface IGamePlay {

    init(data: { level: number }): void;
    create(): void;
    update(time: number, delta: number): void;
    getSfxVolume(): number;
    setSfxVolume(volume: number): void;

    checkBallsInPlay(bullet: BulletBall): void;
    getBonusBall(): void;
    getBonusLaser(): void;
    getBonusEnlarge(): void;
    getBonusScore(): void;
    levelCompleted(): void

    removeFromBulletGroup(bullet: Bullet): void;
    removeFromEnemyGroup(enemy: Enemy): void;
    removeFromBonusGroup(bonus: Bonus): void;


    addToBulletGroup(bullet: Bullet): void;
    addToEnemyGroup(enemy: Enemy): void;
    addToBonusGroup(bonus: Bonus): void;


    getEnemies(): Phaser.GameObjects.GameObject[]
    getPlayerPosition(): Phaser.Math.Vector2;

}
export default IGamePlay;