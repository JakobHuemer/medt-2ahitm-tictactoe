import config from './config.js';
import Ui from './ui.js';
import { AppearancePage, EscapeMenuPage, HomePage, LocalGamePage, PostGamePage, SettingsPage } from './pages.js';


/**
 * @return {string|null} fileExtension
 */
function getSupportedAudio() {


    let formats = {
        mp3: 'audio/mpeg',
        wav: 'audio/wav',
        ogg: 'audio/ogg',
    };

    // for (let format in formats) {
    //     if (new Audio().canPlayType(formats[format]) === 'probably') {
    //         return format;
    //     }
    // }

    return 'mp3';
}


export async function testAudio(path) {
    await play(path);
}


/**
 * @param {string} filepath - The path from the assets/audio folder without the file extension
 * @param volumeOf
 * @param callback
 */
export async function play(filepath, volumeOf = 'volume', callback = () => {}) {

    filepath = '/assets/audio/' + filepath + '.' + getSupportedAudio();

    // console.log("playing: " + filepath)

    try {
        const audio = new Audio(filepath);
        audio.addEventListener("loadeddata", async () => {
            audio.volume = config[volumeOf];
            if (volumeOf === 'volume') {
                audio.playbackRate = config.tickSpeed / config.TICKS_PER_SECOND;
            } else {
                config.currentlyPlayingBackgroundMusic = audio;
            }
            await audio.play();
            audio.onended = callback;
        })
    } catch (error) {
        if (error.name === 'NotAllowedError' && !config.audioAlertBoxShown) {
            config.audioAlertBoxShown = true;
            alert('Please allow audio for a better user experience!');
        } else {
            console.log(error);
        }
        return null;
    }
}

export function createElementFromHTML(htmlString) {
    let div = document.createElement('div');
    div.innerHTML = htmlString.trim();

    // Change this to div.childNodes to support multiple top-level nodes.
    return div.firstChild;
}


export function loadUI(gm) {
    if (document.querySelector('.ui-wrapper'))
        document.querySelector('.ui-wrapper').remove();

    const UI = new Ui(gm);

    document.querySelector('.ui-loading-screen').style.visibility = 'visible';

    UI.addPage('homepage', new HomePage(UI));
    UI.addPage('settings', new SettingsPage(UI));
    UI.addPage('appearance', new AppearancePage(UI));
    // UI.addPage('escapemenu', new EscapeMenuPage(UI));
    UI.addPage('local', new LocalGamePage(UI));
    UI.showPage('homepage');


    const canvasElement = document.querySelector('.canvas');
    const bgTiles = document.querySelector('.bg-tiles');


    function onResize() {
        const boundings = canvasElement.getBoundingClientRect();
        const regularTileSize = boundings.width / 11;
        const xOffset = boundings.left % regularTileSize;
        const yOffset = boundings.top % regularTileSize;

        bgTiles.style.background = `url(/assets/img/${ config.backgroundBlock + config.blockFileExtension }) ${ xOffset }px ${ yOffset }px / ${ regularTileSize }px repeat`;

        UI.setBackground(config.backgroundBlock, regularTileSize, xOffset, yOffset);

    }

    addEventListener('resize', onResize);

    onResize();

    document.body.appendChild(UI.element);

    return UI;
}


export function preloadImages(imageArray, callback) {
    let loadedImages = 0;
    const totalImages = imageArray.length;

    const imageObjects = [];

    function imageLoaded() {
        loadedImages++;
        if (loadedImages === totalImages) {
            callback(imageObjects);
        }
    }

    for (let i = 0; i < totalImages; i++) {
        const img = new Image();
        img.onload = imageLoaded;
        img.src = imageArray[i];
        imageObjects.push(img);
    }
}