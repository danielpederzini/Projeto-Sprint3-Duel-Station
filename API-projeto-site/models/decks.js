'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Decks = sequelize.define('Decks',{
		idDeck: {
			field: 'idDeck',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: false
		},
		fkUsuario: {
			field: 'fkUsuario',
			type: DataTypes.INTEGER,
			foreignKey: true
		}
	}, 
	{
		tableName: 'decks', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Decks;
};
