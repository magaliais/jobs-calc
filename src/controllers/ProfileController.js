const Profile = require('../model/Profile.js');

module.exports = {
  index(req, res) {
    return res.render('profile', { profile: Profile.get() });
  },

  update(req, res) {
    // req.body para pegar os dados
    const profile = req.body;

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


    Profile.update({
      ...Profile.get(),
      ...req.body,
      "hour-value": profile["hour-value"]
    });

    return res.redirect('/profile');
  }
}