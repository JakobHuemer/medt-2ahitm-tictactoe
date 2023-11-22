import config from './config.js';
import { loadUI, play, preloadImages } from './utils.js';
import { GameManager } from './gamemanager.js';

let soundTracks = [
    'MiceOnVenus',
    'Minecraft',
    'Minecraft',
    'SubwooferLullaby',
];

async function playBackgroundMusic() {
    let newSoundTrack = "soundtracks/SubwooferLullaby";
    play(newSoundTrack, "musicVolume", playBackgroundMusic)
}

playBackgroundMusic()


if (config.darkMode) {
    document.querySelector('.ui-loading-screen').classList.add('dark');
    document.querySelector('.ui-loading-screen .progress-bar').classList.add('dark');
}

const gameManager = new GameManager()
let UI = gameManager.ui;
