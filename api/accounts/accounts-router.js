const express = require('express');

const { checkAccountPayload, checkAccountId } = require('./accounts-middleware');

const Account = require('./accounts-model');

const router = express.Router()

router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const data = await Account.getAll();
    res.json(data)
  }
  catch (e) {
    next(e)
  }
});

router.get('/:id', checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const data = await Account.getById(req.params.id);
    res.json(data)
  }
  catch (e) {
    next(e)
  }
});

router.post('/', checkAccountPayload, (req, res, next) => {
  // DO YOUR MAGIC
  Account.create(req.body)
    .then(newAccount => {
      res.status(201).json(newAccount)
    })
    .catch(err => {
      res.status(400).json({message: "name or budget are undefined"})
    })
})

router.put('/:id', checkAccountPayload, checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const data = await Account.updateById(req.params.id, req.body)
    res.json(data)
  }
  catch (e) {
    next(e)
  }
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const data = await Account.deleteById(req.params.id)
    res.json(data)
  }
  catch (e) {
    next(e)
  }
});

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(err.status || 500).json({
    message: "error finding account"
  })
})

module.exports = router;
