import { Scene } from "phaser";
import shootingPatterns from "../generators/ShootingPatterns";
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
    character: string;

    //default player name is tied to sprite names, will need to change so 
    // player 1 is different from tali/kuroi/etc
    constructor(scene: Scene, x: integer, y: integer, name: string = "player1", character = "tali", powerUp: string = "hairball") {
        super(scene, x, y, name); //from sprite class 

        this.name = name;
        this.id = Math.random();
        this.character = character;
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

        this.W = this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.W).setEmitOnRepeat(true);
        this.A = this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.A).setEmitOnRepeat(true);
        this.S = this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.S).setEmitOnRepeat(true);
        this.D = this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.D).setEmitOnRepeat(true);
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
            key: this.character,
            frames: this.scene.anims.generateFrameNumbers(this.character, { start: 0, end: 0 }),
            frameRate: 10,
            repeat: -1
        });
        this.scene.anims.create({
            key: this.character + "right",
            frames: this.scene.anims.generateFrameNumbers(this.character, { start: 2, end: 2 }),
            frameRate: 10,
            repeat: -1
        });
        this.scene.anims.create({
            key: this.character + "left",
            frames: this.scene.anims.generateFrameNumbers(this.character, { start: 0, end: 0 }),
            frameRate: 10,
            repeat: -1
        });
        this.scene.anims.create({
            key: this.character + "vomit",
            frames: this.scene.anims.generateFrameNumbers(this.character, { start: 1, end: 1 }),
            frameRate: 10,
            repeat: -1
        });
        console.log(this.character)
       this.anims.play(this.character, true);
    }

    move(direction: string){
        switch (direction) {
            case "left":
                this.x -= 5;
                this.anims.play(this.character + direction, true);
                break;
            case "right":
                this.x += 5;
                this.anims.play(this.character + direction, true);
                break;
            case "up":
                this.y -= 5;
                this.anims.play(this.character + direction, true);
                break;
            case "down":
                this.y += 5;
                this.anims.play(this.character + direction, true);
                break;
            default:
                this.anims.play(this.character, true);
        }
    }

    update(timestep: any, delta: any) {
        if (this.death) return;    
            
        //WASD movement
        // this.scene.input.keyboard.on('keydown-A', () => this.move("left"));
        // this.scene.input.keyboard.on('keydown-D', () => this.move("right"));
        // this.scene.input.keyboard.on('keydown-W', () => this.move("up"));
        // this.scene.input.keyboard.on('keydown-S', () => this.move("down"));

        
        // // ARROW KEYS!!!! // //
        //left right on the x axis
        if(this.cursor?.left.isDown || Phaser.Input.Keyboard.JustDown(this.A)) {
            this.x -= 5; 
            this.anims.play(this.character + "left", true);
        }
        else if(this.cursor?.right.isDown || Phaser.Input.Keyboard.JustDown(this.D)) {
            this.x += 5; 
            this.anims.play(this.character + "right", true);
        }
        else {
            this.anims.play(this.character, true);
        }

        //y axis, up and down
        if (this.cursor?.up.isDown || Phaser.Input.Keyboard.JustDown(this.W)) {
            this.anims.play(this.character + "vomit", true); 
            this.y -= 5;
        }
        else if (this.cursor?.down.isDown || Phaser.Input.Keyboard.JustDown(this.S)) {
            this.anims.play(this.character + "vomit", true); 
            this.y += 5;
        }

        //shoot the missiles!
       
        if (Phaser.Input.Keyboard.JustDown(this.SPACE)) {
            this.shoot();
        }
    }

}
