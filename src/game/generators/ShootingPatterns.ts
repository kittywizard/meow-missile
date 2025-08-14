import { Shot } from "../components/Shot";
import { Hairball } from "../components/Hairball";

export default class shootingPatterns {
    shootingMethods: { hairball: any; water: any; fruit: any; };
    scene: any;
    name: string;

    constructor(scene: Phaser.Scene, name: string){
        this.scene = scene;
        this.name = name;
        this.shootingMethods = {
            hairball: this.single.bind(this),
            water: this.single2.bind(this),
            fruit: this.tri.bind(this)
            //here too - types of shots
        };
    }

    shoot(x: number, y: number, powerUp: string) {
        this.shootingMethods[powerUp](x, y, powerUp);
    }

    //types of shots, add more later (update with powerups)
    single(x: number, y: number) {
        this.scene.shots.add(new Hairball(this.scene, x, y, powerUp, this.name));
    }
 
    //duplicate for testing purposes, delete or change later
    single2(x: number, y: number) {
        this.scene.shots.add(new Hairball(this.scene, x, y, powerUp, this.name));
    }

    tri() {

    }
}