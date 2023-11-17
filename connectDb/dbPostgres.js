import Sequelize  from 'sequelize';


// Databasename,username,password,host,dialect
export const sequelize = new Sequelize('repair','postgres', 'postgre1234', {
    host: 'localhost',
    dialect: 'postgres'
})