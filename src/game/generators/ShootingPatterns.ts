import { Hairball } from "../components/Hairball";

export default class shootingPatterns {
    shootingMethods: { hairball: any; catnip: any; fruit: any; };
    scene: any;
    name: string;

    constructor(scene: Phaser.Scene, name: string){
        this.scene = scene;
        this.name = name;
        this.shootingMethods = {
            hairball: this.single.bind(this),
            catnip: this.double.bind(this),
            fruit: this.tri.bind(this)
            //here too - types of shots
        }
        this.scene.playerShots =  playerShots;
    }

    shoot(x: number, y: number, powerUp: string = "hairball") {
        console.log(playerShots)
        this.shootingMethods[powerUp](x, y, powerUp);
    }

    //types of shots, add more later (update with powerups)
    single(x: number, y: number, powerUp: any) {
        this.scene.playerShots.add(new Hairball(this.scene, x, y, powerUp, this.name));
    }
 
    //duplicate for testing purposes, delete or change later
    double(x: number, y: number, powerUp: any) {
        //calling 'hairball' is the name of the sprite we want to use, not the power up
        this.scene.playerShots.add(new Hairball(this.scene, x, y, "hairball", this.name));
        this.scene.playerShots.add(new Hairball(this.scene, x, y, "hairball", this.name, -60));
    }

    tri() {

    }
}