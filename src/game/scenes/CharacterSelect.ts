import SceneEffect from "../components/SceneEffect";

export default class CharacterSelect extends Phaser.Scene {
    width: number;
    center_width: number;
    height: number;
    center_height: number;
    background: Phaser.GameObjects.TileSprite;
    
    constructor() {
        super({key: "characterselect"});
    }

    showCharacters() {
        this.background = this.add.tileSprite(0, 0, this.width, this.height, "background").setOrigin(0).setScrollFactor(0, 1);

        //TO DO
            // need to set a variable that will set sprite / character info. to start probably just swap sprites
            // will adding these to a group make it easier to code?
            // keyboard controls too
        const tali = this.add.sprite(this.center_width - 75, this.center_height - 40, 'tali-select').setInteractive();
        const kuroi = this.add.sprite(this.center_width + 75, this.center_height - 40, 'kuroi-select').setInteractive();

        
        let activeState: boolean = false;
        tali.on('pointerdown', () => {
            if(!activeState) {
                tali.setFrame(1);
                activeState = !activeState;
                this.registry.set("player1_character", "tali");
                //set a character variable
            } else {
                tali.setFrame(0);
                activeState = !activeState;
                this.registry.remove("player1_character");
                //unset variable
            }
        });

        kuroi.on('pointerdown', () => {
            if(!activeState) {
                kuroi.setFrame(1);
                activeState = !activeState;
                this.registry.set("player1_character", "kuroi");
                //set a character variable
            } else {
                kuroi.setFrame(0);
                activeState = !activeState;
                this.registry.remove("player1_character");
                //unset variable
            }
        });

        //repeat this for each character (or write a function to reduce repeat code)

        this.add.bitmapText(this.center_width, this.center_height - 200, 'minogram', 'Select a Character', 50).setOrigin(0.5).setTintFill(0x000000);
        this.add.bitmapText(this.center_width, this.center_height + 140, 'minogram', 'SPACE to start', 30).setOrigin(0.5).setTintFill(0x000000);

        this.add.bitmapText(this.center_width, this.center_height + 170, 'minogram', 'SPACE to hairball on all your owner\'s favorite furniture and accessories!', 20).setOrigin(0.5).setTintFill(0x000000);
        this.add.bitmapText(this.center_width, this.center_height + 190, 'minogram', 'arrow keys move you', 20).setOrigin(0.5).setTintFill(0x000000);

    }
    
    startGame() {
        this.scene.start('transition', {
            next: "game",
            name: "STAGE",
            number: 1,
            time: 30,
        });
    }

    transitionToChange() {
            new SceneEffect(this).simpleClose(this.startGame.bind(this));
        }

    create () {
        this.width = parseInt(this.sys.game.config.width);
        this.height = parseInt(this.sys.game.config.height);
        this.center_width = this.width / 2;
        this.center_height = this.height / 2;
        this.showCharacters();

        this.input.keyboard?.on("keydown-SPACE", () => this.transitionToChange(), this)

    }
}