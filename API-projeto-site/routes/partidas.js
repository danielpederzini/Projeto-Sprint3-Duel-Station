var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Partida = require('../models').Partida;

const { match_info } = require("../public/script/game");

/* Registrar partida */
// router.post("/registrar", (request, response) => {
// 	var instrucaoSql = `INSERT INTO partida (fkUsuario, duelista, deck, rounds, resultado, difPontosDeVida, mudancaSaldo) VALUES
//     ('${match_info[0]}','${match_info[1]}','${match_info[2]}',
//     '${match_info[3]}','${match_info[4]}',
//     '${match_info[5]}','${match_info[6]}');`
	
// 	sequelize.query(instrucaoSql, {
// 		model: Partida,
// 		mapToModel: true
// 	}).then(resultado => {
// 			console.log(`\n\nRegistro inserido com sucesso!\nO comando executado foi como abaixo:\n`);
// 			console.log(instrucaoSql)
// 			console.log(`\nFim do comando SQL executado.`);
// 			response.status(200).send("Dado inserido com sucesso.");
// 		}).catch(erro => {
// 			console.error(erro);
// 			response.status(500).send(erro.message);
// 		});
// });

router.post('/registrar', function(req, res, next) {
	console.log('Criando um usuário');
	
	Partida.create({
		fkUsuario: match_info[0],
		duelista: match_info[1],
        deck: match_info[2],
        rounds: match_info[3],
        resultado: match_info[4],
        difPontosDeVida: match_info[5],
        mudancaSaldo: match_info[6]
	}).then(resultado => {
		console.log(`Registro criado: ${resultado}`)
        res.send(resultado);
    }).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
  	});
});
module.exports = router;