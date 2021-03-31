// biblioteca para criação do servidor
const express = require("express");
const server = express();

// parte do express responsável por criar as rotas
const routes = require("./routes");

// habilitando o uso do ejs (template engine)
server.set('view engine', 'ejs');

// habilitando uso do req.body (body da requisição) para a configuração das rotas post
server.use(express.urlencoded({ extended: true }));

// habilitar arquivos estáticos
server.use(express.static("public"));

// routes
server.use(routes);

// abre a porta 3000
server.listen(3000);