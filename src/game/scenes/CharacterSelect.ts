import SceneEffect from "../components/SceneEffect";

export default class CharacterSelect extends Phaser.Scene {
    width: number;
    center_width: number;
    height: number;
    center_height: number;
    background: Phaser.GameObjects.TileSprite;

    constructor() {
        super({ key: "characterselect" });
    }

    showInformation() {
        this.background = this.add
            .tileSprite(0, 0, this.width, this.height, "background")
            .setOrigin(0)
            .setScrollFactor(0, 1);
        this.add
            .bitmapText(
                this.center_width,
                this.center_height - 200,
                "minogram",
                "Select a Character",
                50,
            )
            .setOrigin(0.5)
            .setTintFill(0x000000);
        this.add
            .bitmapText(
                this.center_width,
                this.center_height + 140,
                "minogram",
                "SPACE to start",
                30,
            )
            .setOrigin(0.5)
            .setTintFill(0x000000);

        this.add
            .bitmapText(
                this.center_width,
                this.center_height + 170,
                "minogram",
                "SPACE to hairball on all your owner's favorite furniture and accessories!",
                20,
            )
            .setOrigin(0.5)
            .setTintFill(0x000000);
        this.add
            .bitmapText(
                this.center_width,
                this.center_height + 190,
                "minogram",
                "arrow keys move you",
                20,
            )
            .setOrigin(0.5)
            .setTintFill(0x000000);
    }

    setActive(char: string){
        //check
        if(this.registry.get("player1_character") == "none"){
             this.registry.set("player1_character", char);
        }
        //set
        return;
        //return
    }

    showCharacters() {
        const tali = this.add
            .sprite(
                this.center_width - 75,
                this.center_height - 40,
                "tali-select",
            )
            .setInteractive();
        const kuroi = this.add
            .sprite(
                this.center_width + 75,
                this.center_height - 40,
                "kuroi-select",
            )
            .setInteractive();

        tali.on('pointerdown', function() {
            if(kuroi.frame.name !== "1" && tali.frame.name == "0") {
                tali.setFrame(1);
                console.log(tali.frame.name);
                this.setActive("tali");
            }
            else {
                tali.setFrame(0);
                this.setActive("none");
            }
        });
        kuroi.on('pointerdown', function() {
            if(tali.frame.name !== "1" && kuroi.frame.name == "0" ) {
                kuroi.setFrame(1);
                console.log(kuroi.frame.name);
                this.setActive("kuroi");
            }
            else {
                kuroi.setFrame(0);
                this.setActive("none");
            }
            //set active
            //check other status
        });

        //this seems to have the pointerdown be active constantly?
        // tali.emit('pointerdown');
        // kuroi.emit('pointerdown');

        // this.registry.set("player1_character", character);

    }

    startGame() {
        this.scene.start("transition", {
            next: "game",
            name: "STAGE",
            number: 1,
            time: 30,
        });
    }

    transitionToChange() {
        new SceneEffect(this).simpleClose(this.startGame.bind(this));
    }

    create() {
        this.width = parseInt(this.sys.game.config.width);
        this.height = parseInt(this.sys.game.config.height);
        this.center_width = this.width / 2;
        this.center_height = this.height / 2;
        this.showInformation();
        this.showCharacters();

        this.input.keyboard?.on(
            "keydown-SPACE",
            () => this.transitionToChange(),
            this,
        );
    }
}
