export default class Transition extends Phaser.Scene {
    next: any;
    name: any;
    number: any;
    width: string | number;
    height: string | number;
    center_width: number;
    center_height: number;
    constructor() {
        super({key: "transition"});
    }

    init(data) {
        this.name = data.name;
        this.number = data.number;
        this.next = data.next;
    }       
    
    create() {
        const messages = [
            "loading screen",
            "don't die",
            "and other helpful tips"
        ];

        this.width = this.sys.game.config.width;
        this.height = this.sys.game.config.height;
        this.center_width = this.width / 2;
        this.center_height = this.height / 2;
        //this.sound.add("stageclear2").play();
        this.add.bitmapText(this.center_width, this.center_height - 50, "wendy", messages[this.number - 1], 100).setOrigin(0.5);

        this.add.bitmapText(this.center_width, this.center_height + 50, "wendy", "Ready Player 1", 80).setOrigin(0.5);
    }

    loadNext() {
        this.scene.start(this.next, {
            name: this.name,
            number: this.number,
            time: this.time,
        });
    }

    playMusic(theme = "music1"){
        //ADD MUSIC LATER

       /*
        this.theme = this.sound.add(theme);
        this.theme.play({
            mute: false,
            volume: 0.4,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0,
        });
        */
    }

}