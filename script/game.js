var deck_number = 'nodeck';

var stop_interval = false;

var card;
var enemy_card;

var card_name;
var enemy_card_name;

var card_attack;
var enemy_card_attack;

var player_lifepoints = 5000;
var enemy_lifepoints = 5000;

var round = 0;

var currency = Number(window.sessionStorage.getItem('currency'));

function load_currency() {
    document.getElementById('p_currency').innerHTML = `${currency.toFixed(2)}`;
}

function change_deck(selected_deck) {
    deck_number = selected_deck;

    var clicked_button = 'button' + deck_number;

    for (var i = 0; i <= 80; i += 20) {
        var i_button = 'button' + i;
        document.getElementById(i_button).style.opacity = `100%`;
    }
    
    document.getElementById(clicked_button).style.opacity = `30%`;
}

function start() {
    if (deck_number != 'nodeck') {

        div_options.style.display = `none`;
        div_board.style.display = `flex`;

        play();

        setInterval(function () {

            if (player_lifepoints > 0 && enemy_lifepoints > 0 && stop_interval == false) {
                play();
            }

            else if (stop_interval == false) {
                result()
                stop_interval = true;
            } 

        }, 2000)

    }

    else {
        alert('Selecione um Deck!');
    }

}

function play() {
    card = parseInt(Math.random() * 20 + 1) + deck_number;

    enemy_card = parseInt(Math.random() * 100 + 1);

    set_attack()
    set_name()

    img_card.src = `img/cards/${card}.png`;
    p_card_name.innerHTML = card_name;
    p_attack.innerHTML = card_attack;
    img_type.src = `img/types/type${deck_number}.png`;

    img_enemy_card.src = `img/cards/${enemy_card}.png`;
    p_enemy_card_name.innerHTML = enemy_card_name;
    p_enemy_attack.innerHTML = enemy_card_attack;

    if (enemy_card <= 20) {
        img_enemy_type.src = `img/types/type0.png`;
    }

    else if (enemy_card <= 40) {
        img_enemy_type.src = `img/types/type20.png`;
    }

    else if (enemy_card <= 60) {
        img_enemy_type.src = `img/types/type40.png`;
    }

    else if (enemy_card <= 80) {
        img_enemy_type.src = `img/types/type60.png`;
    }

    else {
        img_enemy_type.src = `img/types/type80.png`;
    }

    round++;

    span_round.innerHTML = round;

    var card_draw_audio = new Audio('audio/card_draw.mp3');
    card_draw_audio.play();

    setTimeout(function () {

        rotate();

        if (card_attack > enemy_card_attack) {
            enemy_lifepoints -= card_attack - enemy_card_attack;
        }
    
        else {
            player_lifepoints -= enemy_card_attack - card_attack;
        }

        span_player_lifepoints.innerHTML = player_lifepoints <= 0 ?
        '0' :
        player_lifepoints;

        span_enemy_lifepoints.innerHTML = enemy_lifepoints <= 0 ?
        '0' :
        enemy_lifepoints;

        setTimeout(function () {
            var attack_audio = new Audio('audio/attack.mp3');
            attack_audio.play();

            rotate_back();
        }, 200)

    }, 1000)

}

function set_attack() {

    var attacks = [
        '3000', '2400', '2400', '1950', '1200', '1700', '1300', '1600', '2300', '2900',
        '2700', '3000', '1400', '2500', '2100', '1800', '2100', '3000', '1400', '1600',
        '2500', '1400', '2000', '3000', '2400', '3000', '2250', '1040', '2340', '1390',
        '2500', '1400', '2000', '3000', '2400', '3000', '2250', '1040', '2340', '1390',
        '2500', '1400', '2000', '3000', '2400', '3000', '2250', '1040', '2340', '1390',
        '2500', '1400', '2000', '3000', '2400', '3000', '2250', '1040', '2340', '1390',
        '2500', '1400', '2000', '3000', '2400', '3000', '2250', '1040', '2340', '1390',
        '2500', '1400', '2000', '3000', '2400', '3000', '2250', '1040', '2340', '1390',
        '2500', '1400', '2000', '3000', '2400', '3000', '2250', '1040', '2340', '1390',
        '2500', '1400', '2000', '3000', '2400', '3000', '2250', '1040', '2340', '1390',
    ];

    card_attack = attacks[card - 1];

    enemy_card_attack = attacks[enemy_card - 1];
}

function set_name() {

    var names = [
        'Dragão Branco de Olhos Azuis',
        'Dragão Negro de Olhos Vermelhos',
        'Anjo Caído das Rosas',
        'Irmãs Harpia',
        'Águia Heráldica de Duas Cabeças',
        'Tempestade de Batalha',
        'A Atmosfera',
        'Wivern do Eclipse',
        'Celestia, Anja Luminosa',
        'Ulevo',
        'Dragão Caveira Negro',
        'Michael, o Arquiluminoso',
        'Pássaro Sônico',
        'Athena',
        'Vortex, o Redemoinho',
        'Dragão da Nevasca',
        'Chimera, a Besta Mítica Alada',
        'Devorador de Estrelas',
        'Anjo Resplandecente',
        'Birdface',
        'algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome',
        'algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome',
        'algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome',
        'algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome',
        'algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome',
        'algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome',
        'algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome',
        'algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome',
    ];

    card_name = names[card - 1];

    enemy_card_name = names[enemy_card - 1];
}

function rotate() {
    div_card.style.transitionDuration = "0.5s";
    div_enemy_card.style.transitionDuration = "0.5s";

    div_card.style.transform = 'rotate(40deg)';
    div_enemy_card.style.transform = 'rotate(-40deg)';
}

function rotate_back() {
    div_card.style.transform = 'rotate(0deg)';
    div_enemy_card.style.transform = 'rotate(0deg)';
}

function result() {
    div_board.style.display = `none`;
    div_result.style.display = `flex`;

    var player_win = enemy_lifepoints <= 0;

    var lifepoints_diff = player_win ?
    player_lifepoints :
    enemy_lifepoints;

    var new_currency = lifepoints_diff * 0.01;

    p_result.innerHTML = player_win ?
    `Parabéns! Você venceu <br> 
    após <b>${round}</b> rounds <br>
    com <b>${lifepoints_diff}</b> pontos de vida a mais.` :

    `Que pena! Você perdeu <br> 
    após <b>${round}</b> rounds <br>
    com <b>${lifepoints_diff}</b> pontos de vida a menos.`;

    div_new_currency.innerHTML = player_win ?
    `<p>+</p> <img src="img/coin.png"> <p>${new_currency.toFixed(2)}</p>` :
    `<p>-</p> <img src="img/coin.png"> <p>${new_currency.toFixed(2)}</p>`;

    player_win ?
    currency += new_currency :
    currency -= new_currency;

    if (currency < 0) {
        currency = 0;
    }

    p_currency.innerHTML = `${currency.toFixed(2)}`;

    window.sessionStorage.setItem('currency', currency)

    var result_audio = new Audio( player_win ?
        'audio/win.mp3' :
        'audio/lose.mp3');

    result_audio.play();
}

function reset() {
    document.location.reload();
}