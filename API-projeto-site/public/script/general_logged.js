var user_id = window.sessionStorage.getItem('id_usuario_meuapp');
var user_name = window.sessionStorage.getItem('nome_usuario_meuapp');
var currency = Number(window.sessionStorage.getItem('saldo_usuario_meuapp'));

function load_info() {
    p_currency.innerHTML = currency.toFixed(2);
    p_user_name.innerHTML = user_name;
}