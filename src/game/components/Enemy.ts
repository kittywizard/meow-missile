import { Scene } from "phaser";

const TYPES = {
    enemy0: {points: 400, lives: 1},
    enemy1: {points: 600, lives: 3},
    enemy2: {points: 1000, lives: 2},
    boss: {points: 3000, lives: 4}
};

export class Enemy extends Phaser.GameObjects.Sprite {
    points: any;
    lives: any;
    id: number;

    constructor(scene: Scene, x: integer, y: integer, name: string = "enemy0", velocityX: number = 0, velocityY: number = 0) {
        super(scene, x, y, name); //from sprite class 

        this.name = name;
        this.points = TYPES[name].points;
        this.lives = TYPES[name].lives; 
        this.id = Math.random();
        
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.body.setVelocityX(velocityX);
        this.body.setVelocityY(velocityY);
        this.setData("vector", new Phaser.Math.Vector2());
        
        this.init();
    }

    init() {
        this.scene.anims.create({
            key: this.name,
            frames: this.scene.anims.generateFrameNumbers(this.name, { start: 1, end: 1 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.play(this.name, true);

    }

    update () {
        //called from generator class

        //unsure if this will be needed
        // if(this.y > this.scene.height + 64) {
        //     if(this.name !== "enemy2") this.shadow.destroy();
        // }

        if(this.name === "boss" && Phaser.Math.Between(1, 6) > 5) {
            //boss stuff
        } else if (Phaser.Math.Between(1, 101) > 100) {
            // ??
        }


    }

    dead() {
        let radius = 60;
        let explosionRadius = 20;

        if(this.name === "boss") {
            radius = 220;
            explosionRadius = 220;
            this.scene.cameras.main.shake(500);
        }

        const explosion = this.scene.add.circle(this.x, this.y, 5).setStrokeStyle(20, 0xffffff);

        //this.showPoints(this.points);

        this.scene.tweens.add({
            targets: explosion,
            radius: {from: 10, to: radius},
            alpha: {from: 1, to: 0.3},
            duration: 250,
            onComplete: () => {
                explosion.destroy();
            },
        });
    }
}
