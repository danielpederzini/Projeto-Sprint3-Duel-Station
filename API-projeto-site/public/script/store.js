var player_names = ['Seto Kaiba', 'Mako Tsunami', 'S. Leblanc', 'Yami Yugi', 'Yami Marik'];
var player_prices = ['0.00', '250.00', '500.00', '750.00', '1000.00'];
var player_descriptions = [
    'Inteligente, competitivo e oportunista, começa o jogo com 500 pontos de vida a mais',
    'Corajoso e persistente, recebe 25% menos dano de ataques inimigos',
    'Assertiva e calculista, recebe 25% mais moedas ao final da partida',
    'Focado e determinado, seus monstros recebem 5% de ataque adicional',
    'Insano e manipulador, cura-se em 10% de todo dano causado'
];

var deck_names = ['Voador', 'Aquático', 'Terrestre', 'Sombrio', 'Divino'];
var deck_prices = ['0.00', '250.00', '500.00', '750.00', '1000.00'];
var deck_descriptions = [
    `Dragões, pássaros e outras criaturas aladas. Cartas de poder equilibrado. <br><br>
    <b>Habilidade: Levantar Vôo</b> <br><br>
    Desconta 100 pontos de vida para trocar carta atual por uma outra aleatória.`,

    `Feras, monstros e outras criaturas aquáticas. Cartas mais fortes e cartas mais fracas. <br><br>
    <b>Habilidade: Cura Marítima</b> <br><br>
    Recupra entre 500 e 750 pontos de vida, porém, enfraquece a carta atual entre 25% e 75%.`,

    `Dinossauros, gigantes, guerreiros e outros seres de força bruta. Cartas muito fortes e cartas muito fracas. <br><br>
    <b>Habilidade: Fúria da Terra</b> <br><br>
    Desconta 750 pontos de vida para aumentar o poder da carta atual entre 5% e 50%. `,

    `Magos, vampiros, espíritos e outros seres sombrios . Cartas de poder equilibrado. <br><br>
    <b>Habilidade: Último Suspiro</b> <br><br>
    Define seus pontos de vida como 1, e os do adversário como 200. A partir daí a vitória lhe dá 10 moedas, e a derrota lhe tira 20.`,

    `Os 3 deuses egípcios. Cartas de poder variável e escalável. <br><br>
    <b>Habilidade: O Despertar</b> <br><br>
    Todo round, há uma pequena chance de invocar "Holakthy, o Criador da Luz", um deus de poder infinito`
];

function change_store_item(selected_item, clicked_button) {

    for (var i = 1; i <= 10; i ++) {
        document.getElementById(`bt_item${i}`).style.opacity = `30%`;
    }

    document.getElementById(`${clicked_button}`).style.opacity = `100%`;

    if (selected_item % 20 == 0) {
        
        b_item_name.innerHTML = deck_names[selected_item / 20];

        p_deck_price.innerHTML = deck_prices[selected_item / 20];
    
        p_item_description.innerHTML = deck_descriptions[selected_item / 20]
    
        bt_buy_player.style.display = `none`;
        bt_buy_deck.style.display = `block`;

    }

    else {

        b_item_name.innerHTML = player_names[selected_item - 1];

        p_player_price.innerHTML = player_prices[selected_item - 1];
    
        p_item_description.innerHTML = player_descriptions[selected_item - 1]
    
        bt_buy_deck.style.display = `none`;
        bt_buy_player.style.display = `block`;

    }

}

function buy_player() {
    if (currency >= Number(p_player_price.innerHTML)) {
        
        currency -= Number(p_player_price.innerHTML);

        sessionStorage.setItem('saldo_usuario_meuapp', currency)

        document.location.reload();
    }
}

function buy_deck() {
    if (currency >= Number(p_deck_price.innerHTML)) {
        
        currency -= Number(p_deck_price.innerHTML);

        sessionStorage.setItem('saldo_usuario_meuapp', currency)

        document.location.reload();
    }
}
