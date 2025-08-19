import { Scene } from 'phaser';
import { Player } from '../components/Player';
import { Enemy } from '../components/Enemy';
import { EnemyGenerator } from '../generators/EnemyGenerator';
import { PowerUp } from '../components/PowerUp';
import SceneEffect from '../components/SceneEffect';


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
    width:  number;
    height: number;
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
    scores: any;
    trailLayer: Phaser.GameObjects.Layer;
    currentPowerUp: number;
    powerUps: any;
    shake: PowerUp;
    available: string[];
    //crashEnemy: ArcadePhysicsCallback | undefined;

    constructor (){
        super({key: "game"});
        this.score = 0;
        this.player = null;
        this.scoreText = "";
    }

    // data from previous scene (transition?)
    //not needed yet
    init(data) {
        this.name = data.name;
        this.number = data.number;
        this.next = data.next;
        this.currentPowerUp = +this.registry.get("currentPowerUp");
    }

    create ()
    {
        this.duration = this.time * 1000;
        this.width = this.sys.game.config.width;
        this.height = this.sys.game.config.height;
        this.center_width = this.width / 2;
        this.center_height = this.height / 2;
        new SceneEffect(this).simpleOpen(() => 0);
        this.cameras.main.setBackgroundColor(0x333333);
        this.lights.enable();
        this.lights.setAmbientColor(0x666666);
        this.setBackground();
        this.addScores();
        this.addPlayers();
        this.addPowerUps();
        this.addEnemies();
        this.addShots();
        this.addColliders();
    }
    
    //tiled, scrolling background. larger pixel size
    setBackground() {
        this.background = this.add.tileSprite(0, 0, this.width, this.height, "background").setOrigin(0).setScrollFactor(0, 1);
    }
    
    //adding
    addPlayers() {
        this.trailLayer = this.add.layer();
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
        //this.shots = this.add.group();

        //setting max limit
       this.shots = this.physics.add.group({
        defaultKey: 'hairball', 
        maxSize: 10
       });
    }
    
    addPowerUps() {
        this.available = ["hairball", "hairball", "water"];
        this.powerUps = this.add.group();
    }
     addScores() {
        this.scores = {
            player1: {},
            player2: {}
        };

        this.scores["player1"]["scoreText"] = this.add.bitmapText(
            150, 16, "wendy", 
            String(this.registry.get("score_player1")).padStart(6, "0"), 50)
            .setOrigin(0.5).setScrollFactor(0).setDropShadow(3, 4, 0x222222, 0.7);
        // this.scores["player2"]["scoreText"] = this.add.bitmapText(
        //     this.width - 150, 16, "wendy", 
        //     String(this.registry.get("score_player2")).padStart(6, "0"), 50)
        //     .setOrigin(0.5).setScrollFactor(0);

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

        this.physics.add.collider(
            this.players,
            this.powerUps,
            this.pickPowerUps,
            () => {return true},
            this
        );

    this.physics.add.overlap(
            this.players,
            this.enemyShots,
            this.hitPlayer,
            () => {return true},
            this
        );

    this.physics.add.collider(
            this.shots,
            this.enemyShots,
            this.destroyShot,
            () => {return true},
            this
        );

     this.physics.world.on("worldbounds", this.onWorldBounds);

     }

    pickPowerUps(player: any, powerUp: { destroy: () => void; }) {
        //this.playAudio("stageclear1");
        this.updatePowerUp(player, powerUp);
        this.tweens.add({
            targets: player,
            duration: 200,
            alpha: {from: 0.5, to: 1},
            scale: {from: 1.4, to: 1},
            repeat: 3,
        });
        powerUp.destroy();
    }

    updatePowerUp(player: { powerUp: string; }, powerUp: { destroy: () => void; }) {
        player.powerUp = this.available[this.currentPowerUp];
        this.currentPowerUp = this.currentPowerUp + 1 === this.available.length
            ? this.currentPowerUp : this.currentPowerUp + 1;
        this.registry.set("currentPowerUp", this.currentPowerUp);
    }
    

     //callbacks for the above colliders
     onWorldBounds(body: any, t: any) {
        const name = body.gameObject.name.toString();

        if(["enemyshot", "shot", "hairball"].includes(name)){
            body.gameObject.shadow.destroy();
            body.gameObject.destroy();
        }
     }

    updateScore(playerName: string, points: number = 0) {
        const score = +this.registry.get("score_" + playerName) + points;
        this.registry.set("score_" + playerName, score);
        this.scores[playerName]["scoreText"].setText(String(score).padStart(6, "0"));

        this.tweens.add({
            targets: this.scores[playerName]["scoreText"], 
            duration: 200,
            tint: {from: 0x0000ff, to: 0xffffff},
            scale: {from: 1.2, to: 1},
            repeat: 2
        });

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

     destroyWaveEnemy(shot: any, enemy: any) {
        this.lastDestroyedWaveEnemy = {x: enemy.x, y: enemy.y}; //this is for power-ups
        this.destroyEnemy(shot, enemy);
     }


     destroyEnemy(shot: any, enemy: any) {
        enemy.lives--;
        //this.playAudio("explosion");
        const point = this.lights.addPointLight(shot.x, shot.y, 0xffffff, 10, 0.7);

        this.tweens.add({
            targets: point,
            duration: 400,
            scale: { from: 1, to: 0},
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
            //this.playAudio("foedestroy");
            const point = this.lights.addPointLight(shot.x, shot.y, 0xffffff,10, 0.7);

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

     //probably rename this as my power ups will be different item
     spawnShake() {
        const {x, y} = this.lastDestroyedWaveEnemy;
        this.shake = new PowerUp(this, x, y);
        this.powerUps.add(this.shake);
     }

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

     endScene() {
        this.enemyWaveGroup.children.entries.forEach(foe => foe.shadow.destroy());
        this.enemyGroup.children.entries.forEach((foe) => foe.shadow.destroy());
        this.shots.children.entries.forEach(shot => shot.shadow.destroy());
        this.enemyShots.children.entries.forEach(shot => shot.shadow.destroy());

        this.time.delayedCall(2000, () => this.finishScene(), null, this)
     }

     finishScene() {
        console.log("finish scene");
        this.game.sound.stopAll();
        this.scene.stop("game");
        const scene = this.number < 5 ? "transition" : "outro";

        this.scene.start(scene, {
            next: "game",
            name: "STAGE",
            number: this.number + 1
        })
     }

    update() {
        if (this.player) this.player.update();
        this.enemies.update();
        //background movement 
        this.background.tilePositionY -= 10;
    }
}
