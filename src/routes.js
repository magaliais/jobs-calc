const express = require("express");  // biblioteca para criação do servidor
const routes = express.Router();

const views = __dirname + "/views/"

const Profile = {
  data: {
    name: "Gabriel",
    avatar: "https://github.com/magaliais.png",
    "monthly-budget": 3000,
    "hours-per-day": 5,
    "days-per-week": 5,
    "vacation-per-year": 4,
    "hour-value": 75
  },

  controllers: {
    index(req, res) {
      return res.render(views+'profile', { profile: Profile.data });
    },

    update(req, res) {
      // req.body para pegar os dados
      const profile = req.body;
      console.log(profile);

      // definir quantas semanas tem em um ano: 52
      const weeksPerYear = 52;

      // remover as semanas de férias do ano, para pegar quantas semanas tem em 1 mês
      const weeksPerMonth = (weeksPerYear - profile["vacation-per-year"]) / 12;
      
      // quantas horas por semana estou trabalhando
      const weekTotalHours = profile["hours-per-day"] * profile["days-per-week"];

      // horas trabalhadas no mês
      const monthlyTotalHours = weekTotalHours * weeksPerMonth;

      // valor da hora
      profile["hour-value"] = profile["monthly-budget"] / monthlyTotalHours;


      Profile.data = profile;

      return res.redirect('/profile');
    }
  }
}


const Job = {
  data: [
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
  ],

  controllers: {
    index(req, res) {
      // atualiza o array toda vez que entra na página
        
      const updatedJobs = Job.data.map((job) => {
        // ajusta os jobs e calculando tempo restante
        const remaining = Job.services.remainingDays(job);
        const status = remaining <= 0 ? 'done' : 'progress';
      
        return {
           ...job,
          remaining,
          status,
          budget: Job.services.calculateBudget(job, Profile.data["hour-value"])
        };
      })
      
      return res.render(views+'index', { jobs: updatedJobs }); // res.render(página a ser renderizada, { objeto passado para dentro do ejs })
    },

    create(req, res) {
      return res.render(views + "job");
    },

    save(req, res) {
      // req.body -> { name, daily-hours, total-hours }

      const job = req.body;
      job.createdAt = Date.now(); // atribuindo a data atual ao objeto 'job'
      job.id = Job.data[Job.data.length -1]?.id + 1 || 1;

      Job.data.push(job);
      return res.redirect('/');
    },

    show(req, res) {
      const jobId = req.params.id;

      const job = Job.data.find((job) => job.id == jobId);
      
      if(!job) {
        return res.send("Job not found!");
      }
      job.budget = Job.services.calculateBudget(job, Profile.data["hour-value"]);

      res.render(views+'job-edit', { job });
    },

    update(req, res) {
      const jobId = req.params.id;
      const job = Job.data.find((job) => job.id == jobId);

      if(!job) {
        return res.send("Job not found!");
      }

      const updatedJob = {
        ...job,
        name: req.body.name,
        "total-hours": req.body["total-hours"],
        "daily-hours": req.body["daily-hours"]
      }

      Job.data = Job.data.map(job => {
        if(Number(job.id) === Number(jobId)) {
          job = updatedJob;
        }

        return job;
      })

      res.redirect('/job/' + jobId);
    },

    delete(req, res) {
      const jobId = req.params.id;

      Job.data = Job.data.filter(job => Number(job.id) !== Number(jobId))

      return res.redirect('/');
    }
  },

  services: {
    remainingDays(job) {
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
    },

    calculateBudget(job, hourValue) {
      return hourValue * job["total-hours"];
    }
  },
}



// request, response

// rotas get
routes.get('/', Job.controllers.index);
routes.get('/job', Job.controllers.create);
routes.get('/job/:id', Job.controllers.show); // determina que vá para o id do job selecionado
routes.get('/profile', Profile.controllers.index);

// rotas post
routes.post('/job', Job.controllers.save);
routes.post('/profile', Profile.controllers.update);
routes.post('/job/:id', Job.controllers.update);
routes.post('/job/delete/:id', Job.controllers.delete);

module.exports = routes;