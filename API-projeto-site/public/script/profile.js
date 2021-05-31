var wins = 0;
var losses = 0;

function load_background() {

    profile_body.style.backgroundImage = `url('${background_url}')`

}

function get_matches() {

    fetch(`/partidas/buscar_vitorias/${user_id}`, {
        method: "GET"
    }).then(function (resultado) {

        if (resultado.ok) {

            resultado.json().then(json => {

                p_wins.innerHTML = `Wins: ${json[0].numVitorias}`;
                wins = json[0].numVitorias;
                change_bars();

            });

        } else {
            console.log("Couldn't get user's wins");
        }
    });

    fetch(`/partidas/buscar_derrotas/${user_id}`, {
        method: "GET"
    }).then(function (resultado) {

        if (resultado.ok) {

            resultado.json().then(json => {

                p_losses.innerHTML = `Losses: ${json[0].numDerrotas}`;
                losses = json[0].numDerrotas;
                change_bars();

            });

        } else {
            console.log("Couldn't get user's losses");
        }
    });

    fetch(`/partidas/buscar_partidas_geral/${user_id}`, {
        method: "GET"
    }).then(function (resultado) {

        if (resultado.ok) {

            resultado.json().then(json => {

                for (var i = 0; i < 10 && i < json.length; i++) {

                    var sup;

                    if (json.length - i == 1) {
                        sup = 'st';
                    }

                    else if (json.length - i == 2) {
                        sup = 'nd';
                    }

                    else if (json.length - i == 3) {
                        sup = 'rd';
                    }

                    else {
                        sup = 'th';
                    }

                    match_history_box.innerHTML +=

                        `<div class="match">

                        <p>${json.length - i}<sup>${sup}</sup></p>

                        <p>${json[i].rounds} RDs</p>

                        <img src="img/players/player${json[i].fkDuelista - 1000}.png">

                        <img src="img/types/type${(json[i].fkDeck - 1000) * 20 - 20}.png">

                        <div class="coin_gain">
                            <p>${json[i].mudancaSaldo < 0 ? '-' : '+'}</p>
                            <img src="img/coin.png">
                            <p>${Math.abs(json[i].mudancaSaldo).toFixed(2)}</p>
                        </div>

                    </div>`

                }

                var match_counters = [0, 0, 0];

                for (var i = 0; i < json.length; i++) {

                    if (json[i].difPontosDeVida <= 1500) {

                        match_counters[0]++;

                    } else if (json[i].difPontosDeVida <= 3000) {

                        match_counters[1]++;

                    } else {

                        match_counters[2]++;

                    }

                }

                var messages = ['Very Fierce', 'Equilibrated', 'A Stomp'];

                var max = match_counters[0];

                for (var i = 1; i < match_counters.length; i++) {

                    if (match_counters[i] > max) {
                        max = match_counters[i];
                    }

                }

                b_match_type.innerHTML = messages[match_counters.indexOf(max)];

            });

        } else {
            console.log("Couldn't get user's matches");
        }
    });

    fetch(`/partidas/buscar_top_duelistas/${user_id}`, {
        method: "GET"
    }).then(function (resultado) {

        if (resultado.ok) {

            resultado.json().then(json => {

                var total = 0;

                for (var i = 0; i < json.length; i++) {
                    total += json[i].numPartidas;
                }

                for (var i = 0; i < 3; i++) {
                    document.getElementById(`img_top${i + 1}_duelist`).src = `img/players/player${json[i].fkDuelista - 1000}.png`
                    document.getElementById(`p_top${i + 1}_duelist_percent`).innerHTML = `${(json[i].numPartidas / total * 100).toFixed(2)}%`
                }

            });

        } else {
            console.log("Couldn't get user's top duelists");
        }
    });

    fetch(`/partidas/buscar_top_decks/${user_id}`, {
        method: "GET"
    }).then(function (resultado) {

        if (resultado.ok) {

            resultado.json().then(json => {

                var total = 0;

                for (var i = 0; i < json.length; i++) {
                    total += json[i].numPartidas;
                }

                for (var i = 0; i < 3; i++) {
                    document.getElementById(`img_top${i + 1}_deck`).src = `img/types/type${(json[i].fkDeck - 1000) * 20 - 20}.png`
                    document.getElementById(`p_top${i + 1}_deck_percent`).innerHTML = `${(json[i].numPartidas / total * 100).toFixed(2)}%`
                }

            });

        } else {
            console.log("Couldn't get user's top decks");
        }
    });

    fetch(`/partidas/buscar_media_mudanca_saldo/${user_id}`, {
        method: "GET"
    }).then(function (resultado) {

        if (resultado.ok) {

            resultado.json().then(json => {

                var mediaMudancaSaldo = Number(json[0].mediaMudancaSaldo);

                p_avg_currency_change_signal.innerHTML = mediaMudancaSaldo < 0 ? '-' : '+';
                p_avg_currency_change.innerHTML = Math.abs(mediaMudancaSaldo).toFixed(2);

            });

        } else {
            console.log("Couldn't get user's average currency change");
        }
    });
}

