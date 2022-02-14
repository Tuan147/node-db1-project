const db = require('../../data/db-config');
const Accounts = require('./accounts-model');


exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
  const { name, budget } = req.body;
  if (name == undefined || budget == undefined) {
    res.status(400).json({
      message: "name and budget are required"
    })
  } else if (!name.trim().length < 3 || !name.trim().length > 100){
    res.status(400).json({
      message: "name of account must be between 3 and 100"
    })
  } else if (typeof budget !== 'number' || NaN(budget)){
    res.status(400).json({
      message: "budget of account must be a number"
    })
  } else if (budget < 0 || budget > 1000000){
    res.status(400).json({
      message: "budget of account is too large or too small"
    })
  }
};

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
  db('accounts').where({name: req.body.name})
    .then(account => {
      if (!account) {
        next()
      } else {
        res.status(400).json({
          message: "that name is taken"
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "error finding account"
      })
    })
}

exports.checkAccountId = (req, res, next) => {
  // DO YOUR MAGIC
  const { id } = req.params.id;
  Accounts.getById(id)
    .then(account => {
      if (!account) {
        res.status(404).json({
          message: "account not found"
        })
      } else {
        next()
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "error finding account id"
      })
    })
}
