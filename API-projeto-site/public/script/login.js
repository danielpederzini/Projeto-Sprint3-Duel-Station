function show_pwd_recovery() {
    div_login.style.display = `none`;
    div_recovery.style.display = `flex`;
}

function hide_pwd_recovery() {
    div_login.style.display = `flex`;
    div_recovery.style.display = `none`;
}

function teste() {
    window.location.replace(`./game.html`);
}