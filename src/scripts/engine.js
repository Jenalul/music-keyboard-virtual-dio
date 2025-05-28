const pianoKeys = document.querySelectorAll(".piano-keys .key");
const volumeSlider = document.querySelector("#volume");
const keysCheck = document.querySelector("#checked");
const mapedKeys = [];
let audio = new Audio();
const pressedKeys = new Set();

const playTune = (key) => {
    audio.src = `./src/tunes/${key}.wav`;
    audio.play();
    const clickedKey = document.querySelector(`[data-key="${key}"]`);
    clickedKey.classList.add("active");
    setTimeout(() => {
        clickedKey.classList.remove("active");
    }, 150);
};

pianoKeys.forEach((key) => {
    key.addEventListener("click", () => playTune(key.dataset.key));
    mapedKeys.push(key.dataset.key);
});

document.addEventListener("keydown", (e) => {
    if (mapedKeys.includes(e.key) && !pressedKeys.has(e.key)) {
        pressedKeys.add(e.key);
        playTune(e.key);
    }
});

document.addEventListener("keyup", (e) => {
    pressedKeys.delete(e.key);
});

const handleVolume = (e) => {
    audio.volume = e.target.value;
};

volumeSlider.addEventListener("input", handleVolume);

const showHideKeys = () => {
    pianoKeys.forEach((key) => key.classList.toggle("hide"));
};

keysCheck.addEventListener("click", showHideKeys);
