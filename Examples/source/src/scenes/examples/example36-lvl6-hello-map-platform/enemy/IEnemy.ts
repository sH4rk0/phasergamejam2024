interface IEnemy {
    create(): void;
    update(time: number, delta: number): void;
    changeDirection(): void;

}
export default IEnemy;
