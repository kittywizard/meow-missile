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
        this.graphics.lineStyle(0. 0xffffff, 0); //debug
    }

    orderedWave() {

    }

    wave() {

    }
    //enemy types
    tank() {

    }

    slider() {

    }

    releaseBoss() {
        throw new Error("Method not implemented.");
    }

    add() {

    }

    addOrder() {

    }

    addToWave() {

    }

    update() {

    }

    checkIfWaveDestroyed() {
        
    }
}