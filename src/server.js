const express = require("express");  // biblioteca para criação do servidor
const server = express();
const routes = require("./routes");  // parte do express responsável por criar as rotas

// habilitando o uso do ejs (template engine)
server.set('view engine', 'ejs');

// habilitar arquivos estáticos
server.use(express.static("public"));

// routes
server.use(routes);

server.listen(3000, () => console.log('rodando'));