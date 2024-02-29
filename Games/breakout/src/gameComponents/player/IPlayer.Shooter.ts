import IPlayer from "./IPlayer";


interface IPlayerShooter extends IPlayer {

    activateOrb(): void;
    deactivateOrb(): void;

    startFire(): void;
    stopFire(): void;
    stopVelocity(): void;


    fireBullet(): void;
    fireMissile(): void;
    fireLaser(): void;

    getBulletDamage(): number;
    getLaserDamage(): number;
    getMissileDamage(): number;

    getSpeed(): number;

    activateInvulnerability(): void;
    deactivateInvulnerability(): void;

    activateShield(): void;
    deactivateShield(): void;

    activateLaser(): void;
    deactivateLaser(): void;

    activateMissile(): void;
    deactivateMissile(): void;

    activateSideFire(): void;
    deactivateSideFire(): void;

    activateRearFire(): void;
    deactivateRearFire(): void;

    increaseDamage(amount: number): void;
    increaseSpeed(amount: number): void;
    increaseFireRate(amount: number): void;
}
export default IPlayerShooter;