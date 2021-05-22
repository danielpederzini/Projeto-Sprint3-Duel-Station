var player_names = ['Seto Kaiba', 'Mako Tsunami', 'S. Leblanc', 'Yami Yugi', 'Yami Marik'];
var player_prices = ['0.00', '250.00', '500.00', '750.00', '1000.00'];
var player_descriptions = [
    'Smart, competitive and opportunist, starts the game with 200 more lifepoints.',
    'Brave and persistent, takes 25% less damage.',
    'Assertive and calculist, gains 25% more coins at the end of the game.',
    'Focused and determinated, his monsters gain 5% additional attack.',
    'Insane and manipulative, heals himself by 10% of all dealt damage.'
];

var deck_names = ['Winged', 'Aquatic', 'Earthy', 'Dark', 'Divine'];
var deck_prices = ['0.00', '250.00', '500.00', '750.00', '1000.00'];
var deck_descriptions = [
    `Dragons, birds and other winged creatures. Equilibrated card power. <br><br>
    <b>Ability: Fly</b> <br><br>
    Loses 100 lifepoints in order to change the current card.`,

    `Beasts, monsters and other aquatic creatures. Sligth power variation. <br><br>
    <b>Ability: Sea Healing</b> <br><br>
    Heals the player by 500 to 750 lifepoints. However, weakens the current card by 25% to 75%.`,

    `Dinosaurs, giants, warriors and other brute strength beings. High power variation. <br><br>
    <b>Ability: Earth Fury</b> <br><br>
    Loses 750 lifepoints in order to increase the power of the current card by 5% to 50%.`,

    `Mages, vampires, spirits and other dark beings. Equilibrated card power. <br><br>
    <b>Ability: Last Whisper</b> <br><br>
    Sets your lifepoints as 1, and the opponents' as 200. From now on, you get 10 coins for winning and loses 20 otherwise.`,

    `The 3 egyptian gods. Variable and scalable power. <br><br>
    <b>Ability: The Awakening</b> <br><br>
    Every round, there's a small chance of summoning "Holakthy, The Creator of Light", a god of unlimited power.`
];

function show_buy_box(selected_item, item_id) {

    var item_name = selected_item % 20 == 0 ? deck_names[selected_item / 20]  : player_names[selected_item - 1];
    var item_price = selected_item % 20 == 0 ? deck_prices[selected_item / 20]  : player_prices[selected_item - 1];
    var item_description =  selected_item % 20 == 0 ? deck_descriptions[selected_item / 20]  : player_descriptions[selected_item - 1];

    modal_shadow.style.display = `flex`;
    buy_modal.style.display = `flex`;

    b_item_name.innerHTML = item_name;
    p_item_description.innerHTML = item_description;

    if (item_id.includes('unknown')) {
        p_item_price.innerHTML = item_price;
    }
    
    else {
        bt_buy.style.display = `none`;
    }

}

function close_window() {
    modal_shadow.style.display = `none`;
    buy_modal.style.display = `none`;

    bt_buy.style.display = `flex`;
}
