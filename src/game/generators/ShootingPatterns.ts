import { Shot } from "../components/Shot";

export default class shootingPatterns {
    shootingMethods: { water: any; };
    scene: any;
    name: string;

    constructor(scene: Phaser.Scene,name: string){
        this.scene = scene;
        this.name = name;
        this.shootingMethods = {
            water: this.single.bind(this),
            //here too - types of shots
        };
    }

    shoot(x: number, y: number, powerUp: string) {
        this.shootingMethods[powerUp](x, y, powerUp);
    }

    //types of shots, add more later (update with powerups)
    single(x: number, y: number) {
        this.scene.shots.add(new Shot(this.scene, x, y, "water", this.name));
    }
}