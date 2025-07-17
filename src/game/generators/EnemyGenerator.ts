import { Enemy } from "../components/Enemy";

export class EnemyGenerator {
    scene: any;
    waveFoes: never[];
    activeWave: boolean;
    waves: number;
    
    constructor(scene: any) {
        this.scene = scene;
        this.waveFoes = [];
        this.generate();
        this.activeWave = false;
        this.waves = 0;
    }

    generate() {

    }

    stop() {

     }

    finishScene() {

     }

    createPath() {

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