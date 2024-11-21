/***************************************************************************************
* Objetivo: criar a integração com o banco de dados MySQL para manipular o calendário
* Data: 03/09/2024
* Autor: Gabriela Fernandes
* Versão: 1.0
***************************************************************************************/

const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'provestdb.mysql.database.azure.com',
  user: 'adm',
  password: process.env.DB_PASSWORD,
  database: 'db_jengt_provest',
});

module.exports = pool.promise();


