import { Scene } from "phaser";
import Explosion from "./Explosion";
import { EnemyShot } from "./EnemyShot";

const TYPES = {
    enemy0: {points: 400, lives: 1},
    enemy1: {points: 600, lives: 3},
    enemy2: {points: 1000, lives: 2},
    enemy3: {points: 400, lives: 1},
    enemy4: {points: 400, lives: 1},
    enemy5: {points: 400, lives: 1},
    enemy6: {points: 400, lives: 1},
    boss: {points: 3000, lives: 4}
};

export class Enemy extends Phaser.GameObjects.Sprite {
    points: any;
    lives: any;
    id: number;
    patternIndex: number;
    pattern: number[];
    direction: number;

    constructor(scene: Scene, x: integer, y: integer, name: string = "enemy0", velocityX: number = 0, velocityY: number = 0) {
        super(scene, x, y, name); //from sprite class 

        this.name = name;
        this.points = TYPES[name].points;
        this.lives = TYPES[name].lives; 
        this.id = Math.random();
        
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.body.setSize(130, 65, true);
        this.body.setVelocityX(velocityX);
        this.body.setVelocityY(velocityY);
        this.setData("vector", new Phaser.Math.Vector2());
        if(this.name === "boss") {
            this.setBossShot();
        }
        this.init();
    }
    setBossShot() {
        this.patternIndex = 0;
        this.pattern = Phaser.Utils.Array.NumberArrayStep(-300, 300, 50);
        this.pattern = this.pattern.concat(
            Phaser.Utils.Array.NumberArrayStep(300, -300, 50)
        );

        this.scene.tweens.add({
            targets: this,
            duration: 2000,
            y: {from: this.y, to:  this.y + Phaser.Math.Between(100, -100) },
            x: {from: this.x, to: this.x + Phaser.Math.Between(100, -100) },
            yoyo: true,
            repeat: -1,
        });
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

    update () {
        //called from generator class

        if(this.y > this.scene.height + 64) {
            this.destroy();
        }
        
        if(this.name === "boss" && Phaser.Math.Between(1, 6) > 5) {
            //boss function
            console.log("boss pew pew");
        } else if (Phaser.Math.Between(1, 101) > 100) {
            if(!this.scene || !this.scene.player) return;

            //this.scene.playAudio("enemyshot");
            let shot = new EnemyShot(this.scene, this.x, this.y, "water", this.name);
            this.scene.enemyShots.add(shot);
            this.scene.physics.moveTo(shot, this.scene.player.x, this.scene.player.y, 300);
            this.scene.physics.moveTo(shot.shadow, this.scene.player.x, this.scene.player.y, 300);
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

        this.showPoints(this.points);

        this.scene.tweens.add({
            targets: explosion,
            radius: {from: 10, to: radius},
            alpha: {from: 1, to: 0.3},
            duration: 250,
            onComplete: () => {
                explosion.destroy();
            },
        });

        new Explosion(this.scene, this.x, this.y, explosionRadius);

        if(this.name === "boss") {
            this.scene.number  = 5;
            //this.scene.playAudio("explosion");
            this.scene.endScene();
        }
        this.destroy();
    }
    
    showPoints(score: string, color = 0xff0000) {
        let text = this.scene.add.bitmapText(this.x + 20, this.y - 30, "minogram", "+" + score, 40, color).setOrigin(0.5);

        this.scene.tweens.add({
            targets: text,
            duration: 800,
            alpha: {from: 1, to: 0},
            y: {from: this.y -20, to: this.y - 80},
            onComplete: () => { text.destroy() },
        });
    }
}
