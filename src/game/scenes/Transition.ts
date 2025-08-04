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

    init(data: { name: any; number: any; next: any; }) {
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

        this.background = this.add.tileSprite(0, 0, this.width, this.height, "background").setOrigin(0).setScrollFactor(0, 1);


        this.width = this.sys.game.config.width;
        this.height = this.sys.game.config.height;
        this.center_width = this.width / 2;
        this.center_height = this.height / 2;
        //this.sound.add("stageclear2").play();

        console.log(this.number)
        this.add.bitmapText(this.center_width, this.center_height - 50, "wendy", messages[this.number - 1], 100).setOrigin(0.5).setDropShadow(3, 4, 0x222222, 0.7);;

        this.add.bitmapText(this.center_width, this.center_height + 50, "wendy", "Ready Player 1", 80).setOrigin(0.5).setDropShadow(3, 4, 0x222222, 0.7);;
        this.time.delayedCall(2000, () => this.loadNext(), null, this);
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