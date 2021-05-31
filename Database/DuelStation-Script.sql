USE duelStation;

CREATE TABLE usuario (
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
nomeUsuario VARCHAR (50) UNIQUE,
login VARCHAR (50) UNIQUE,
email VARCHAR (50) UNIQUE,
senha VARCHAR (50),
saldo DECIMAL (7,2),
statusTutorial VARCHAR (3),
urlFundoPerfil VARCHAR(1000),

CHECK (statusTutorial in ('on', 'off'))
);

SELECT * FROM usuario;

CREATE TABLE partida (
idPartida INT PRIMARY KEY AUTO_INCREMENT,
fkUsuario INT,
fkDuelista INT,
fkDeck INT,
rounds INT,
resultado CHAR (7),
difPontosDeVida INT,
mudancaSaldo DECIMAL (5,2),

FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
FOREIGN KEY (fkDuelista) REFERENCES duelista(idDuelista),
FOREIGN KEY (fkDeck) REFERENCES deck(idDeck),
CHECK (resultado IN ('vitoria', 'derrota'))
) AUTO_INCREMENT = 101;

SELECT * FROM partida;

CREATE TABLE deck (
idDeck INT PRIMARY KEY AUTO_INCREMENT,
nomeDeck VARCHAR(50),
valorDeck INT
) AUTO_INCREMENT = 1001;

CREATE TABLE duelista (
idDuelista INT PRIMARY KEY AUTO_INCREMENT,
nomeDuelista VARCHAR(50),
valorDuelista INT
) AUTO_INCREMENT = 1001;

SELECT NOW() - INTERVAL 3 HOUR;

CREATE TABLE usuarioDuelista (
fkUsuario INT,
fkDuelista INT,
dataCompra DATETIME DEFAULT (NOW() - INTERVAL 3 HOUR),

PRIMARY KEY (fkUsuario, fkDuelista),

FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
FOREIGN KEY (fkDuelista) REFERENCES duelista(idDuelista)
);

CREATE TABLE usuarioDeck (
fkUsuario INT,
fkDeck INT,
dataCompra DATETIME DEFAULT (NOW() - INTERVAL 3 HOUR),

PRIMARY KEY (fkUsuario, fkDeck),

FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
FOREIGN KEY (fkDeck) REFERENCES deck(idDeck)
);

CREATE TABLE post (
idPost INT PRIMARY KEY AUTO_INCREMENT,
fkUsuario INT,
texto VARCHAR (200),
likes INT,
dislikes INT,
dataPostagem DATETIME DEFAULT (NOW() - INTERVAL 3 HOUR),

FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario)
) AUTO_INCREMENT = 10001;

SELECT * FROM post;

INSERT INTO duelista (nomeDuelista, valorDuelista) VALUES 
('Seto Kaiba', '0'),
('Mako Tsunami', '250'),
('S. Leblanc', '500'),
('Yami Yugi', '750'),
('Yami Marik', '1000');

INSERT INTO deck (nomeDeck, valorDeck) VALUES 
('Flying', '0'),
('Aquatic', '250'),
('Earthy', '500'),
('Dark', '750'),
('Divine', '1000');

SELECT * FROM usuario;

SHOW TABLES;