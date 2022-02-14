const db = require('../../data/db-config');

const getAll = () => {
  // DO YOUR MAGIC
  return db('accounts')
}

const getById = id => {
  // DO YOUR MAGIC
  return db('accounts').where({accountsid: id})
}

const create = account => {
  // DO YOUR MAGIC
  let result = db('accounts').insert(account);
  return result
}

const updateById = (id, account) => {
  // DO YOUR MAGIC
  db('accounts').where({accountsid: id}).updateById({account})
  return {
    account,
    accountsid
  }
}

const deleteById = id => {
  // DO YOUR MAGIC
  let result = getById(id);
  db('accounts').where({accountsid: id}).del();
  return result;
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
