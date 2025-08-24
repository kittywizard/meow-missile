const TYPES = {}
export class Hairball extends Phaser.GameObjects.Sprite {
    id: number;
    direction: number;
    playerName: string;
    shadow: Phaser.GameObjects.Arc;

    //name == type in shot example (i think)
    constructor(scene: Phaser.Scene, x: number, y: number, name: string, playerName: string = "player1", velocityX = 0, velocityY = -500) {
        super(scene, x, y, name);

        this.name = name;
        this.playerName = playerName;
        this.id = Math.random();

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.body.setCircle(10);
        this.body.setOffset(6,9);
        this.body.setVelocityX(velocityX);
        this.body.setVelocityY(velocityY);
        this.body.setCollideWorldBounds(true);
        this.body.onWorldBounds = true;

        this.init();
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