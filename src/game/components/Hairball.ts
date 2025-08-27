export class Hairball extends Phaser.Physics.Arcade.Sprite {
    id: number;
    direction: number;
    playerName: string;
    shadow: Phaser.GameObjects.Arc;

    //name == type in shot example (i think)
    constructor(scene: Phaser.Scene, x: number, y: number, name: string, playerName: string = "player1", velocityX = 0, velocityY = -500) {
        super(scene, x, y, 'hairball');

        this.name = name;
        this.playerName = playerName;
        this.id = Math.random();

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.setActive(false);
        this.setVisible(false);

        this.init();
    }

    fire(x: number, y: number) {
        console.log(this)
        this.body?.reset(x, y);

        this.setActive(true);
        this.setVisible(true);

        this.setVelocityY(-300);
    }

    protected preUpdate(time: number, delta: number): void {
        super.preUpdate(time, delta);

        if(this.y <= -32) {
            this.setActive(false);
            this.setVisible(false);
        }
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