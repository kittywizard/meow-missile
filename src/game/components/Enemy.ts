import { Scene } from "phaser";

export class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene: Scene, x: integer, y: integer, name: string) {
        super(scene, x, y, name); //from sprite class 

        this.name = name;

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setScale(1);
        this.init();
    }

    init() {
        this.scene.anims.create({
            key: this.name,
            frames: this.scene.anims.generateFrameNumbers(this.name, { end: 0 }),
            frameRate: 10,
            repeat: 1
        });

        

    }
}
