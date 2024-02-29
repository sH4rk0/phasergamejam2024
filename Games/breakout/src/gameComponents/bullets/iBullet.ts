import { bulletDirection } from "../../GameData";

interface IBullet {
    update(time: number, delta: number): void;
    getDirection(): bulletDirection;
    setDirection(direction: bulletDirection): void;
    remove(): void;
}
export default IBullet;