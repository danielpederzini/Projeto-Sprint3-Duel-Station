var player_number = 'noplayer';
var deck_number = 'nodeck';

var card;
var enemy_card;

var card_name;
var enemy_card_name;

var card_attack;
var enemy_card_attack;

var player_lifepoints = 5000;
var enemy_lifepoints = 5000;
var last_whisper_match = false;

var round = 0;

var currency = Number(window.sessionStorage.getItem('currency'));

function load_currency() {
    document.getElementById('p_currency').innerHTML = `${currency.toFixed(2)}`;
}

function change_player(selected_player) {

    for (var i = 1; i <= 5; i ++) {
        var i_button= `bt_player${i}`;
        document.getElementById(`${i_button}`).style.opacity = `30%`;
    }

    player_number = selected_player;
    var clicked_button = `bt_player${player_number}`;
    
    document.getElementById(`${clicked_button}`).style.opacity = `100%`;
}

function next() {

    if (player_number != 'noplayer') {

        div_player_options.style.display = `none`;
        div_deck_options.style.display = `flex`;

    }

    else {
        alert('Selecione um Duelista!');
    }

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

        div_deck_options.style.display = `none`;
        div_board.style.display = `flex`;

        img_player.src = `img/players/player${player_number}.png`;

        show_cards();

        if (player_number == 1) {
            player_lifepoints += 500;
        }

        span_player_lifepoints.innerHTML = player_lifepoints;
    }

    else {
        alert('Selecione um Deck!');
    }

}

function show_cards() {
    
    if (deck_number != 80) {
        document.getElementById(`bt_ability${deck_number}`).style.display = `block`;
    }
    
        if ((deck_number == 0 && player_lifepoints <= 100) ||
            (deck_number == 40 && player_lifepoints <= 750) ||
            (last_whisper_match)) {
            document.getElementById(`bt_ability${deck_number}`).style.display = `none`;
        }

    bt_attack.style.display = `block`;

    span_round.innerHTML = ++ round;

    card = deck_number == 80 ?
    parseInt(Math.random() * 3 + 1) + deck_number :
    parseInt(Math.random() * 20 + 1) + deck_number;

    enemy_card = parseInt(Math.random() * 80 + 1);

    var awaken = parseInt(Math.random() * 100 + 1) == 100 && deck_number == 80;

        if (awaken) {
            card = 84;
        }

    set_attack();
    set_name();

    img_card.src = `img/cards/${card}.png`;
    p_card_name.innerHTML = card_name;

    p_attack.innerHTML = card == 84 ?
    `∞` : card_attack;

    img_type.src = `img/types/type${deck_number}.png`;

    img_enemy_card.src = `img/cards/${enemy_card}.png`;
    p_enemy_card_name.innerHTML = enemy_card_name;
    p_enemy_attack.innerHTML = enemy_card_attack;

        if (enemy_card % 20 == 0) {
            img_enemy_type.src = `img/types/type${enemy_card - 20}.png`;
        }

        else if (enemy_card <= 20) {
            img_enemy_type.src = `img/types/type0.png`;
        }

        else {

            for (var i = enemy_card; i % 20 != 0; i --) {
                img_enemy_type.src = `img/types/type${i - 1}.png`;
            }    

        }

    var card_draw_audio = new Audio('audio/card_draw.mp3');
    card_draw_audio.play();
}

