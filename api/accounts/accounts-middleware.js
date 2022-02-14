const db = require('../../data/db-config');
const Accounts = require('./accounts-model');


function checkAccountPayload (req, res, next) {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
  const { name, budget } = req.body;
  if (!req.body.name == undefined || !req.body.budget == undefined) {
    res.status(400).json({
      message: "name and budget are required"
    })
  } else if (!req.body.name.trim().length < 3 || !req.body.name.trim().length > 100){
    res.status(400).json({
      message: "too large or too small"
    })
  } else if (typeof req.body.budget != 'number' ){
    res.status(400).json({
      message: "budget of account must be a number"
    })
  } else if (req.body.budget < 0 || req.body.budget > 1000000){
    res.status(400).json({
      message: "budget of account is too large or too small"
    })
  } else {
    next();
  }
};

function checkAccountNameUnique (req, res, next) {
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
      res.status(400).json({
        message: "name and budget are required"
      })
      next()
    })
}

function checkAccountId (req, res, next) {
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
      res.status(404).json({
        message: "account not found"
      })
      next();
    })  
}

module.exports = {
  checkAccountId,
  checkAccountPayload,
  checkAccountNameUnique
}