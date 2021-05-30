function load_hub() {
    fetch("/usuarios/rankear", {
        method: "GET",
    }).then(resultado => {

        if (resultado.ok) {

            console.log(resultado);

            resultado.json().then(json => {

                for (var i = 0; i < 10 && i < json.length; i++) {
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

    fetch("/posts/buscar_posts", {
        method: "GET",
    }).then(resultado => {

        if (resultado.ok) {

            resultado.json().then(json => {

                for (var i = 0; i < json.length; i++) {

                    div_posts.innerHTML +=

                    `<div class="post">
                        
                        <div class="author">
                            <p>${json[i].nomeUsuario}</p>
                            
                            <div class="currency_top10">
                                <img src="img/coin.png" alt="Coin icon">
                                <p>${json[i].saldo}</p>
                            </div>
                            
                            <p>${json[i].dataPostagem.replace('T', ' ').replace('.000Z', '')}</p>
                        </div>
                        
                        <div class="post_content">
                        
                        <p>${json[i].texto}</p>

                        </div>
                        
                        <div class="reactions">
                        
                            <div class="like" onclick="react_to_post('like', ${json[i].idPost})">
                                <img src="img/like.png" alt="Like icon">
                                <p id="${'p_like_' + json[i].idPost}">${json[i].likes}</p>
                            </div>
                            
                            <div class="dislike" onclick="react_to_post('dislike', ${json[i].idPost})">
                                <img src="img/dislike.png" alt="Dislike icon">
                                <p id="${'p_dislike_' + json[i].idPost}">${json[i].dislikes}</p>
                            </div>

                        </div>
                        
                    </div>`;

                }

            });

        } else {
            console.log(`Couldn't get the posts!`);

            resultado.text().then(texto => {
                console.error(texto);
            });

        }
    });
}

function post() {
    modal_shadow.style.display = `flex`;
    loading_modal.style.display = `flex`;

    var formulario = new URLSearchParams(new FormData(form_post));
    
    fetch(`/posts/postar/${user_id}`, {
        method: "POST",
        body: formulario
    }).then(function (response) {

        if (response.ok) {

            setTimeout(function () {

                loading_modal.style.display = `none`;
                success_post_modal.style.display = `flex`;

            }, 1000);

            response.json().then(json => {
                p_username.innerHTML = `Sign in as ${json.nomeUsuario} to continue`;
            });

        } else {

            setTimeout(function () {

                loading_modal.style.display = `none`;
                failure_post_modal.style.display = `flex`;
                
            }, 1000);

        }
    });

    return false;

}


function react_to_post(reaction_type, post_id) {

    fetch(`/posts/reagir/${post_id}/${reaction_type}`, {
        method: "POST"
    })

    var current_number = Number(document.getElementById(`p_${reaction_type}_${post_id}`).innerHTML);
    document.getElementById(`p_${reaction_type}_${post_id}`).innerHTML = `${current_number + 1}`

}