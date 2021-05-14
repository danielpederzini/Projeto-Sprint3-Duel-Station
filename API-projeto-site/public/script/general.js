var music = new Audio('audio/music.mp3');

function play_music() {
    music.play();

    muted_music.style.display = `none`;
    playing_music.style.display = `block`;
}

function stop_music() {
    music.pause();

    muted_music.style.display = `block`;
    playing_music.style.display = `none`;
}