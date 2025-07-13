import { Scene } from 'phaser';
import { Player } from '../components/Player';
import { Enemy } from '../components/Enemy';

export class Game extends Scene
{
    background: Phaser.GameObjects.Image;
    score: number;
    player: any;

    constructor (){
        super('Game');
        this.score = 0;
        this.player = null;
        }

    create ()
    {
        this.add.image(0, 0, 'background').setOrigin(0,0);
        this.player = new Player(this, 600, 500, "tali");
        const enemy1 = new Enemy(this, 400, 500, "tali1"); //fix when real enemy arrives
        this.physics.add.collider(this.player, enemy1);
        this.add.bitmapText(512, 400, 'wendy', 'test', 50);
    }

    update() {
        if (this.player) this.player.update();
    }
}
