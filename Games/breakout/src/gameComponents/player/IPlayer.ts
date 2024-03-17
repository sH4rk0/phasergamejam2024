

interface IPlayer {
    initPlayer(): void;
    update(time: number, delta: number): void;
    enterAnimation(): void;
    playAnimation(anim: string): void;
    activate(): void;
    deactivate(): void;
    enterLevel(): void;
    handleInput(): void;
    handleMobileInput(): void;
    handleKeyboardInput(): void;
    isBlocked(): Phaser.Types.Physics.Arcade.ArcadeBodyCollision
    isTouching(): Phaser.Types.Physics.Arcade.ArcadeBodyCollision

    activateInvulnerability(): void;
    deactivateInvulnerability(): void;
    setInvulerability(time: number): void;
    isInvulnerable(): boolean;

}
export default IPlayer;