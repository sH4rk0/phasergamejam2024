
interface IBonus {

    update(time: number, delta: number): void;
    getBonus(): void;
    isCollected(): boolean;


}
export default IBonus;