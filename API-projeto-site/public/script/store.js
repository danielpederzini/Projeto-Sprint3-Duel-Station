var player_names = ['Seto Kaiba', 'Mako Tsunami', 'S. Leblanc', 'Yami Yugi', 'Yami Marik'];
var player_prices = ['0.00', '250.00', '500.00', '750.00', '1000.00'];
var player_descriptions = [
    'Smart, competitive and opportunist, starts the game with 200 more lifepoints.',
    'Brave and persistent, takes 15% less damage.',
    'Assertive and calculist, gains 25% more coins at the end of the game.',
    'Focused and determinated, his monsters gain 5% additional attack.',
    'Insane and manipulative, heals himself by 10% of all dealt damage.'
];

var deck_names = ['Winged', 'Aquatic', 'Earthy', 'Dark', 'Divine'];
var deck_prices = ['0.00', '250.00', '500.00', '750.00', '1000.00'];
var deck_descriptions = [
    `Dragons, birds and other winged creatures. Balanced card power. <br><br>
    <b>Ability: Fly</b> <br><br>
    Loses 400 lifepoints in order to swap the current card.`,

    `Beasts, monsters and other aquatic creatures. Sligth power variation. <br><br>
    <b>Ability: Sea Healing</b> <br><br>
    Heals the player by 500 to 1000 lifepoints. However, weakens the current card by 25% to 75%.`,

    `Dinosaurs, giants, warriors and other brute strength beings. High power variation. <br><br>
    <b>Ability: Earth Fury</b> <br><br>
    Loses 750 lifepoints in order to increase the power of the current card by 5% to 50%.`,

    `Mages, vampires, spirits and other dark beings. Balanced card power. <br><br>
    <b>Ability: Last Whisper</b> <br><br>
    Sets your lifepoints to 1, and the opponents' to 1000. From now on, you get 10 coins for winning or loses 20 otherwise.`,

    `The 3 egyptian gods. Variable and scalable power. <br><br>
    <b>Ability: The Awakening</b> <br><br>
    Loses 1000 lifepoints, having a 25% chance of summoning "Holakthy, The Creator of Light", a god of massive power.`
];

var global_selected_item;

var item_name;
var item_price;
var item_description;

function show_buy_box(selected_item, item_id) {

    global_selected_item = selected_item;

    item_name = selected_item % 20 == 0 ? deck_names[selected_item / 20] : player_names[selected_item - 1001];
    item_price = selected_item % 20 == 0 ? deck_prices[selected_item / 20] : player_prices[selected_item - 1001];
    item_description = selected_item % 20 == 0 ? deck_descriptions[selected_item / 20] : player_descriptions[selected_item - 1001];

    modal_shadow.style.display = `flex`;
    purchase_modal.style.display = `flex`;

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
    
    purchase_modal.style.display = `none`;
    success_purchase_modal.style.display = `none`;
    failure_purchase_modal.style.display = `none`;
    settings_modal.style.display = `none`;

    bt_buy.style.display = `flex`;

}

function refresh() {

    window.location.reload();

}

function buy() {

    purchase_modal.style.display = `none`
    loading_modal.style.display = `flex`;

    setTimeout(function () {

        if (currency >= Number(item_price)) {

            if (global_selected_item % 20 == 0) {

                fetch(`/compras/comprar_deck/${global_selected_item / 20 + 1001}/${item_price}/${user_id}/${currency}`, {
                    method: "POST"
                }).then(resposta => {

                    if (resposta.ok) {

                        loading_modal.style.display = `none`;

                        success_purchase_modal.style.display = `flex`;

                        p_success_message.innerHTML = `You can now play with ${item_name}!`;


                    } else {

                        loading_modal.style.display = `none`;

                        failure_login_modal.style.display = `flex`;

                        p_failure_message.innerHTML = `Couldn't purchase ${item_name}, you need ${item_price - currency} more coins.`;

                    }

                });

            }

            else {

                fetch(`/compras/comprar_duelista/${global_selected_item}/${item_price}/${user_id}/${currency}`, {
                    method: "POST"
                }).then(resposta => {

                    if (resposta.ok) {

                        loading_modal.style.display = `none`;

                        success_purchase_modal.style.display = `flex`;

                        p_success_message.innerHTML = `You can now play with ${item_name}!`;


                    } else {

                        loading_modal.style.display = `none`;

                        failure_purchase_modal.style.display = `flex`;

                        p_failure_message.innerHTML = `Couldn't purchase ${item_name}, you need ${item_price - currency} more coins.`;

                    }

                });

            }

        }

        else {

            loading_modal.style.display = `none`;

            failure_purchase_modal.style.display = `flex`;

            p_failure_message.innerHTML = `Couldn't purchase ${item_name}, you need ${item_price - currency} more coins.`;

        }

    }, 1000);

}
