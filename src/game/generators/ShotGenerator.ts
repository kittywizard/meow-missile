import { Hairball } from "../components/Hairball";

// export class ShotGenerator {
//     scene: any;
//     waveFoes: never[];
//     activeWave: boolean;
//     waves: number;
//     generateEvent1: any;
//     generateEvent2: any;
//     generateEvent3: any;
//     generateEvent4: any;
//     generationIntervalId: number | undefined;
//     path: Phaser.Curves.Path;
//     graphics: any;
    
//     constructor(scene: any) {
//         this.scene = scene;

//     }


//     stop() {
//         this.scene.playerShots.children.entries.forEach((shot: { active: any; destroy: () => void; } | null) => {
//             if (shot === null || !shot.active) return;
//             shot.destroy();
//         });
//     }



//     //add new shot in random position
//     add() {
//         const shot = new Hairball(this.scene, 0, 0, "hairball");
//         this.scene.playerShots.add(shot);
//     }


//     update() {
//         if(this.path) {
//             this.path.draw(this.graphics);

//             this.scene.shotWaveGroup.children.entries.forEach((shot)=> {
//                 if(shot === null || !shot.active) return;

//                 let t = shot.z;
//                 let vec = shot.getData("vector");
//                 this.path.getPoint(t, vec);
//                 shot.setPosition(vec.x, vec.y);
//                 shot.shadow.setPosition(vec.x + 20, vec.y + 20);
//                // shot.setDepth(shot.y);
//             });

//         }

//         this.scene.playerShots.children.entries.forEach((shot: any) => {
//             if (shot === null || !shot.active || shot.y > this.scene.height +  100) {
//                 shot.destroy();
//             }
//             shot.update();
//         });
//     }
// }

export class Shots extends Phaser.Physics.Arcade.Group {
    constructor(scene: Phaser.Scene) {
        super(scene.physics.world, scene, { enable: false });
        
        this.createMultiple({
            frameQuantity: 5,
            key: 'hairball',
            active: false,
            visible: false,
            classType: Hairball,
            max: 5       
        });


    }
      
    fireShot(x: number, y: number) {
        //console.log(this.getFirstDead(false))
        //this.enemyShots.children.entries.forEach(shot => shot.shadow.destroy());

        //this is one hairball object at a time
        //const shot = this.getFirstDead(false);
        //const shot = this.get(x, y);  
        const shot = this.getFirstDead(false)   
        //console.log(shot2)
        if(shot) {
            shot.fire(x, y);
        }
    }
}