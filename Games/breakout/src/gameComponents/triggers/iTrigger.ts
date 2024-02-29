interface ITrigger {
    create(): void;
    update(time: number, delta: number): void;
}
export default ITrigger;