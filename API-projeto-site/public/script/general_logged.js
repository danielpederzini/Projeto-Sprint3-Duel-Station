var user_id = window.sessionStorage.getItem('id_usuario_meuapp');
var user_name = window.sessionStorage.getItem('nome_usuario_meuapp');
var login = window.sessionStorage.getItem('login_usuario_meuapp');
var background_url = window.sessionStorage.getItem('url_fundo_usuario_meuapp');
var tutorial_status = window.sessionStorage.getItem('status_tutorial_usuario_meuapp');
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
                    
                    currency = Number(json[0].saldo);
    
                    p_currency.innerHTML = currency.toFixed(2);
    
                    console.log('Currency: ' + currency);

                    in_new_name.value = user_name;
                    in_tutorial_status.checked = tutorial_status == 'on' ? true : false;
                    in_background_url.value = background_url;
    
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

function show_settings() {
    
    modal_shadow.style.display = `flex`;

    settings_modal.style.display = `flex`;

}

function save_settings() {

    settings_modal.style.display = `none`;
    loading_modal.style.display = `flex`;

    var formulario = new URLSearchParams(new FormData(form_settings));
    
    fetch(`/usuarios/salvar_configuracoes/${user_id}`, {
        method: "POST",
        body: formulario
    }).then(function (response) {

        if (response.ok) {

            setTimeout(function () {

                loading_modal.style.display = `none`;
                success_settings_modal.style.display = `flex`;

            }, 1000);

        } else {

            setTimeout(function () {

                loading_modal.style.display = `none`;
                failure_settings_modal.style.display = `flex`;
                
            }, 1000);

        }
    });

    return false;
    
}