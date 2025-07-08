import { Scene } from 'phaser';

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    init() {
        this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'background');
    }

    create() {
        this.scene.start('MainMenu');
    }
}