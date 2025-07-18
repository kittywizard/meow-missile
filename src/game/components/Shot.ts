const TYPES = {
    water: {color: 0x005599, radius: 16, intensity: 0.4},
    enemy: {color: 0x00ff00, radius: 16, intensity: 0.4}
}

export class Shot extends Phaser.GameObjects.PointLight {
    playerName: string;
    constructor(scene: Phaser.Scene, x: number, y: number, type="water", playerName: string, velocityX = 0, velocityY = -500){
        const { color,  radius, intensity } = TYPES[type];

        super(scene, x, y, color, radius, intensity);

        this.name = "shot";
        this.playerName = playerName;
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.setAllowGravity(false);
        this.body.setVelocityX(velocityX);
        this.body.setVelocityY(velocityY);
        this.body.setCircle(10);
        this.body.setOffset(6, 9);
        this.body.setCollideWorldBounds(true);
        this.body.onWorldBounds = true;
        this.spawnShadow(x, y, velocityX, velocityY);
        this.init();
    } 
    spawnShadow(x: number, y: number, velocityX: number, velocityY: number) {
        throw new Error("Method not implemented.");
    }


    init() {
        this.scene.tweens.add({
            targets: this,
            duration: 200,
            intensity: {from: 0.3, to: 0.7},
            repeat: -1,
        });
    }
}