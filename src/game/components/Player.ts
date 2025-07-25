import { Scene } from "phaser";
import shootingPatterns from "../generators/ShootingPatterns";
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

    
    constructor(scene: Scene, x: integer, y: integer, name: string = "player1") {
        super(scene, x, y, name); //from sprite class 

        this.name = name;
        this.id = Math.random();
        this.spawnShadow(x, y);
        this.shootingPatterns = new shootingPatterns(this.scene, this.name);

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

        // TO DO : add actual WASD keyboard controls
    }

    showPoints(score: any, color = 0xff0000) {
        let text = this.scene.add.bitmapText(
            this.x + 20, this.y - 30,
            "wendy", score, 20, 0xfffd37
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
        console.log("pew pew");

        //this.scene.playAudio("shot");
        this.shootingPatterns.shoot(this.x, this.y, "water");
    }

    spawnShadow (x: number,y: number) {
        this.shadow = this.scene.add.image(x + 20, y + 20, "player1")
        .setTint(0x000000)
        .setAlpha(0.4);
    }

    dead() {
        console.log("You have died.");
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
            frames: this.scene.anims.generateFrameNumbers(this.name, { start: 1, end: 1 }),
            frameRate: 10,
            repeat: -1
        });
        this.scene.anims.create({
            key: this.name + "left",
            frames: this.scene.anims.generateFrameNumbers(this.name, { start: 0, end: 0 }),
            frameRate: 10,
            repeat: -1
        });
       this.anims.play(this.name, true);
    }

    updateShadow() {
        this.shadow.x = this.x + 20;
        this.shadow.y = this.y + 20;
    }

    update() {
        if (this.death) return;    
            
        // // ARROW KEYS!!!! // //

        //left right on the x axis
        if(this.cursor?.left.isDown) {
            this.x -= 5; 
            this.anims.play(this.name + "left", true);
            this.shadow.setScale(0.5, 1);
        }
        else if(this.cursor?.right.isDown) {
            this.x += 5; 
            this.anims.play(this.name + "right", true);
            this.shadow.setScale(0.5, 1);
        }
        else {
            this.anims.play(this.name, true);
            this.shadow.setScale(1, 1);
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

        this.updateShadow();

    }
}
