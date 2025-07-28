import { Scene } from 'phaser';
import SceneEffect from '../components/SceneEffect';

export default class Splash extends Scene
{
    center_width: number;
    center_height: number;
    width:  number;
    height: number;
    theme: any;

    constructor (){
        super({key: "splash"});
    }

    showInstructions() {
        this.add.image(0, 0, 'background').setOrigin(0,0);
        this.add.bitmapText(this.center_width, this.center_height, 'wendy', 'meow missile', 80).setOrigin(0.5).setDropShadow(3, 4, 0x222222, 0.7);

        this.add.bitmapText(this.center_width, 600, 'wendy', 'space to play', 60).setOrigin(0.5).setDropShadow(3, 4, 0x222222, 0.7);
    }

    startGame() {
        if(this.theme) this.theme.stop();
        console.log("start game")
        
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

    create() {
        this.width = parseInt(this.sys.game.config.width);
        this.height = parseInt(this.sys.game.config.height);
        this.center_width = this.width / 2;
        this.center_height = this.height / 2;

        this.time.delayedCall(500, () => this.showInstructions(), null, this);
        this.input.keyboard?.on("keydown-SPACE", () => this.transitionToChange(), this)
    }

}