import config from './config.js';


/**
 * @return {string|null} fileExtension
 */
function getSupportedAudio() {


    let formats = {
        mp3: 'audio/mpeg',
        mp4: 'audio/mp4',
        wav: 'audio/wav',
    };

    for (let format in formats) {
        if (new Audio().canPlayType(formats[format]) === 'probably') {
            return format;
        }
    }

    return 'mp3';
}


export async function testAudio(path) {
    await play(path)
}


/**
 * @param {string} filepath - The path from the assets/audio folder without the file extension
 */
export async function play(filepath) {
    filepath = '/assets/audio/' + filepath + "." + getSupportedAudio();

    // console.log("playing: " + filepath)

    try {
        const audio = new Audio(filepath);
        audio.volume = config.volume
        await audio.play();
    } catch (error) {
        if (error.name === 'NotAllowedError') {
            alert('Please allow audio for a better user experience!');
        }
    }
}