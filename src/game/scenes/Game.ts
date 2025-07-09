import { Scene } from 'phaser';

export class Game extends Scene
{
    background: Phaser.GameObjects.Image;

    constructor (){
        super('Game');
    }

    create ()
    {
        this.add.image(0, 0, 'background').setOrigin(0,0);
        this.add.image(500, 400, 'cat');

        this.add.text(512, 490, 'AAAAAAAH', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#000',
            align: 'center'
        }).setOrigin(0.5).setDepth(100);
        
    }
}
