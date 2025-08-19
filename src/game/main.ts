import { Game as MainGame } from './scenes/Game';
import { AUTO, Game, Types } from 'phaser';
import Boot from './scenes/Boot';
//import { Preloader } from './scenes/Preloader';
import Splash from './scenes/Splash';
import Transition from './scenes/Transition';

// Find out more information about the Game Config at:
// https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config: Types.Core.GameConfig = {
    type: AUTO,
    width: 900,
    height: 1080,
    parent: 'game-container',
    backgroundColor: '#fff',
    scale: {
        width: 1000,
        height: 900
    },
    render: {
        pixelArt: true
    },
    autoRound: false,
    physics: {
        default: 'arcade',
        arcade: { 
            debug: false, //pink boxes everywhere!
            gravity: {
                y: 0
            } 
        }
    },
    scene: [
        Boot, MainGame, Splash, Transition
    ]
};

const StartGame = (parent: string) => {
    return new Game({ ...config, parent });
}

export default StartGame;
