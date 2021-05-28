'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Duelista = sequelize.define('Duelista',{
		idDuelista: {
			field: 'idDuelista',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: false
		},
		nomeDuelista: {
			field: 'nomeDuelista',
			type: DataTypes.STRING,
			allowNull: false
		},
		valorDuelista: {
			field: 'valorDuelista',
			type: DataTypes.INTEGER,
			allowNull: false
		}
		
	}, 
	{
		tableName: 'duelista', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Duelista;
};
