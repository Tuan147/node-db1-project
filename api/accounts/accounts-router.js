const router = require('express').Router();

const {checkAccountPayload, checkAccountId } = require('./accounts-middleware');

const Account = require('./accounts-model');

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

router.get('/:id', async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const data = await Account.getById(req.params.id);
    res.json(data)
  }
  catch (e) {
    next(e)
  }
});

router.post('/', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  Account.create(req.body)
    .then(newAccount => {
      res.status(201).json(newAccount)
    })
    .catch(err => {
      res.status(400).json({
        message: "could not find account ID"
      })
    })
})

router.put('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  const { id } = req.params.id
  Account.updateById(id, req.body)
    .then(updateAccount => {
      res.status(200).json(updateAccount)
    })
    .catch(err => {
      res.status(400).json({
        message: "could not find account ID"
      })
    })
});

router.delete('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  const { id } = req.params.id
  Account.deleteById(id)
    .then(deleteAccount => {
      res.status(200).json(deleteAccount)
    })
    .catch(err => {
      res.status(400).json({
        message: "could not find account ID"
      })
    })
});

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(err.status || 500).json({
    message: "error finding account"
  })
})

module.exports = router;
