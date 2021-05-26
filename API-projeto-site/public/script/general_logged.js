var user_id = window.sessionStorage.getItem('id_usuario_meuapp');
var user_name = window.sessionStorage.getItem('nome_usuario_meuapp');
var login = window.sessionStorage.getItem('login_usuario_meuapp');
var currency;

function logoff() {
    fetch(`/usuarios/sair/${login}`, { cache: 'no-store' });
    sessionStorage.clear();
    window.location.href = 'login.html';
}

function check_login() {

    if (login == undefined) {
        window.location.href = 'login.html';
    } else {
        check_session();

        p_user_name.innerHTML = user_name;

        fetch(`/usuarios/buscar_saldo/${user_id}`, {
            method: "GET"
        }).then(resposta => {
    
            if (resposta.ok) {
    
                resposta.json().then(json => {
                    
                    currency = json[0].saldo;
    
                    p_currency.innerHTML = currency;
    
                    console.log('Currency: ' + currency)
    
                });
    
            } else {
    
                console.log("Couldn't get user's currency")
    
            }
    
        });
    }

}

function check_session() {

    fetch(`/usuarios/sessao/${login}`, { cache: 'no-store' })
        .then(resposta => {
            if (resposta.ok) {
                resposta.text().then(texto => {
                    console.log('Session :) ', texto);
                });
            } else {
                console.error('Session :.( ');
                logoff();
            }
        });

}