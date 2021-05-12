var home_music = new Audio('audio/home_music.mp3');

function play_music() {
    home_music.play();

    muted_music.style.display = `none`;
    playing_music.style.display = `block`;
}

function stop_music() {
    home_music.pause();

    muted_music.style.display = `block`;
    playing_music.style.display = `none`;
}