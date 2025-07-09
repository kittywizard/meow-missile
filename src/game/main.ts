import { Game as MainGame } from './scenes/Game';
import { AUTO, Game, Types } from 'phaser';
import { Boot } from './scenes/Boot';
//import { Preloader } from './scenes/Preloader';
import { Splash } from './scenes/Splash';

// Find out more information about the Game Config at:
// https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config: Types.Core.GameConfig = {
    type: AUTO,
    width: 900,
    height: 1080,
    parent: 'game-container',
    backgroundColor: '#fff',
    scale: {
        width: 900,
        height: 1080
    },
    physics: {
        default: 'arcade',
        arcade: { 
            debug: false,
            gravity: {
                y: 0,
                x: 0
            } 
        }
    },
    scene: [
        Boot, MainGame, Splash
    ]
};

const StartGame = (parent: string) => {
    return new Game({ ...config, parent });
}

export default StartGame;