function set_attack() {

    var attacks = [
        3000, 2400, 2400, 1950, 1200, 1700, 1300, 1600, 2300, 2900,
        2700, 3000, 1400, 2500, 2100, 1800, 2100, 3000, 1400, 1500,
        1800, 1700, 1400, 2100, 2600, 3200, 2350, 3300, 1200, 1000,
        1400, 2000, 2800, 1700, 2400, 1800, 2800, 1800, 2500, 2400,
        3500, 3000, 2800, 1500, 2100, 2600, 2000, 2200, 1400, 3000,
        1500, 1600, 1800, 1600, 2000, 2800, 3500, 1200, 1150, 1000,
        2500, 1400, 2900, 1800, 2400, 2500, 2000, 1800, 2800, 2800,
        2000, 1700, 1800, 2700, 2400, 2000, 2450, 1000, 1000, 2300,

        500 + round * 500, // Slifer, o Dragão Celeste
        1000 + Math.round(player_lifepoints * 0.05), // Obelisco, o Atormentador
        1000 + Math.round(enemy_lifepoints * 0.75), // O Dragão Alado de Rá

        100000 // Holakthy, o Criador da Luz
    ];

    card_attack = player_number == 4 ?
    Math.round(attacks[card - 1] * 1.05) :
    attacks[card - 1]

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
        'Dragão Caveira Negra',
        'Michael, O Arquiluminoso',
        'Pássaro Sônico',
        'Dragão Pandêmico',
        'Vortex, O Redemoinho',
        'Dragão da Nevasca',
        'Chimera, A Besta Mítica Alada',
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
        'Leviathan, O Grande Protetor do Mar', 
        'Sirena Abisnereida',
        'Tubarão Águia',
        'Codarus',
        'Tubarão Pesadelo',
        'Molinglacia, O Lorde Elemental', 
        'Habitante do Abismo', 
        'Dragão Coral', 
        'Rei Barahstos, O Fundurador', 
        'Poseidra, O Dragão Atlântico', 
        'Caçador Aquático Armado', 
        'Mestra do Gelo', 
        'Paleozoico Anomalocaris', 
        'Tirano Condutor Final',
        'Soldado do Lustro Negro',
        'Granmarg, O Mega Monarca', 
        'Balista do Mecanismo Antigo', 
        'Guerreiro Gravitacional', 
        'Cavaleiro Gaia, A Força da Terra',
        'Soldado Desgastado',
        'Valquíria Sigrun',
        'Soldado Canhão',
        'Golem do Mecanismo Antigo',
        'Guerreiro Karbonala',
        'Protótipo do Rei Máquina',
        'Postulado Pelo Cálice Mundial',
        'Cérbero, O Cavaleiro do Pesadelo',
        'Grenossauro',
        'Cão de Caça Mecânico',
        'Chimera Dinolutadora',
        'Guerreiro Torre',
        'Guardião de Metal',
        'Lenhador, Herói Elemental', 
        'Mago Sombrio',
        'Mago Ilusionista sem Rosto',
        'Paladino Sombrio',
        'Pumpking, O Rei dos Fantasmas',
        'Guerreiro de Ardosta',
        'Bram, O Cavaleiro Vampiro Carmesin',
        'Oráculo do Coveiro',
        'Gilgamesh, O Rei do Abismo',
        'Caius, O Mega Monarca',
        'Desespero do Escuro',
        'Arquidemônio Aniquilador',
        'Mago da Tragédia',
        'Alma Desencadeada da Raiva',
        'Alma Desencadeada do Desastre',
        'Alma Desencadeada da Angústia',
        'Maga Sombria',
        'Chakra',
        'Luvas dos Cavaleiros Fantasmas',
        'Aleister, O Invocador',
        'Freed, O General Sombrio',
        'Slifer, O Dragão Celeste',
        'Obelisco, O Atormentador',
        'O Dragão Alado de Rá',
        'Holakthy, O Criador da Luz'
    ];

    card_name = names[card - 1];

    enemy_card_name = names[enemy_card - 1];
}

function fly() {

    document.getElementById(`bt_ability${deck_number}`).style.display = `none`;

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

    document.getElementById(`bt_ability${deck_number}`).style.display = `none`;

    var life_bonus = parseInt(Math.random() * (1500 - 499) + 500);
    var attack_multiplier = (Math.random() * (0.75 - 0.25) + 0.25).toFixed(2);

    player_lifepoints = player_lifepoints + life_bonus;

    card_attack = Math.round(card_attack * attack_multiplier);

    span_player_lifepoints.innerHTML = player_lifepoints;
    p_attack.innerHTML = card_attack;

}

function earth_fury() {

    document.getElementById(`bt_ability${deck_number}`).style.display = `none`;

    var attack_multiplier = (Math.random() * (1.50 - 1.05) + 1.05).toFixed(2);

    player_lifepoints -= 750;
    card_attack = Math.round(card_attack * attack_multiplier);

    span_player_lifepoints.innerHTML = player_lifepoints;
    p_attack.innerHTML = card_attack;

    var magic_sound = new Audio('audio/magic.mp3');
    magic_sound.play();

}

function last_whisper() {

    last_whisper_match = true;

    player_lifepoints = 1;
    enemy_lifepoints = 200;

    span_player_lifepoints.innerHTML = player_lifepoints;
    span_enemy_lifepoints.innerHTML = enemy_lifepoints;

    var magic_sound = new Audio('audio/magic.mp3');
    magic_sound.play();

    show_cards(); 

}

function attack() {
    
    if (deck_number != 80) {
        document.getElementById(`bt_ability${deck_number}`).style.display = `none`;
    }
    
    bt_attack.style.display = `none`;

    rotate();

    var attack_difference = Math.abs(card_attack - enemy_card_attack)

    if (card_attack > enemy_card_attack) {

        enemy_lifepoints -= attack_difference;

        if (player_number == 5 && card != 84) {
            player_lifepoints += 
            Math.round(attack_difference * 0.10);
        }

    }

    else if (player_number == 2) {
        player_lifepoints -= 
        Math.round(attack_difference * 0.75);
    }

    else {
        player_lifepoints -= attack_difference;
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

        if (last_whisper_match && player_win) {
            new_currency = 10;
        }

        else if (last_whisper_match && player_win == false) {
            new_currency = 20;
        }

            if (player_number == 3) {
                new_currency = player_win ?
                    new_currency * 1.25 :
                    new_currency * 0.75;
            }

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