// arquivo responsável por abrir o banco de dados
// e iniciar a conexão com ele
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

// abertura do banco de dados
module.exports = () => 
  open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  });


// quando uma arrow function tem somente um elemento
// ocultamos sua chave