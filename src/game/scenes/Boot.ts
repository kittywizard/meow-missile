import { Scene } from 'phaser';

export default class Boot extends Scene
{
    loadBar: Phaser.GameObjects.Graphics;
    progressBar: Phaser.GameObjects.Graphics;

    constructor () {
        super({key: "boot"});
    }

    preload() {
        //preload some functions
        this.createBars();
        this.setLoadEvents();
        this.loadFonts();
        this.loadImages();
        this.setRegistry();
        this.loadAudios();
        this.loadSpriteSheets();
    }

    setLoadEvents() {
        // loading an event. progress = value increases when file is loaded
        //function, scope
        this.load.on(
            "progress",
             (value: any) => {
                this.progressBar.clear();
                this.progressBar.fillStyle(0x0088aa, 1);
                this.progressBar.fillRect(
                    this.cameras.main.width / 4,
                    this.cameras.main.height / 2 - 16,
                    (this.cameras.main.width / 2) * value,
                    16
                )
            }, this);

            this.load.on("complete", () => {
                this.scene.start("splash")
            },this)
    }

    loadImages() {
        this.load.image('background', 'assets/crazy-bg.png');
    }

    loadSpriteSheets() {
        this.load.spritesheet("player1", "assets/tali_spritesheet.png", {
            frameWidth: 64,
            frameHeight: 64,
        });
         this.load.spritesheet("enemy0", "assets/carpet.png", {
            frameWidth: 150,
            frameHeight: 150,
        });
        this.load.spritesheet("enemy1", "assets/images/foe1.png", {
            frameWidth: 64,
            frameHeight: 64,
        });
        this.load.spritesheet("enemy2", "assets/images/foe2.png", {
            frameWidth: 32,
            frameHeight: 32,
        });
    }

    loadAudios() {
        // this.load.audio("shot", "assets/sounds/shot.mp3");
        // this.load.audio("enemyshot", "assets/sounds/foeshot.mp3");
        // this.load.audio("enemydestroy", "assets/sounds/foedestroy.mp3");
        // this.load.audio("enemyexplosion", "assets/sounds/foexplosion.mp3");
        // this.load.audio("explosion", "assets/sounds/explosion.mp3");
        // this.load.audio("stageclear1", "assets/sounds/stageclear1.mp3");
        // this.load.audio("stageclear2", "assets/sounds/stageclear2.mp3");
        // this.load.audio("boss", "assets/sounds/boss.mp3");
        // this.load.audio("splash", "assets/sounds/splash.mp3");

        // Array(3).fill(0).forEach((_, i) =>{
        //     this.load.audio(`music${i + 1}`, `assets/sounds/music${i + 1}.mp3`);
        // });
        
    }

    loadFonts() {
        this.load.bitmapFont(
        "wendy",
        "assets/fonts/wendy.png",
        "assets/fonts/wendy.xml"
        );
    }

    createBars() {
        this.loadBar = this.add.graphics();
        this.loadBar.fillStyle(0xd40000, 1);
        this.loadBar.fillRect(
            this.cameras.main.width / 4 - 2,
            this.cameras.main.height / 2 - 18,
            this.cameras.main.width / 2 + 4,
            20
        );
        this.progressBar = this.add.graphics();
    }

    setRegistry() {
        this.registry.set("score_player1", 0);
        this.registry.set("power_player1", "water");
        this.registry.set("lives_player1", 0);

        //player 2 not really implemented
        this.registry.set("score_player2", 0);
        this.registry.set("power_player2", "water");
        this.registry.set("lives_player2", 0);
    }

}