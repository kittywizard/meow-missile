import { Scene } from "phaser";
import Explosion from "./Explosion";
import { EnemyShot } from "./EnemyShot";

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
    shadow: any;

    constructor(scene: Scene, x: integer, y: integer, name: string = "enemy0", velocityX: number = 0, velocityY: number = 0) {
        super(scene, x, y, name); //from sprite class 

        this.name = name;
        this.points = TYPES[name].points;
        this.lives = TYPES[name].lives; 
        this.id = Math.random();

        if(this.name !== "enemy2"){
            this.spawnShadow(x, y);
        }
        
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

        if(this.y > this.scene.height + 64) {
            if(this.name !== "enemy2") this.shadow.destroy();
            this.destroy();
        }
        
        if(this.name === "boss" && Phaser.Math.Between(1, 6) > 5) {
            //boss stuff
        } else if (Phaser.Math.Between(1, 101) > 100) {
            if(!this.scene || !this.scene.player) return;

            //this.scene.playAudio("enemyshot");
            let shot = new EnemyShot(this.scene, this.x, this.y, "enemy", this.name);
            this.scene.enemyShots.add(shot);
            this.scene.physics.moveTo(shot, this.scene.player.x, this.scene.player.y, 300);
            this.scene.physics.moveTo(shot.shadow, this.scene.player.x, this.scene.player.y, 300);

            if(this.name !== "enemy2") {
                this.updateShadow();
            }
        }
    }

    spawnShadow(x: number, y: number) {
        this.shadow = this.scene.add.image(x + 20, y + 20, this.name)
                        .setScale(0.7).setTint(0x000000).setAlpha(0.4);
    }

    updateShadow() {
        this.shadow.x = this.x + 20;
        this.shadow.y = this.y + 20;
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
