const express = require("express");  // biblioteca para criação do servidor
const routes = express.Router();

const views = __dirname + "/views/"

const profile = {
  name: "Gabriel",
  avatar: "https://github.com/magaliais.png",
  "monthly-budget": 3000,
  "days-per-week": 5,
  "hours-per-day": 5,
  "vacation-per-year": 4,
  "hour-value": 75
}

const jobs = [
  {
    id: 1,
    name: "Pizzaria Guloso",
    "daily-hours": 2,
    "total-hours": 1,
    createdAt: Date.now(),
  },
  {
    id: 2,
    name: "OneTwo Project",
    "daily-hours": 3,
    "total-hours": 47,
    createdAt: Date.now(),
  }
];

function remainingDays(job) {
  // calculo do tempo restante
  const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed();
    
  const createdDate = new Date(job.createdAt);
  const dueDay = createdDate.getDate() + Number(remainingDays);
  const dueDateInMs = createdDate.setDate(dueDay);

  const timeDiffInMs = dueDateInMs - Date.now();

  // transformar milissegundos em dias
  const dayInMs = 1000 * 60 * 60 * 24;
  const dayDiff = Math.floor(timeDiffInMs / dayInMs);

  // restam x dias
  return dayDiff;
}


// request, response

// rotas get
routes.get('/', (req, res) => {
  // atualiza o array toda vez que entra na página
  
  const updatedJobs = jobs.map((job) => {
    // ajusta os jobs e calculando tempo restante
    const remaining = remainingDays(job);
    const status = remaining <= 0 ? 'done' : 'progress';

    return {
      ...job,
      remaining,
      status,
      budget: profile["hour-value"] * job["total-hours"]
    };
  })

  return res.render(views+'index', { jobs: updatedJobs }); // res.render(página a ser renderizada, { objeto passado para dentro do ejs })
});

routes.get('/job', (req, res) => res.render(views+'job'));
routes.get('/job/edit', (req, res) => res.render(views+'job-edit'));
routes.get('/profile', (req, res) => res.render(views+'profile', { profile }));

// rota post
routes.post('/job', (req, res) => {
  // req.body -> { name, daily-hours, total-hours }

  const job = req.body;
  job.createdAt = Date.now(); // atribuindo a data atual ao objeto 'job'
  job.id = jobs[jobs.length - 1]?.id + 1 || 1;

  jobs.push(job);
  console.log(jobs);
  return res.redirect('/');
});

module.exports = routes;