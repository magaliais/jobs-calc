const express = require("express");  // biblioteca para criação do servidor
const routes = express.Router();

// import do controller
const ProfileController = require('./controllers/ProfileController.js');
const JobController = require('./controllers/JobController.js');
const DashboardController = require("./controllers/DashboardController.js");

// request, response
// rotas get
routes.get('/', DashboardController.index);
routes.get('/landing-page', (req, res) => res.render('../../landing-page'));
routes.get('/job', JobController.create);
routes.get('/job/:id', JobController.show); // determina que vá para o id do job selecionado
routes.get('/profile', ProfileController.index);

// rotas post
routes.post('/job', JobController.save);
routes.post('/profile', ProfileController.update);
routes.post('/job/:id', JobController.update);
routes.post('/job/delete/:id', JobController.delete);

module.exports = routes;