var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Usuario = require('../models').Usuario;

let sessoes = [];

/* Recuperar usuário por login e senha */
router.post('/autenticar', function(req, res, next) {
	console.log('Recuperando usuário por login e senha');

	var login = req.body.login;
	var senha = req.body.password;	
	
	let instrucaoSql = `select * from usuario where (login='${login}' or email='${login}') and senha='${senha}'`;
	console.log(instrucaoSql);

	sequelize.query(instrucaoSql, {
		model: Usuario
	}).then(resultado => {
		console.log(`Encontrados: ${resultado.length}`);

		if (resultado.length == 1) {
			sessoes.push(resultado[0].dataValues.login);
			console.log('sessoes: ',sessoes);
			res.json(resultado[0]);
		} else if (resultado.length == 0) {
			res.status(403).send('Invalid login or password!');
		} else {
			res.status(403).send('More than one user with the same login and password');
		}

	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
  	});
});

/* Cadastrar usuário */
router.post('/cadastrar', function(req, res, next) {
	console.log('Criando um usuário');
	
	if (req.body.login == '' || req.body.email == '' || req.body.password == '' || req.body.password_confirm != req.body.password ||
	req.body.email.includes('@') == false || req.body.email.includes('.com') == false) {

		Usuario.create({
		}).then(resultado => {
			console.log(`Registro criado: ${resultado}`)
			res.send(resultado);
		}).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
		});

	}

	else {

		Usuario.create({
			nomeUsuario: req.body.login,
			login: req.body.login,
			email: req.body.email,
			senha: req.body.password,
			saldo: 150
		}).then(resultado => {
			console.log(`Registro criado: ${resultado}`)
			res.send(resultado);
		}).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
		});

	}

});


/* Verificação de usuário */
router.get('/sessao/:login', function(req, res, next) {
	let login = req.params.login;
	console.log(`Verificando se o usuário ${login} tem sessão`);
	
	let tem_sessao = false;
	for (let u=0; u<sessoes.length; u++) {
		if (sessoes[u] == login) {
			tem_sessao = true;
			break;
		}
	}

	if (tem_sessao) {
		let mensagem = `Usuário ${login} possui sessão ativa!`;
		console.log(mensagem);
		res.send(mensagem);
	} else {
		res.sendStatus(403);
	}
	
});


/* Logoff de usuário */
router.get('/sair/:login', function(req, res, next) {
	let login = req.params.login;
	console.log(`Ending user ${login} session`);
	let nova_sessoes = []
	for (let u=0; u<sessoes.length; u++) {
		if (sessoes[u] != login) {
			nova_sessoes.push(sessoes[u]);
		}
	}
	sessoes = nova_sessoes;
	res.send(`User ${login} session finished succesfuly!`);
});


/* Recuperar todos os usuários */
router.get('/', function(req, res, next) {
	console.log('Recuperando todos os usuários');
	Usuario.findAndCountAll().then(resultado => {
		console.log(`${resultado.count} registros`);

		res.json(resultado.rows);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
  	});
});

module.exports = router;
