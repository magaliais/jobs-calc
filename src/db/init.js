// precisa ser rodado uma vez só
// e serve para iniciar o banco de dados
const Database = require('./config.js') 

// objeto para servir de inicializador
const initDb = {
  async init() {

    // async / await
    const db = await Database() // responsável por iniciar a conexão com o banco de dados

    // envia os comandos SQL para serem executados
    // dentro do banco de dados, iniciado as tabelas
    // exec -> inicia uma tabela
    await db.exec(`
      CREATE TABLE profile(
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        name TEXT, 
        avatar TEXT, 
        monthly_budget INT, 
        days_per_week INT, 
        hours_per_day INT, 
        vacation_per_year INT, 
        hour_value INT
      )
    `);

    await db.exec(`
      CREATE TABLE jobs(
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        name TEXT, 
        daily_hours INT, 
        total_hours INT, 
        created_at DATETIME
      )
    `)

    // run -> insere um novo elemento em uma
    // tabela existente
    await db.run(`
        INSERT INTO profile(
          name, 
          avatar, 
          monthly_budget, 
          days_per_week, 
          hours_per_day, 
          vacation_per_year
        ) VALUES (
          "Gabriel", 
          "https://github.com/magaliais.png", 
          3000, 
          5, 
          5, 
          4
        )
    `);

    await db.close() // responsável por encerrar a conexão com o banco de dados
  }
}

// executa a função para iniciar o banco de dados
initDb.init();