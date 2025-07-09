import { Scene } from 'phaser';

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    init() {
        this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'background');
        this.add.image(100, 100, 'cat');
    }

    create() {
        this.scene.start('Game');
    }
}