import { Enemy } from "../components/Enemy";

export class EnemyGenerator {
    scene: any;
    waveFoes: never[];
    activeWave: boolean;
    waves: number;
    generateEvent1: any;
    generateEvent2: any;
    generateEvent3: any;
    generateEvent4: any;
    generationIntervalId: number | undefined;
    path: Phaser.Curves.Path;
    graphics: any;
    
    constructor(scene: any) {
        this.scene = scene;
        this.waveFoes = [];
        this.generate();
        this.activeWave = false;
        this.waves = 0;
    }

    generate() {
        //boss level
        if (this.scene.number === 4) {
            this.scene.time.delayedCall(2000, () => this.releaseBoss(), null, this);
        } else {
            //generating events per scene
            this.generateEvent1 = this.scene.time.addEvent({
                delay: 7000,
                callback: () => this.orderedWave(),
                callbackScope: this,
                loop: true,
            });
            this.generateEvent2 = this.scene.time.addEvent({
                delay: 15000,
                callback: this.wave(),
                callbackScope: this,
                loop: true,
            });
            if (this.scene.number > 1) {
                this.generateEvent3 = this.scene.time.addEvent({
                    delay: 3000,
                    callback: this.tank(),
                    callbackScope: this,
                    loop: true,
                });  
            }
            if(this.scene.number > 2){
                this.generateEvent4 = this.scene.time.addEvent({
                    delay: 5000,
                    callback: this.slider(),
                    callbackScope: this,
                    loop: true,
            });
            }
        }

        console.log(this.scene.number)
    }

    stop() {
        clearInterval(this.generationIntervalId);
        this.scene.enemyGroup.children.entries.forEach((enemy: { active: any; destroy: () => void; } | null) => {
            if (enemy === null || !enemy.active) return;
            enemy.destroy();
        });
    }

    finishScene() {
        this.generateEvent1.destroy();
        this.generateEvent2.destroy();
        if(this.scene.number > 1) this.generateEvent3.destroy();
        if(this.scene.number > 2) this.generateEvent4.destroy();
        this.scene.endScene();
    }

    //path that neemies follow when in formation
    createPath() {
        this.waves++;
        if(this.waves === 3) this.finishScene();

        const start = Phaser.Math.Between(100, 600);

        this.path = new Phaser.Curves.Path(start, 0);
        this.path.lineTo(start, Phaser.Math.Between(20, 50));

        let max = 8;
        let h = 500 / max;

        for (let i = 0; i < max; i++) {
            if(i % 2 === 0) {
                this.path.lineTo(start, 50 + h * (i + 1))
            } else {
                this.path.lineTo(start + 300, 50 + h * (i + 1))
            }
        }

        this.path.lineTo(start, this.scene.height + 50);
        this.graphics = this.scene.add.graphics();
        this.graphics.lineStyle(0, 0xffffff, 0); //debug only
    }

    //enemy wave in ordered formation
    orderedWave(difficulty = 5) {
        const x = Phaser.Math.Between(64, this.scene.width - 200);
        const y = Phaser.Math.Between(-100, 0);
        const minus = Phaser.Math.Between(-1, 1) > 0 ? 1 : -1;

        Array(difficulty).fill().forEach((_, i) => {
            this.addOrder(i, x, y, minus);
        });
    }

    //simple enemy wave
    wave(difficulty = 5) {
        this.createPath();

        const x = Phaser.Math.Between(64, this.scene.width - 200);
        const y = Phaser.Math.Between(-100, 0);
        const minus = Phaser.Math.Between(-1, 1) > 0 ? 1 : -1;

        Array(difficulty).fill().forEach((_, i) => this.addToWave(i));
        this.activeWave = true;
    }

    //enemy types
    tank() {
        this.scene.enemyGroup.add(
            new Enemy(this.scene, Phaser.Math.Between(100, 600), -100, "enemy2", 0, 620)
        );
    }

    slider() {
        throw new Error("Slider not implemented.");
    }

    releaseBoss() {
        throw new Error("Boss not implemented.");
    }

    //add new enemy in random position
    add() {
        const enemy = new Enemy(
            this.scene,
            Phaser.Math.Between(32, this.scene.width - 32),
            0
        );
        this.scene.enemyGroup.add(enemy);
    }

    //for the ordered wave enemies
    addOrder(i: number, x: number, y: number, minus: number) {
        const offset = minus * 70;

        this.scene.enemyGroup.add(
            new Enemy(this.scene, 
                x + i * 70, 
                i * y + offset, 
                "enemy0", 0, 300))
    }

    //add to a wave
    addToWave(i: number) {
        const enemy = new Enemy(
            this.scene,
            Phaser.Math.Between(32, this.scene.width - 32),
            0,
            "enemy0"
        );
        this.scene.tweens.add({
            targets: enemy,
            z: 1,
            ease: "Linear",
            duration: 12000,
            repeat: -1,
            delay: i * 100,
        })
        this;
        this.scene.enemyWaveGroup.add(enemy);
    }

    update() {
        if(this.path) {
            this.path.draw(this.graphics);

            this.scene.enemyWaveGroup.children.entries.forEach((enemy)=> {
                if(enemy === null || !enemy.active) return;

                let t = enemy.z;
                let vec = enemy.getData("vector");
                this.path.getPoint(t, vec);
                enemy.setPosition(vec.x, vec.y);
                enemy.shadow.setPosition(vec.x + 20, vec.y + 20);
                enemy.setDepth(enemy.y);
            });

            if(this.activeWave && this.checkIfWaveDestroyed()) {
                this.activeWave = false;
                this.scene.spawnShake();
                this.path.destroy();
            }
        }

        this.scene.enemyWaveGroup.children.entries.forEach((enemy: any) => {
            if (enemy === null || !enemy.active || enemy.y > this.scene.height +  100) {
                enemy.destroy();
            }
            enemy.update();
        });
    }

    checkIfWaveDestroyed() {
        const enemies = this.scene.enemyWaveGroup.children.entries;

        return enemies.length === enemies.filter((enemy: { active: any; }) => !enemy.active).length
    }
}