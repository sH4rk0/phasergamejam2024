
interface IEnemy {
    update(time: number, delta: number): void;
    updateDamage(damage: number): void;
    remove(): void;
    getStartingHealth(): number;
    getHealth(): number;
    actions(actions: enemyActions): void;
    getScore(): number;
    isIndistructible(): boolean;
    isDestroyed(): boolean;
    hasBonus(): boolean;
    changeDirection(): void;
    isBlocked(): Phaser.Types.Physics.Arcade.ArcadeBodyCollision
    isTouching(): Phaser.Types.Physics.Arcade.ArcadeBodyCollision
}
export default IEnemy;