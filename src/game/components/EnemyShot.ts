const TYPES = {
    enemy: {  color: 0xd9614a, radius: 16, intensity: 0.7},
    water: { color: 0xff44aa, radius: 16, intensity: 0.8}
}

export class EnemyShot extends Phaser.GameObjects.PointLight {

    playerName: string;
    shadow: Phaser.GameObjects.Arc;

    constructor(scene: Phaser.Scene, x: number, y: number, type="water", playerName: any, velocityX = 0, velocityY = -300) {
        const { color, radius, intensity } = TYPES[type];

        super(scene, x, y, color, radius, intensity);

        this.name = "enemyshot";
        this.scene = scene;
        this.playerName = playerName;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        // if (PLAYER IS BOSS) this.body.setVelocity(velocityX, velocityY);
        
        this.body.setAllowGravity(false);
        this.body.setCircle(10);
        this.body.setOffset(6, 9);
        this.body.setCollideWorldBounds(true);
        this.body.onWorldBounds = true;
        this.spawnShadow(x, y, velocityX, velocityY);
        this.init();
    }


    spawnShadow(x: number, y: number, velocityX: number, velocityY: number) {
        this.shadow = this.scene.add.circle(x + 10, y + 10, 10,).setAlpha(0.2);
        this.scene.add.existing(this.shadow);
        this.scene.physics.add.existing(this.shadow);
        if (this.playerName === "boss") {
            this.shadow.body.setVelocity(velocityX, velocityY);
        }
    }

    shot() {
        const explosion = this.scene.add.circle(this.x, this.y, 5).setStrokeStyle(10, 0xffffff);
        this.showPoints(50);
        this.scene.tweens.add({
            targets: explosion,
            radius: {from: 5, to: 20},
            alpha: {from: 1, to: 0},
            duration: 250,
            onComplete: () => {
                explosion.destroy();
            }
        });
        this.destroy();
    }

    showPoints(score: number, color = 0xff0000) {
        let text = this.scene.add.bitmapText(this.x + 20, this.y - 30, 'minogram', "+" + score, 40, color).setOrigin(0.5);
        this.scene.tweens.add({
            targets: text,
            duration: 800, 
            alpha: {from: 1, to: 0},
            y: {from: this.y - 20, to: this.y - 80},
            onComplete: () => {
                text.destroy();
            },
        });
    }

    init() {
        this.scene.tweens.add({
            targets: this,
            duration: 200,
            intensity: { from: 0.3, to: 0.7},
            repeat: -1,
        })
    }
}