export class Hairball extends Phaser.GameObjects.Sprite {
    id: number;
    direction: number;
    constructor(scene: Phaser.Scene, x: number, y: number, name: string, velocityX = 0, velocityY = -500) {
        super(scene, x, y, name);

        this.name = name;
        this.id = Math.random();

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.body.setCircle(10);
        this.body.setOffset(12,12);
        this.body.setVelocityX(velocityX);
        this.body.setVelocityY(velocityY);
        this.body.setCollideWorldBounds(true);
        this.body.onWorldBounds = true;
        this.spawnShadow(x, y, velocityX, velocityY);

        this.init();
    }

    spawnShadow(x: number, y: number, velocityX: number, velocityY: number) {
        this.shadow = this.scene.add.circle(x + 20, y + 20, 10, 0x000000).setAlpha(0.4);
        this.scene.add.existing(this.shadow);
        this.scene.physics.add.existing(this.shadow);
        this.shadow.body.setVelocityX(velocityX);
        this.shadow.body.setVelocityY(velocityY);
    }

    init() {
        this.scene.anims.create({
            key: this.name,
            frames: this.scene.anims.generateFrameNumbers(this.name),
            frameRate: 10,
            repeat: -1
        });
        this.anims.play(this.name, true);
        this.direction = -1;

    }
}