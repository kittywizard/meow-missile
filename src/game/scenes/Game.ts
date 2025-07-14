import { Scene } from 'phaser';
import { Player } from '../components/Player';
import { Enemy } from '../components/Enemy';

export class Game extends Scene
{
    background: Phaser.GameObjects.Image;
    score: number;
    player: any;
    enemy: any;

    constructor (){
        super('Game');
        this.score = 0;
        this.player = null;
        }

    create ()
    {
        this.add.image(0, 0, 'background').setOrigin(0,0);
        this.player = new Player(this, 600, 500, "tali");
        this.enemy = new Enemy(this, 400, 500, "enemy0"); //fix when real enemy arrives

        this.physics.add.collider(this.player, this.enemy);

        this.add.bitmapText(512, 400, 'wendy', 'Score?', 50);
    }

    update() {
        if (this.player) this.player.update();
    }
}
