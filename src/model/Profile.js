let data = {
  name: "Gabriel",
  avatar: "https://github.com/magaliais.png",
  "monthly-budget": 3000,
  "hours-per-day": 5,
  "days-per-week": 5,
  "vacation-per-year": 4,
  "hour-value": 75
}

module.exports = {
  get() {
    return data;
  },

  update(newData) {
    data = newData;
  }
};