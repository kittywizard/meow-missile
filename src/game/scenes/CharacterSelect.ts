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
/*
        this.scene.anims.create({
            key: this.name,
            frames: this.scene.anims.generateFrameNumbers(this.name, { start: 0, end: 0 }),
            frameRate: 10,
            repeat: -1
        });
        this.scene.anims.create({
            key: this.name + "selected",
            frames: this.scene.anims.generateFrameNumbers(this.name, { start: 1, end: 1 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.play(this.name, true);
*/
        this.add.bitmapText(this.center_width, this.center_height + 100, 'minogram', 'Select a Character', 30).setOrigin(0.5).setTintFill(0x000000);
        this.add.bitmapText(this.center_width, this.center_height + 140, 'minogram', 'SPACE to start', 30).setOrigin(0.5).setTintFill(0x000000);

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