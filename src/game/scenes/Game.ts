import { Scene } from 'phaser';
import { Player } from '../components/Player';
import { Enemy } from '../components/Enemy';
import { EnemyGenerator } from '../generators/EnemyGenerator';


export class Game extends Scene
{
    background: Phaser.GameObjects.Image;
    score: number;
    player: any;
    enemy: any;
    scoreText: string;
    name: any;
    number: any;
    next: any;
    duration: number;
    width: string | number;
    height: string | number;
    center_width: number;
    center_height: number;
    players: Phaser.GameObjects.Group;
    enemyGroup: Phaser.GameObjects.Group;
    enemyWaveGroup: Phaser.GameObjects.Group;
    enemyShots: any;
    enemies: EnemyGenerator;
    shotsLayer: Phaser.GameObjects.Layer;
    shots: Phaser.GameObjects.Group;
    lastDestroyedWaveEnemy: { x: any; y: any; };
    //crashEnemy: ArcadePhysicsCallback | undefined;

    constructor (){
        super('Game');
        this.score = 0;
        this.player = null;
        this.scoreText = "";
    }

    // data from previous scene (transition?)
    //not needed yet
    // init(data) {
    //     this.name = data.name;
    //     this.number = data.number;
    //     this.next = data.next;
    //    // this.currentPowerUp = +this.registry.get("currentPowerUp");

    // }

    create ()
    {
        this.duration = this.time * 1000;
        this.width = this.sys.game.config.width;
        this.height = this.sys.game.config.height;
        this.center_width = this.width / 2;
        this.center_height = this.height / 2;

        this.addPlayers();
        this.addEnemies();
        this.addColliders();
        this.addShots();

        this.add.image(0, 0, 'background').setOrigin(0,0);
    }

    //adding
    addPlayers() {
        this.add.trailLayer = this.add.layer();
        this.players = this.add.group();
        this.player = new Player(this, this.center_height, this.center_width);
        this.players.add(this.player);
    }

    addEnemies() {
        this.enemyGroup = this.add.group();
        this.enemyWaveGroup = this.add.group();
        this.enemyShots = this.add.group();
        this.enemies = new EnemyGenerator(this);
     }

     addShots() {
        this.shotsLayer = this.add.layer();
        this.shots = this.add.group();
     }

     //physics time!
     addColliders() {
        this.physics.add.collider(
            this.players,
            this.enemyGroup,
            this.crashEnemy,
            () => {return true},
            this
        );

        this.physics.add.collider(
            this.players,
            this.enemyWaveGroup,
            this.crashEnemy,
            () => {return true},
            this
        );

        this.physics.add.overlap(
            this.shots,
            this.enemyGroup,
            this.destroyEnemy,
            () => {return true},
            this
        );

    this.physics.add.overlap(
            this.shots,
            this.enemyWaveGroup,
            this.destroyWaveEnemy,
            () => {return true},
            this
        );

        // this.physics.add.collider(
        //     this.players,
        //     this.powerUps,
        //     this.pickPowerUps,
        //     () => {return true},
        //     this
        // );

    // this.physics.add.overlap(
    //         this.players,
    //         this.enemyShots,
    //         this.hitPlayer,
    //         () => {return true},
    //         this
    //     );

    // this.physics.add.collider(
    //         this.shots,
    //         this.enemyShots,
    //         this.destroyShot,
    //         () => {return true},
    //         this
    //     );

    this.physics.world.on("worldbounds", this.onWorldBounds);

     }

     //callbacks for the above colliders
     onWorldBounds(body: any, t: any) {
        const name = body.gameObject.name.toString();
        console.log(name)
        if(["enemyShot", "shot"].includes(name)){
            body.gameObject.shadow.destroy();
            body.gameObject.destroy();
        }
     }

    updateScore(playerName: any, arg1: number) {
        throw new Error('Method not implemented.');
    }

     destroyShot(shot, enemyShot) {
        const point = this.lights.addPointLight(shot.x, shot.y, 0xffffff, 10, 0.7);
        this.tweens.add({
            targets: point,
            duration: 400,
            scale: {from: 1, to: 0},
        });

        //this.playAudio("enemyexplosion");

        shot.shadow.destroy();
        shot.destroy();
        enemyShot.shadow.destroy();
        enemyShot.destroy();
        this.updateScore(shot.playerName, 50);
     }

     destroyWaveEnemy(shot: { x: number; y: number; playerName: any; destroy: () => void; }, enemy: { x?: any; y?: any; lives?: number; points?: number; dead?: () => void; }) {
        this.lastDestroyedWaveEnemy = {x: enemy.x, y: enemy.y};
        this.destroyEnemy(shot, enemy);
     }

     destroyEnemy(shot, enemy) {
        enemy.lives--;
        //this.playAudio("explosion");
        const point = this.lights.addPointLight(shot.x, shot.y, 0xffffff, 10, 0.7);

        this.tweens.add({
            targets: point,
            duration: 400,
            tint: {from: 0xffffff, to: 0xff0000},
        });

        this.tweens.add({
            targets: enemy,
            duration: 400,
            tint: { from: 0xffffff, to: 0xff0000},
        });

        this.updateScore(shot.playerName, 50);
        this.tweens.add({
            targets: enemy,
            y: "-=10",
            yoyo: true,
            duration: 100
        });

        shot.destroy();

        if(enemy.lives === 0) {
            const point = this.lights.addPointLight(shot.x, shot.y, 0xffffff,10, 0.70);

            this.tweens.add({
                targets: point,
                duration: 400,
                scale: {from: 1, to: 0},
            });

            this.updateScore(shot.playerName, enemy.points);
            enemy.dead();
        }

     }

     hitPlayer(player, shot) {
        if(player.blinking) return;

        this.players.remove(this.player);
        player.dead();
        //this.playAudio("explosion");
        shot.shadow.destroy();
        shot.destroy();
        this.time.delayedCall(1000, () => this.respawnPlayer(), null, this);
     }

     crashEnemy(player, enemy) {
        if(player.blinking) return;

        player.dead();
        //this.playAudio("explosion");
        enemy.dead();
        this.time.delayedCall(1000, () => this.respawnPlayer(), null, this);

     }

     //power ups not implemented yet
    //  pickPowerUp(player, powerUp) {

    //  }

     respawnPlayer() {
        this.player = new Player(this, this.center_width, this.center_height);
        this.player.blinking = true;
        this.players.add(this.player);
        this.tweens.add({
            targets: this.player,
            duration: 100,
            alpha: {from: 0, to: 1},
            repeat: 10,
            onComplete: () => {this.player.blinking = false}
        });
     }

    update() {
        if (this.player) this.player.update();
        this.enemies.update();
        //background movement 
        //this.background.tilePositionY -= 10;
    }
}
