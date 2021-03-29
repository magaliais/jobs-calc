const express = require("express");  // biblioteca para criação do servidor
const routes = express.Router();

const views = __dirname + "/views/"

const profile = {
  name: "Gabriel",
  avatar: "https://avatars.githubusercontent.com/u/38479953?s=400&u=2e1e0da955a8b5252fc368c6ca78a7e49cbd3965&v=4",
  "monthly-budget": 3000,
  "days-per-week": 5,
  "hours-per-day": 5,
  "vacation-per-year": 4,
}

// request, response
routes.get('/', (req, res) => res.render(views+'index'));
routes.get('/job', (req, res) => res.render(views+'job'));
routes.get('/job/edit', (req, res) => res.render(views+'job-edit'));
routes.get('/profile', (req, res) => res.render(views+'profile', { profile }));


module.exports = routes;