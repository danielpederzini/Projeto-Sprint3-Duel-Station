var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Post = require('../models').Post;

router.post('/postar/:fkUsuario', function (req, res, next) {
    console.log('Posting...');

    Post.create({
        fkUsuario: req.params.fkUsuario,
        texto: req.body.text,
        likes: 0,
        dislikes: 0
    }).then(resultado => {
        console.log(`Created register: ${resultado}`)
        res.send(resultado);
    }).catch(erro => {
        console.error(erro);
        res.status(500).send(erro.message);
    });
});

router.get('/buscar_posts', function (req, res, next) {
    console.log('Getting posts...');

    let instrucaoSql = `select nomeUsuario, saldo, idPost, texto, likes, dislikes, dataPostagem from usuario join post on fkUsuario = idUsuario order by idPost desc`;
    console.log(instrucaoSql);

    sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
        .then(resultado => {
            res.json(resultado);
        }).catch(erro => {
            console.error(erro);
            res.status(500).send(erro.message);
        });

});

router.post('/reagir/:post_id/:reaction_type', function (req, res, next) {
    console.log('Posting...');

    let idPost = req.params.post_id;
    let tipo_reacao = req.params.reaction_type;
    
    let instrucaoSql = ``;

    if (tipo_reacao == 'like') {
        instrucaoSql = `update post set likes=likes + 1 where idPost=${idPost}`;
    }

    else {
        instrucaoSql = `update post set dislikes=dislikes + 1 where idPost=${idPost}`;
    }
    
    console.log(instrucaoSql);

    sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.UPDATE })
    
});

module.exports = router;