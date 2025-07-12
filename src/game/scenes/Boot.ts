import { Scene } from 'phaser';

export class Boot extends Scene
{
    constructor () {
        super('Boot');
    }

    preload() {
        //preload some functions
        this.createBars();
        this.setLoadEvents();
        this.loadFonts();
        this.loadImages();
        this.setRegistry();
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
                this.scene.start("Splash")
            },this)
    }

    loadImages() {
        this.load.image('background', 'assets/background.png');
        this.load.spritesheet('tali', 
            'assets/tali_sheet.png', 
            { frameWidth: 50, frameHeight: 50 }
        );

        this.load.spritesheet('tali1', 
            'assets/tali_sheet.png', 
            { frameWidth: 50, frameHeight: 50 }
        );

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
        this.registry.set("score_player", 0);
        this.registry.set("power_player", "water");
        this.registry.set("lives_player", 0);
    }

}