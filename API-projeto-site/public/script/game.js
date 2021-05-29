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

function change_player(selected_player) {

    for (var i = 1; i <= 5; i ++) {
        var i_button= `bt_player${i + 1000}`;
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

    for (var i = 1; i <= 5; i ++) {
        var i_button= `bt_deck${i + 1000}`;
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

        img_player.src = `img/players/player${player_number - 1000}.png`;

        show_cards();

        if (player_number == 1001) {
            player_lifepoints += 200;
        }

        span_player_lifepoints.innerHTML = player_lifepoints;
    }

    else {
        alert('Selecione um Deck!');
    }

}

function show_cards() {
    
    if (deck_number != 1005) {
        document.getElementById(`bt_ability${deck_number}`).style.display = `block`;
    }
    
        if ((deck_number == 1001 && player_lifepoints <= 100) ||
            (deck_number == 1003 && player_lifepoints <= 750) ||
            (last_whisper_match)) {
            document.getElementById(`bt_ability${deck_number}`).style.display = `none`;
        }

    bt_attack.style.display = `block`;

    span_round.innerHTML = ++ round;

    card = deck_number == 1005 ?
    parseInt(Math.random() * 3 + 1) + (deck_number - 1000) * 20 - 20:
    parseInt(Math.random() * 20 + 1) + (deck_number - 1000) * 20 - 20;

    enemy_card = parseInt(Math.random() * 80 + 1);

    var awakening = parseInt(Math.random() * 50 + 1) == 50 && deck_number == 1005;

        if (awakening) {
            card = 84;

            var awakening_sound = new Audio('audio/deck80.mp3');
            awakening_sound.play();
        }

    set_attack();
    set_name();

    img_card.src = `img/cards/${card}.png`;
    p_card_name.innerHTML = card_name;

    p_attack.innerHTML = card == 84 ?
    `∞` : card_attack;

    img_type.src = `img/types/type${(deck_number - 1000) * 20 - 20}.png`;

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

    var card_attacks = [
        3000, 2400, 2400, 1950, 1200, 1700, 1300, 1600, 2300, 2900,
        2700, 3000, 1400, 2500, 2100, 1800, 2100, 3000, 1400, 1500,
        1800, 1700, 1400, 2100, 2600, 3200, 2350, 3300, 1200, 1000,
        1400, 2000, 2800, 1700, 2400, 1800, 2800, 1800, 2500, 2400,
        3500, 3000, 2800, 1500, 2100, 2600, 2000, 2200, 1400, 3000,
        1500, 1600, 1800, 1600, 2000, 2800, 3500, 1200, 1150, 1000,
        2500, 1400, 2900, 1800, 2400, 2500, 2000, 1800, 2800, 2800,
        2000, 1700, 1800, 2700, 2400, 2000, 2450, 1000, 1000, 2300,

        0 + round * 500, // Slifer, The Sky Dragon
        1500 + Math.round(player_lifepoints * 0.20), // Obelisk, The Tormentor
        0 + Math.round(enemy_lifepoints * 0.75), // The Winged Dragon of Rá

        99999999999 // Holakthy, The Creator of Light
    ];

    card_attack = player_number == 1004 ?
    Math.round(card_attacks[card - 1] * 1.05) :
    card_attacks[card - 1]

    enemy_card_attack = card_attacks[enemy_card - 1];
}

function set_name() {

    var card_names = [
        "Blue Eyes White Dragon",
        "Red Eyes Black Dragon",
        "Fallen Angel of Roses",
        "Harpie Lady Sisters",
        "Heraldic Twin Headed Eagle",
        "Battlestorm",
        "The Atmosphere",
        "Eclipse Wyvern",
        "Kabuki Dragon",
        "Ulevo",
        "Black Skull Dragon",
        "Michael, The Arch-Lightsworn",
        "Sonic Bird",
        "Pandemic Dragon",
        "Vortex, The Whirlwind",
        "Blizzard Dragon",
        "Chimera, The Flying Mythical Beast",
        "Star Eater",
        "Masked Dragon",
        "Ranryu",
        "Kairyu-Shin",
        "Swordfish Soldier",
        "Lost Blue Breaker", 
        "Evigishki Merrowgeist", 
        "Levia-Dragon Daedalus",
        "Gishki Zielgigas", 
        "Citadel Whale", 
        "Leviathan, The Great Sea Protector", 
        "Mermail Abyssnerei",
        "Eagle Shark",
        "Codarus",
        "Nightmare Shark",
        "Moulinglacia, The Elemental Lord", 
        "Abyss Dweller", 
        "Coral Dragon", 
        "True King Barahstos, The Fathomer", 
        "Poseidra, The Atlantean Dragon", 
        "Armed Sea Hunter", 
        "Ice Master", 
        "Paleozoic Anomalocaris", 
        "Ultimate Conductor Tyranno",
        "Black Luster Soldier",
        "Granmarg, The Mega Monarch", 
        "Ancient Gear Ballista", 
        "Gravity Warrior", 
        "Gaia Knight, The Force of Earth",
        "Weathering Soldier",
        "Valkyrie Sigrun",
        "Cannon Soldier",
        "Ancient Gear Golem",
        "Karbonala Warrior",
        "Machine King Prototype",
        "Beckoned by The World Chalice",
        "Knightmare Cerberus",
        "Grenosaurus",
        "Mechanical Hound",
        "Dinowrestler Chimera",
        "Turret Warrior",
        "Metal Guardian",
        "Elemental Hero Woodsman", 
        "Dark Magician",
        "Illusionist Faceless Mage",
        "Dark Paladin",
        "Pumpking, The King of Ghosts",
        "Slate Warrior",
        "Bram, The Vampire Elderitter",
        "Gravekeeper's Oracle",
        "Abyss King Gilgamesh",
        "Caius, The Mega Monarch",
        "Despair From The Dark",
        "Annihilator Archfiend",
        "Disgraced Mage",
        "Unchained Soul of Anger",
        "Unchained Soul of Disaster",
        "Unchained Soul of Anguish",
        "Dark Magician Girl",
        "Chakra",
        "The Phantom Knights of Ragged Gloves",
        "Aleister, The Invoker",
        "Dark General Freed",
        "Slifer, The Sky Dragon",
        "Obelisk, The Tormentor",
        "The Winged Dragon of Ra",
        "Holakthy, The Creator of Ligth"
    ];

    card_name = card_names[card - 1];

    enemy_card_name = card_names[enemy_card - 1];
}

function fly() {

    document.getElementById(`bt_ability${deck_number}`).style.display = `none`;

    player_lifepoints -= 200;

    var old_card = card;

    while (card == old_card) {
        card = parseInt(Math.random() * 20 + 1) + (deck_number - 1000) * 20 - 20;
    }
    
    set_attack();
    set_name();

    span_player_lifepoints.innerHTML = player_lifepoints;

    img_card.src = `img/cards/${card}.png`;
    p_card_name.innerHTML = card_name;
    p_attack.innerHTML = card_attack;

    var wing_sound = new Audio('audio/deck0.mp3');
    wing_sound.play();

}

function sea_healing() {

    document.getElementById(`bt_ability${deck_number}`).style.display = `none`;

    var life_bonus = parseInt(Math.random() * (750 - 499) + 500);
    var attack_multiplier = (Math.random() * (0.75 - 0.25) + 0.25).toFixed(2);

    player_lifepoints = player_lifepoints + life_bonus;

    card_attack = Math.round(card_attack * attack_multiplier);

    span_player_lifepoints.innerHTML = player_lifepoints;
    p_attack.innerHTML = card_attack;

    var sea_healing_sound = new Audio('audio/deck20.mp3');
    sea_healing_sound.play();

}

function earth_fury() {

    document.getElementById(`bt_ability${deck_number}`).style.display = `none`;

    var attack_multiplier = (Math.random() * (1.50 - 1.05) + 1.05).toFixed(2);

    player_lifepoints -= 750;
    card_attack = Math.round(card_attack * attack_multiplier);

    span_player_lifepoints.innerHTML = player_lifepoints;
    p_attack.innerHTML = card_attack;

    var earth_fury_sound = new Audio('audio/deck40.mp3');
    earth_fury_sound.play();

}

function last_whisper() {

    last_whisper_match = true;

    player_lifepoints = 1;
    enemy_lifepoints = 200;

    span_player_lifepoints.innerHTML = player_lifepoints;
    span_enemy_lifepoints.innerHTML = enemy_lifepoints;

    show_cards(); 

    var last_whisper_sound = new Audio('audio/deck60.mp3');
    last_whisper_sound.play();

}

function attack() {
    
    if (deck_number != 1005) {
        document.getElementById(`bt_ability${deck_number}`).style.display = `none`;
    }
    
    bt_attack.style.display = `none`;

    rotate();

    var attack_difference = Math.abs(card_attack - enemy_card_attack)

    if (card_attack > enemy_card_attack) {

        enemy_lifepoints -= attack_difference;

        if (player_number == 1005 && card != 84) {
            player_lifepoints += 
            Math.round(attack_difference * 0.10);
        }

    }

    else if (player_number == 1002) {
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
            new_currency = lifepoints_diff * 10.00;
        }

        else if (last_whisper_match && player_win == false) {
            new_currency = lifepoints_diff * 0.10;
        }

            if (player_number == 1003) {
                new_currency *= player_win ? 1.25 : 0.75;
            }

    p_result.innerHTML = player_win ?
        `Congratulations! You won <br> 
        after <b>${round}</b> rounds <br>
        with <b>${lifepoints_diff}</b> more lifepoints.` :

        `What a shame! You lost <br> 
        after <b>${round}</b> rounds <br>
        with <b>${lifepoints_diff}</b> less lifepoints.`;

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

    var result_audio = new Audio( player_win ?
        'audio/win.mp3' :
        'audio/lose.mp3');

    result_audio.play();

    fetch(`/partidas/registrar/${user_id}/${player_number}/${deck_number}/${round}/${player_win ? 'vitoria' : 'derrota'}/${lifepoints_diff}/${player_win ? new_currency : -(new_currency)}/${currency}`, {
        method: "POST"
    }).then(function (response) {
        
        if (response.ok) {
            console.log('Successfully registered the match!');

        } else {
            console.log("Couldn't register the match");
        }
    });
}

function reset() {
    document.location.reload();
}

function show_redirect_modal() {
    modal_shadow.style.display = `flex`;
    redirect_modal.style.display = `flex`;
}

function go_to_store() {
    window.location.href = `store.html`
}

function close_window() {
    modal_shadow.style.display = `none`;
    redirect_modal.style.display = `none`;
}