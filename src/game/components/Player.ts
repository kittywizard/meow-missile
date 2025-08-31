import { Scene } from "phaser";
import shootingPatterns from "../generators/ShootingPatterns";
import { LightParticle } from "./LightParticle";
import Explosion from "./Explosion";
export class Player extends Phaser.GameObjects.Sprite {
    SPACE: Phaser.Input.Keyboard.Key | undefined;
    cursor: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
    W: Phaser.Input.Keyboard.Key | undefined;
    A: Phaser.Input.Keyboard.Key | undefined;
    S: Phaser.Input.Keyboard.Key | undefined;
    D: Phaser.Input.Keyboard.Key | undefined;
    death: any;
    id: number;
    shadow: Phaser.GameObjects.Image;
    shootingPatterns: shootingPatterns;
    power: number;
    blinking: boolean;
    powerUp: string;
    playerShots: any;
    nextShotTime: number;

    
    constructor(scene: Scene, x: integer, y: integer, name: string = "player1", powerUp: string = "hairball") {
        super(scene, x, y, name); //from sprite class 

        this.name = name;
        this.id = Math.random();
        this.powerUp = powerUp;
        this.nextShotTime = 0;

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.shootingPatterns = new shootingPatterns(this.scene, this.name);

        this.body.setAllowGravity(false);
        this.body.setCollideWorldBounds(true);
        this.body.setCircle(26);
        this.body.setOffset(6, 9);
        this.power = 0;
        this.blinking = false;
        this.init();
        this.setControls();

    }

    setControls() {
        this.SPACE = this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.SPACE?.setEmitOnRepeat(true); //allows for holding the key down and firing events
        this.cursor = this.scene.input.keyboard?.createCursorKeys();
        this.W = this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.A = this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.S = this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.D = this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        // TO DO : add actual WASD keyboard controls
    }

    showPoints(score: any, color = 0xff0000) {
        let text = this.scene.add.bitmapText(
            this.x + 20, this.y - 30,
            "minogram", score, 20, 0xfffd37
        ).setOrigin(0.5);

        this.scene.tweens.add({
            targets:text,
            duration: 2000,
            alpha: {from: 1, to: 0},
            y: {from: text.y - 10, to: text.y - 100},
        });
    }

    shoot() {
        //pew pew
        //this.scene.playAudio("shot");
        this.shootingPatterns.shoot(this.x, this.y, this.powerUp);
    }


    dead() {
        console.log("You have died.");

        const explosion = this.scene.add.circle(this.x, this.y, 10).setStrokeStyle(40, 0xffffff);
        this.scene.tweens.add({
            targets: explosion,
            radius: {from: 10, to: 512},
            alpha: {from: 1, to: 0.3},
            duration: 300,
            onComplete: () => explosion.destroy()
        });

        this.scene.cameras.main.shake(500);
        this.death = true;
        new Explosion(this.scene, this.x, this.y, 40);
        super.destroy();
    }

    init() {
        this.scene.anims.create({
            key: this.name,
            frames: this.scene.anims.generateFrameNumbers(this.name, { start: 0, end: 0 }),
            frameRate: 10,
            repeat: -1
        });
        this.scene.anims.create({
            key: this.name + "right",
            frames: this.scene.anims.generateFrameNumbers(this.name, { start: 2, end: 2 }),
            frameRate: 10,
            repeat: -1
        });
        this.scene.anims.create({
            key: this.name + "left",
            frames: this.scene.anims.generateFrameNumbers(this.name, { start: 0, end: 0 }),
            frameRate: 10,
            repeat: -1
        });
        this.scene.anims.create({
            key: this.name + "vomit",
            frames: this.scene.anims.generateFrameNumbers(this.name, { start: 1, end: 1 }),
            frameRate: 10,
            repeat: -1
        });
       this.anims.play(this.name, true);


    }

    update(timestep: any, delta: any) {
        if (this.death) return;    
            
        // // ARROW KEYS!!!! // //

        //left right on the x axis
        if(this.cursor?.left.isDown) {
            this.x -= 5; 
            this.anims.play(this.name + "left", true);
        }
        else if(this.cursor?.right.isDown) {
            this.x += 5; 
            this.anims.play(this.name + "right", true);
        }
        else {
            //this.anims.play(this.name, true);
            this.anims.play(this.name + "vomit", true); //fix later
        }

        //y axis, up and down
        if (this.cursor?.up.isDown) {
            this.y -= 5;
        }
        else if (this.cursor?.down.isDown) {
            this.y += 5;
        }

        //shoot the missiles!
       
        if (Phaser.Input.Keyboard.JustDown(this.SPACE)) {
            this.shoot();
        }
        //light particle stream - great if the cat is shitting itself or turns into a spaceship but unnecessary for now
        //this.scene.trailLayer.add(new LightParticle(this.scene, this.x, this.y, 0xffffff, 10));
    }

}
