export class PowerUp extends Phaser.GameObjects.Sprite {
    power: string;
    id: number;
    shadow: Phaser.GameObjects.Image;
    direction: number;
    
    constructor(scene: Phaser.Scene, x: number, y: number, name = "catnip", power = "catnip") {
        super(scene, x, y, name);

        this.name = name;
        this.power = power;
        this.scene = scene;
        this.id = Math.random();
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.body.setCircle(19);
        this.body.setOffset(12, 12);
        this.body.setVelocityX(-100);
        this.init();
    }
    init() {
        this.scene.anims.create({
            key: this.name,
            frames: this.scene.anims.generateFrameNumbers(this.name),
            frameRate: 10,
            repeat: -1
        });

        this.scene.tweens.add({
            targets: [this],
            duration: 5000,
            x: {from: this.x, to: 0},
            y: {from: this.y - 10, to: this.y + 10},
            scale: {from: 0.8, to: 1},
            repeat: -1,
            yoyo: true
        });

        this.anims.play(this.name, true);
        this.body.setVelocityX(-100);
        this.direction = -1;

    }

    destroy() {
        super.destroy();
    }
}