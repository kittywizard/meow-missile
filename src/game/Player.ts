import { Scene } from "phaser";

export class Player extends Phaser.GameObjects.Sprite {
    constructor(scene: Scene, x, y, name: string) {
        super(scene, x, y, name); //from sprite class 

        this.name = name;

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setScale(2);
        this.init();
    }

    init() {
        this.scene.anims.create({
            key: this.name,
            frames: this.scene.anims.generateFrameNumbers(this.name, { end: 1 }),
            frameRate: 10,
            repeat: -1
        });

    }
}
