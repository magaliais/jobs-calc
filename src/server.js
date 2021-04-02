// biblioteca para criação do servidor
const express = require("express");
const server = express();
// importa módulo do express responsável por criar e manipular as rotas
const routes = require("./routes");
// importa módulo que fornece utilidades para trabalhar com paths dos diretórios
const path = require("path");

// mudar a localização da pasta views
server.set('views', path.join(__dirname, 'views'));

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