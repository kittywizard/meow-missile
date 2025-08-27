import { Hairball } from "../components/Hairball";

export class ShotGenerator {
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
       
            //generating events per scene
            this.generateEvent1 = this.scene.time.addEvent({
                delay: 7000,
                callback: () => this.orderedWave(),
                callbackScope: this,
                loop: true,
            });

        }


    stop() {
        clearInterval(this.generationIntervalId);
        this.scene.playerShots.children.entries.forEach((shot: { active: any; destroy: () => void; } | null) => {
            if (shot === null || !shot.active) return;
            shot.destroy();
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

    //shot wave in ordered formation
    orderedWave(difficulty = 5) {
        const x = Phaser.Math.Between(64, this.scene.width - 200);
        const y = Phaser.Math.Between(-100, 0);
        const minus = Phaser.Math.Between(-1, 1) > 0 ? 1 : -1;

        Array(difficulty).fill().forEach((_, i) => {
            this.addOrder(i, x, y, minus);
        });
    }

    //simple shot wave
    wave(difficulty = 5) {
        this.createPath();

        const x = Phaser.Math.Between(64, this.scene.width - 200);
        const y = Phaser.Math.Between(-100, 0);
        const minus = Phaser.Math.Between(-1, 1) > 0 ? 1 : -1;

        Array(difficulty).fill().forEach((_, i) => this.addToWave(i));
        this.activeWave = true;
    }

    //shot types
    tank() {
        this.scene.playerShots.add(
            new shot(this.scene, Phaser.Math.Between(100, 600), -100, "shot2", 0, 620)
        );
    }

    slider() {
        let velocity = -200;
        let x = 0;
        if (Phaser.Math.Between(-1, 1) > 0) {
            velocity = 200;
            x = -100;
        } else {
            x = this.scene.width + 100;
        }

        const shot = new shot(this.scene, x, Phaser.Math.Between(100, 600), "shot1", velocity, 0);

        this.scene.tweens.add({
            targets: [shot, shot.shadow],
            duration: 500,
            rotation: "+=5",
            repeat: -1,
        });
        this.scene.playerShots.add(shot);
    }

    releaseBoss() {
        throw new Error("Boss not implemented.");
    }

    //add new shot in random position
    add() {
        const shot = new shot(
            this.scene,
            Phaser.Math.Between(32, this.scene.width - 32),
            0
        );
        this.scene.playerShots.add(shot);
    }

    //for the ordered wave enemies
    addOrder(i: number, x: number, y: number, minus: number) {
        const offset = minus * 70;
    
        this.scene.playerShots.add(
            new shot(this.scene, 
                x + i * 70, 
                i * y + offset, 
                "shot0", 0, 300));
    }

    //add to a wave
    addToWave(i: number) {
        //shot name auto-generated> check example
        const shot = new shot(
            this.scene,
            Phaser.Math.Between(32, this.scene.width - 32),
            0,
            "shot0"
        );
        this.scene.tweens.add({
            targets: shot,
            z: 1,
            ease: "Linear",
            duration: 12000,
            repeat: -1,
            delay: i * 100,
        })
        this;
        this.scene.shotWaveGroup.add(shot);
    }

    update() {
        if(this.path) {
            this.path.draw(this.graphics);

            this.scene.shotWaveGroup.children.entries.forEach((shot)=> {
                if(shot === null || !shot.active) return;

                let t = shot.z;
                let vec = shot.getData("vector");
                this.path.getPoint(t, vec);
                shot.setPosition(vec.x, vec.y);
                shot.shadow.setPosition(vec.x + 20, vec.y + 20);
               // shot.setDepth(shot.y);
            });

            if(this.activeWave && this.checkIfWaveDestroyed()) {
                this.activeWave = false;
                this.scene.spawnShake();
                this.path.destroy();
            }
        }

        this.scene.playerShots.children.entries.forEach((shot: any) => {
            if (shot === null || !shot.active || shot.y > this.scene.height +  100) {
                shot.destroy();
            }
            shot.update();
        });
    }

    checkIfWaveDestroyed() {
        const enemies = this.scene.shotWaveGroup.children.entries;

        return enemies.length === enemies.filter((shot: { active: any; }) => !shot.active).length;
    }
}