function get_purchases() {
    fetch(`/compras/buscar_compras_duelistas/${user_id}`, {
        method: "GET"
    }).then(function (resultado) {

        if (resultado.ok) {

            resultado.json().then(json => {

                b_duelists_number.innerHTML = json.length + 1;

                for (var i = 0; i < json.length; i++) {

                    var sup;

                    if (json.length - i == 1) {
                        sup = 'st';
                    }

                    else if (json.length - i == 2) {
                        sup = 'nd';
                    }

                    else if (json.length - i == 3) {
                        sup = 'rd';
                    }

                    else {
                        sup = 'th';
                    }

                    duelist_purchase_history_box.innerHTML +=

                    `<div class="purchase">

                        <p>${json.length - i}<sup>${sup}</sup></p>

                        <img src="img/players/player${json[i].fkDuelista - 1000}.png">

                        <div class="price">
                            <img src="img/coin.png">
                            <p>${json[i].valorDuelista.toFixed(2)}</p>
                        </div>

                        <p>${json[i].dataCompra.replace('T', ' ').replace('.000Z', '')}</p>

                    </div>`

                }

                duelist_purchase_history_box.innerHTML +=

                `<div class="purchase">

                    <p>Initial</p>

                    <img src="img/players/player1.png">

                    <div class="price">
                        <img src="img/coin.png">
                        <p>0.00</p>
                    </div>

                    <p>On Account Creation</p>

                </div>`;

            });

        } else {
            console.log("Couldn't get user's purchases");
        }
    });

    fetch(`/compras/buscar_compras_decks/${user_id}`, {
        method: "GET"
    }).then(function (resultado) {

        if (resultado.ok) {

            resultado.json().then(json => {

                b_decks_number.innerHTML = json.length + 1;

                for (var i = 0; i < json.length; i++) {

                    var sup;

                    if (json.length - i == 1) {
                        sup = 'st';
                    }

                    else if (json.length - i == 2) {
                        sup = 'nd';
                    }

                    else if (json.length - i == 3) {
                        sup = 'rd';
                    }

                    else {
                        sup = 'th';
                    }

                    deck_purchase_history_box.innerHTML +=

                        `<div class="purchase">

                        <p>${json.length - i}<sup>${sup}</sup></p>

                        <img src="img/types/type${(json[i].fkDeck - 1000) * 20 - 20}.png">

                        <div class="price">
                            <img src="img/coin.png">
                            <p>${json[i].valorDeck.toFixed(2)}</p>
                        </div>

                        <p>${json[i].dataCompra.replace('T', ' ').replace('.000Z', '')}</p>

                    </div>`

                }

                deck_purchase_history_box.innerHTML +=

                `<div class="purchase">

                    <p>Initial</p>

                    <img src="img/types/type0.png">

                    <div class="price">
                        <img src="img/coin.png">
                        <p>0.00</p>
                    </div>

                    <p>On Account Creation</p>

                </div>`;

            });

        } else {
            console.log("Couldn't get user's purchases");
        }
    });
}

function change_bars() {
    var total = wins + losses;

    var wins_percent = wins / total * 100;
    var losses_percent = losses / total * 100;

    wins_bar.style.width = `${wins_percent}%`
    losses_bar.style.width = `${losses_percent}%`
}
