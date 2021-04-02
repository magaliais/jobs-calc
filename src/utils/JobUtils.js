module.exports = {
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
}