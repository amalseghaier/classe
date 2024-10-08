const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('examen', 'root', 'mysqlserver', {
  dialect: 'mysql',
  host: 'localhost',
});
const Departement= require('./departementModel')

const Classe = sequelize.define('Classe', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  niveau: {
    type: DataTypes.STRING, // Adjust the data type as per your needs (e.g., STRING, INTEGER, etc.)
    allowNull: false,
  },
  departementId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Departement,
      key: 'id',
    },
  },
});
Classe.belongsTo(Departement, { foreignKey: 'departementId' });

module.exports = Classe; 
