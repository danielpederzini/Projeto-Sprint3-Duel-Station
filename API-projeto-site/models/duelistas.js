'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Duelistas = sequelize.define('Duelistas',{
		idDuelista: {
			field: 'idDuelista',
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
		tableName: 'duelistas', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Duelistas;
};
