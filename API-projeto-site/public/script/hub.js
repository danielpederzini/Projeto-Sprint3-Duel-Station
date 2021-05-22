function load_hub() {
    fetch("/usuarios/rankear", {
        method: "GET",
    }).then(resultado => {

        if (resultado.ok) {

            console.log(resultado);

            resultado.json().then(json => {

                for (var i = 0; i < 10; i++) {
                    var sup;

                    if (i == 0) {
                        sup = `st`
                    }

                    else if (i == 1) {
                        sup = `nd`
                    }

                    else if (i == 2) {
                        sup = `rd`
                    }

                    else {
                        sup = `th`
                    }

                    document.getElementById(`p_top${i + 1}_name`).innerHTML += `${i + 1}<sup>${sup}</sup> ${json[i].nomeUsuario}`;
                    document.getElementById(`div_top${i + 1}_currency`).innerHTML = `<img src="img/coin.png"> <p>${json[i].saldo}</p>`;
                }

            });

        } else {
            console.log('Error on loading top10!');

            resultado.text().then(texto => {
                console.error(texto);
            });

        }
    });

    return false;
}