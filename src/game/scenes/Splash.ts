import { Scene } from 'phaser';

export class Splash extends Scene
{
    constructor (){
        super('Splash');
    }

    showInstructions() {
        this.add.image(0, 0, 'background').setOrigin(0,0);
        this.add.bitmapText(this.center_width, this.center_height, 'wendy', 'meow missile', 80).setOrigin(0.5).setDropShadow(3, 4, 0x222222, 0.7);

        this.add.bitmapText(this.center_width, 600, 'wendy', 'space to play', 60).setOrigin(0.5).setDropShadow(3, 4, 0x222222, 0.7);
    }

    startGame() {
        this.input.keyboard?.on("keydown-SPACE",
            () => this.scene.start('Game'),
            this);
    }

    create() {
        this.width = this.sys.game.config.width;
        this.height = this.sys.game.config.height;
        this.center_width = this.width / 2;
        this.center_height = this.height / 2;
        this.showInstructions();
        this.startGame();
    }

}