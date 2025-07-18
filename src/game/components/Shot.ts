export class Shot extends Phaser.GameObjects.PointLight {
    constructor(scene, x, y, type="water", playerName, velocityX = 0, velocityY = -500){

        super(scene, x, y, this.color, this.radius, intensity);
    } 
}