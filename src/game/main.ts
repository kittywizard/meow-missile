import { Game as MainGame } from './scenes/Game';
import { AUTO, Game, Types } from 'phaser';
import Boot from './scenes/Boot';
//import { Preloader } from './scenes/Preloader';
import Splash from './scenes/Splash';
import Transition from './scenes/Transition';
import CharacterSelect from './scenes/CharacterSelect';

// Find out more information about the Game Config at:
// https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config: Types.Core.GameConfig = {
    type: AUTO,
    width: 900,
    height: 1080,
    parent: 'game-container',
    backgroundColor: '#fff',
    scale: {
        width: 1200,
        height: 700
    },
    render: {
        pixelArt: true
    },
    autoRound: false,
    physics: {
        default: 'arcade',
        arcade: { 
            debug: true, //pink boxes everywhere!
            gravity: {
                y: 0
            } 
        }
    },
    scene: [
        Boot, MainGame, Splash, Transition, CharacterSelect
    ]
};

const StartGame = (parent: string) => {
    return new Game({ ...config, parent });
}

export default StartGame;
