var deck_number = 'nodeck';

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

    for (var i = 0; i <= 80; i += 20) {
        var i_button= `bt_deck${i}`;
        document.getElementById(`${i_button}`).style.opacity = `30%`;
    }

    deck_number = selected_deck;
    var clicked_button = `bt_deck${deck_number}`;
    
    document.getElementById(`${clicked_button}`).style.opacity = `100%`;
}

function start() {
    if (deck_number != 'nodeck') {

        div_options.style.display = `none`;
        div_board.style.display = `flex`;

        show_cards();
    }

    else {
        alert('Selecione um Deck!');
    }

}

function show_cards() {
    
    document.getElementById(`bt_ability${deck_number}`).style.display = `block`;

    if (deck_number == 0 && player_lifepoints <= 100) {
        bt_ability0.style.display = `none`;
    }

    if (deck_number == 40 && player_lifepoints <= 750) {
        bt_ability40.style.display = `none`;
    }

    bt_attack.style.display = `block`;

    var exodia = parseInt(Math.random() * 5 + 1) == 5 && deck_number == 60;

    exodia ?
    card = 101 :
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
}

function set_attack() {

    var attacks = [
        '3000', '2400', '2400', '1950', '1200', '1700', '1300', '1600', '2300', '2900',
        '2700', '3000', '1400', '2500', '2100', '1800', '2100', '3000', '1400', '1500',
        '1800', '1700', '1400', '2100', '2600', '3200', '2350', '3300', '1200', '1000',
        '1400', '2000', '2800', '1700', '2400', '1800', '2800', '1800', '2500', '2400',
        '3500', '3000', '2900', '3000', '2400', '3000', '2250', '1040', '2340', '1390',
        '2500', '1400', '2000', '3000', '2400', '3000', '2250', '1040', '2340', '1390',
        '2500', '1400', '2000', '3000', '2400', '3000', '2250', '1040', '2340', '1390',
        '2500', '1400', '2000', '3000', '2400', '3000', '2250', '1040', '2340', '1390',
        '2500', '1400', '2000', '3000', '2400', '3000', '2250', '1040', '2340', '1390',
        '2500', '1400', '2000', '3000', '2400', '3000', '2250', '1040', '2340', '1390',
        ''
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
        'Dragão Kabuki',
        'Ulevo',
        'Dragão Caveira Negro',
        'Michael, o Arquiluminoso',
        'Pássaro Sônico',
        'Dragão Pandêmico',
        'Vortex, o Redemoinho',
        'Dragão da Nevasca',
        'Chimera, a Besta Mítica Alada',
        'Devorador de Estrelas',
        'Dragão Mascarado',
        'Ranryu',
        'Kairyu-Shin',
        'Soldado Peixe-Lança',
        'Invasor Azul Perdido', 
        'Evigishki Merrowgeist', 
        'Levia-Dragão Daedalus',
        'Gishki Zielgigas', 
        'Baleia Cidadela', 
        'Leviathan, o Grande Protetor do Mar', 
        'Sirena Abisnereida',
        'Tubarão Águia',
        'Codarus',
        'Tubarão Pesadelo',
        'Molinglacia, o Lorde Elemental', 
        'Habitante do Abismo', 
        'Dragão Coral', 
        'Rei Barahstos, o Fundurador', 
        'Poseidra, o Dragão Atlântico', 
        'Caçador Aquático Armado', 
        'Mestra do Gelo', 
        'Paleozoico Anomalocaris', 
        'Tirano Condutor Final',
        'Soldado do Lustro Negro',
        '', 'algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome',
        'algum nome','algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome',
        'algum nome','algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome',
        'algum nome','algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome',
        'algum nome','algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome',
        'algum nome','algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome', 'algum nome',
        'Exodia, o Proibido'
    ];

    card_name = names[card - 1];

    enemy_card_name = names[enemy_card - 1];
}

function fly() {

    bt_ability0.style.display = `none`;

    player_lifepoints -= 100;

    var old_card = card;

    while (card == old_card) {
        card = parseInt(Math.random() * 20 + 1) + deck_number;
    }
    
    set_attack();
    set_name();

    span_player_lifepoints.innerHTML = player_lifepoints;

    img_card.src = `img/cards/${card}.png`;
    p_card_name.innerHTML = card_name;
    p_attack.innerHTML = card_attack;

    var wing_sound = new Audio('audio/wing.mp3');
    wing_sound.play();

}

function sea_healing() {

    bt_ability20.style.display = `none`;

    var life_bonus = parseInt(Math.random() * (1500 - 499) + 500);
    var attack_multiplier = Number(Math.random() * (0.75 - 0.50) + 0.50).toFixed(2);

    player_lifepoints = player_lifepoints + life_bonus;

    card_attack = Math.round(card_attack * attack_multiplier);

    span_player_lifepoints.innerHTML = player_lifepoints;
    p_attack.innerHTML = card_attack;

}

function earth_fury() {

    bt_ability40.style.display = `none`;

    var attack_multiplier = Number(Math.random() * (1.50 - 1.05) + 1.05).toFixed(2);

    player_lifepoints -= 750;
    card_attack = Math.round(card_attack * attack_multiplier);

    span_player_lifepoints.innerHTML = player_lifepoints;
    p_attack.innerHTML = card_attack;

    var magic_sound = new Audio('audio/magic.mp3');
    magic_sound.play();

}

function attack() {
    
    document.getElementById(`bt_ability${deck_number}`).style.display = `none`;
    bt_attack.style.display = `none`;

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

    setTimeout(function () {

        if (player_lifepoints <= 0 || enemy_lifepoints <= 0) {
            result();
        }
    
        else {
            show_cards();
        }

    }, 1000)

    
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