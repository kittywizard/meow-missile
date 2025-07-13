import { Scene } from "phaser";

export class Player extends Phaser.GameObjects.Sprite {
    SPACE: Phaser.Input.Keyboard.Key | undefined;
    cursor: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
    W: Phaser.Input.Keyboard.Key | undefined;
    A: Phaser.Input.Keyboard.Key | undefined;
    S: Phaser.Input.Keyboard.Key | undefined;
    D: Phaser.Input.Keyboard.Key | undefined;

    
    constructor(scene: Scene, x: integer, y: integer, name: string) {
        super(scene, x, y, name); //from sprite class 

        this.name = name;

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setScale(1);
        this.setControls();
        this.init();
    }

    setControls() {
        this.SPACE = this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.cursor = this.scene.input.keyboard?.createCursorKeys();
        this.W = this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.A = this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.S = this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.D = this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

    init() {
        this.scene.anims.create({
            key: this.name,
            frames: this.scene.anims.generateFrameNumbers(this.name, { end: 0 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.play(this.name, true);

    }
}
