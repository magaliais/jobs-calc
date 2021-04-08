const Job = require('../model/Job.js');
const JobUtils = require('../utils/JobUtils.js')
const Profile = require('../model/Profile.js');

module.exports = {
  async index(req, res) {
    // atualiza o array toda vez que entra na página

    const profile = await Profile.get();
    const jobs = await Job.get();
    
    // define o estado de cada projeto
    let statusCounts = {
      progress: 0,
      done: 0,
      total: jobs.length
    }
    
    let jobTotalHours = 0;

    const updatedJobs = jobs.map((job) => {
      // ajusta os jobs e calculando tempo restante
      const remaining = JobUtils.remainingDays(job);
      const status = remaining <= 0 ? 'done' : 'progress';

      // somando a quantidade de status
      // statusCounts está passando o conteúdo
      // da STRING status como referência
      // Logo, a contagem será feita em
      // statusCounts.done ou
      // statusCounts.progess
      statusCounts[status] += 1;

      jobTotalHours += status == 'progress' ? job['daily-hours'] : 0;

      return {
         ...job,
        remaining,
        status,
        budget: JobUtils.calculateBudget(job, profile["hour-value"])
      };
    })

    // qtd de horas que quero trabalhar por dia 
    // MENOS
    // quantidade de hotas/dia de cada job EM PROGRESSO
    const freeHours = profile['hours-per-day'] - jobTotalHours;
    
    return res.render('index', { jobs: updatedJobs, profile: profile, statusCount: statusCounts, freeHours: freeHours }); // res.render(página a ser renderizada, { objeto passado para dentro do ejs })
  }
}