import SceneEffect from "../components/SceneEffect";

export default class CharacterSelect extends Phaser.Scene {
    width: number;
    center_width: number;
    height: number;
    center_height: number;
    constructor() {
        super({key: "characterselect"});
    }

    showCharacters() {
        this.background = this.add.tileSprite(0, 0, this.width, this.height, "background").setOrigin(0).setScrollFactor(0, 1);

        this.add.bitmapText(this.center_width, this.center_height, 'minogram', 'character shit goes here', 80).setOrigin(0.5).setTintFill(0x000000);

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