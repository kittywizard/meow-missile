import { Scene } from 'phaser';

export class Splash extends Scene
{
    constructor (){
        super('Splash');
    }

    showInstructions() {
        this.add.text(450, 540, 'SPACE TO PLAY', {
            fontFamily: 'Arial', fontSize: 38, color: '#000',
            align: 'center'
        }).setOrigin(0.5).setDepth(100);
    }

    startGame() {
        this.input.keyboard?.on("keydown-SPACE",
            () => this.scene.start('Game'),
            this);
    }

    create() {
        this.showInstructions();
        this.startGame();
    }

}