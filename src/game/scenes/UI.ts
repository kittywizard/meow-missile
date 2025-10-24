import { Scene } from "phaser";

export default class UI extends Scene {
    width: number;
    height: number;
    center_width: number;
    center_height: number;
    scores: any;
    constructor() {
        super('ui-scene');
    }

    create() {
        this.width = this.sys.game.config.width;
        this.height = this.sys.game.config.height;
        this.center_width = this.width / 2;
        this.center_height = this.height / 2;
        this.add.tileSprite(0, 0, this.width, 50, "top").setOrigin(0).setDepth(4);

        this.scores["player1"]["scoreText"] = this.add.bitmapText(
            30,15, "minogram", 
            String(this.registry.get('player1_name') + " ") + String(this.registry.get("score_player1")).padStart(4, "0"), 30)
            .setOrigin(0).setScrollFactor(0).setTintFill(0x000000).setDepth(1000);
    }
}