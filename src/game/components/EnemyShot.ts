const TYPES = {
    enemy: {  color: 0xfff01f, radius: 16, intensity: 0.4},
    water: { color: 0x0000cc, radius: 16, intensity: 0.4}
}

export class EnemyShot extends Phaser.GameObjects.PointLight {

    playerName: any;
    shadow: GameObject;
    constructor(scene: Phaser.Scene, x: number, y: number, type="water", playerName: any, velocityX = 0, velocityY = 0)

    {
        const { color, radius, intensity } = TYPES[type];
        super(scene, x, y, color, radius, intensity);
        this.name = "enemyshot";
        this.scene = scene;
        this.playerName = playerName;
        this.spawnShadow(x, y, velocityX, velocityY);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // if (PLAYER IS BOSS) this.body.setVelocity(velocityX, velocityY);

        this.body.setAllowGravity(false);
        this.body.setCollideWorldBounds(true);
        this.body.onWorldBounds = true;
        this.body.setCircle(10);
        this.body.setOffset(6, 9);

        this.init();
    }

    init() {
        this.scene.tweens.add({
            targets: this,
            duration: 200,
            intensity: { from: 0.3, to: 0.7},
            repeat: -1,
        })
    }

    spawnShadow(x: number, y: number, velocityX: number, velocityY: number) {
        this.shadow = this.scene.add.circle(x + 20, y + 20, 10, 0x000000).setAlpha(0.4);
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
            radius: {},
            alpha: {},
            duration: 200,
            onComplete: () => {
                explosion.destroy();
            }
        });
    }

    showPoints(score: number, color = 0xff0000) {
        let text = this.scene.add.bitmapText(this.x + 20, this.y - 30, 'wendy', "+" + score, 40, color).setOrigin(0.5);
        this.scene.tweens.add({
            targets: text,
            duration: 800, 
            alpha: {from: 1, to:0},
            y: {from: this.y - 20, to: this.y - 80},
            onComplete: () => {
                text.destroy();
            },
        });
    }
}