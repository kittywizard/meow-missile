import { Shot } from "../components/Shot";
import { Hairball } from "../components/Hairball";

export default class shootingPatterns {
    shootingMethods: { hairball: any; };
    scene: any;
    name: string;

    constructor(scene: Phaser.Scene,name: string){
        this.scene = scene;
        this.name = name;
        this.shootingMethods = {
            hairball: this.single.bind(this),
            //here too - types of shots
        };
    }

    shoot(x: number, y: number, powerUp: string) {
        this.shootingMethods[powerUp](x, y, powerUp);
    }

    //types of shots, add more later (update with powerups)
    single(x: number, y: number) {
        this.scene.shots.add(new Hairball(this.scene, x, y, "hairball"));
    }
}