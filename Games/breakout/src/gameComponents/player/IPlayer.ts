

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

}
export default IPlayer;