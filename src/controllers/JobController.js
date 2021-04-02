const Job = require('../model/Job.js');
const JobUtils = require('../utils/JobUtils.js');

const Profile = require('../model/Profile.js');

module.exports = {
  index(req, res) {

    // atualiza o array toda vez que entra na página
    
    const updatedJobs = Job.get().map((job) => {
      // ajusta os jobs e calculando tempo restante
      const remaining = JobUtils.remainingDays(job);
      const status = remaining <= 0 ? 'done' : 'progress';
    
      return {
         ...job,
        remaining,
        status,
        budget: JobUtils.calculateBudget(job, Profile.get()["hour-value"])
      };
    })
    
    return res.render('index', { jobs: updatedJobs }); // res.render(página a ser renderizada, { objeto passado para dentro do ejs })
  },

  create(req, res) {
    return res.render("job");
  },

  save(req, res) {
    // req.body -> { name, daily-hours, total-hours }

    const job = req.body;
    job.createdAt = Date.now(); // atribuindo a data atual ao objeto 'job'
    job.id = Job.get()[Job.get().length -1]?.id + 1 || 1;

    Job.get().push(job);
    return res.redirect('/');
  },

  show(req, res) {
    const jobId = req.params.id;

    const job = Job.get().find((job) => Number(job.id) === Number(jobId));
    
    if(!job) {
      return res.send("Job not found!");
    }
    job.budget = JobUtils.calculateBudget(job, Profile.get()["hour-value"]);

    res.render('job-edit', { job });
  },

  update(req, res) {
    const jobId = req.params.id;
    const job = Job.get().find((job) => job.id == jobId);

    if(!job) {
      return res.send("Job not found!");
    }

    const updatedJob = {
      ...job,
      name: req.body.name,
      "total-hours": req.body["total-hours"],
      "daily-hours": req.body["daily-hours"]
    }

    const newJobs = Job.get().map(job => {
      if(Number(job.id) === Number(jobId)) {
        job = updatedJob;
      }

      return job;
    });
    Job.update(newJobs);

    res.redirect('/job/' + jobId);
  },

  delete(req, res) {
    const jobId = req.params.id;

    Job.delete(jobId);
  
    return res.redirect('/');
  }
}