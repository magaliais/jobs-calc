const Job = require('../model/Job.js');
const JobUtils = require('../utils/JobUtils.js');

const Profile = require('../model/Profile.js');

module.exports = {
  create(req, res) {
    return res.render("job");
  },

  async save(req, res) {
    // req.body -> { name, daily-hours, total-hours }

    const job = req.body;
    job.createdAt = Date.now(); // atribuindo a data atual ao objeto 'job'

    await Job.create(job);
    return res.redirect('/index');
  },

  async show(req, res) {
    const jobId = req.params.id;
    const jobs = await Job.get();

    const job = jobs.find((job) => Number(job.id) === Number(jobId));
    
    if(!job) {
      return res.send("Job not found!");
    }

    const profile = await Profile.get();

    job.budget = JobUtils.calculateBudget(job, profile["hour-value"]);

    res.render('job-edit', { job });
  },

  async update(req, res) {
    const jobId = req.params.id;

    const updatedJob = {
      name: req.body.name,
      "total-hours": req.body["total-hours"],
      "daily-hours": req.body["daily-hours"]
    }

    await Job.update(updatedJob, jobId);

    res.redirect('/job/' + jobId);
  },

  async delete(req, res) {
    const jobId = req.params.id;

    await Job.delete(jobId);
  
    return res.redirect('/index');
  }
}