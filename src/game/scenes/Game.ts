import { Scene } from 'phaser';
import { Player } from '../Player';

export class Game extends Scene
{
    background: Phaser.GameObjects.Image;

    constructor (){
        super('Game');
        }

    create ()
    {
        this.add.image(0, 0, 'background').setOrigin(0,0);
        const player = new Player(this, 600, 500, "tali");
        const player2 = new Player(this, 800, 700, "cat");
        this.physics.add.collider(player, player2);
    

        // this.add.text(512, 490, 'this will be main game screen', {
        //     fontFamily: 'Arial Black', fontSize: 38, color: '#000',
        //     align: 'center'
        // }).setOrigin(0.5).setDepth(100);
        
    }
}
