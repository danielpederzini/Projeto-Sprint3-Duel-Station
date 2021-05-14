function load_hub() {
    fetch("/usuarios/rankear", {
        method: "POST",
    }).then(resposta => {

        if (resposta.ok) {

            resposta.json().then(json => {

                var top10 = [
                    json.nomeUsuario,
                    json.saldo
                ];

            });

        } else {
            console.log('Erro ao carregar top10!');

            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    });

    return false;
}