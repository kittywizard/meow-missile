class Explosion {
    radius: number;
    scene: any;
    x: number;
    y: number;
    lights: void[];

    constructor(scene: { lights: { addPointLight: (arg0: number, arg1: number, arg2: number, arg3: number, arg4: number) => any; }; }, x: number, y: number, radius = 5, min = 5, max = 7) {
        this.scene = scene;
        this.radius = radius;
        this.x = x;
        this.y = y;

        this.lights = Array(Phaser.Math.Between(min, max)).fill(0).map((_, i) => {
            const offsetX = this.x + Phaser.Math.Between(-this.radius / 2, this.radius / 2);
            const offsetY = this.y + Phaser.Math.Between(-this.radius / 2, this.radius / 2);

            const color = Phaser.Math.Between(0xff0000, 0xffffcc);
            const radius = Phaser.Math.Between(this.radius / 2, this.radius);
            const intensity = Phaser.Math.Between(0.3, 0.8);

            return scene.lights.addPointLight(
                offsetX,
                offsetY,
                color,
                radius,
                intensity
            );
        });
        this.init();
    }

    init() {
        this.scene.tweens.add({
            targets: this.lights,
            duration: Phaser.Math.Between(600, 1000),
            scale: {from: 1, to: 0},
        });
    }
}

export default Explosion;