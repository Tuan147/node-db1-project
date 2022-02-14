const db = require('../../data/db-config');

async function getAll() {
  // DO YOUR MAGIC
  return db('accounts')
}

async function getById() {
  // DO YOUR MAGIC
  return db('accounts').where({accountsid: id})
}

async function create({account}) {
  // DO YOUR MAGIC
  let result = await db('accounts').insert(account);
  let id = result[0]
  return {
    account,
    accountsid: id
  }
}

async function updateById(accountsid, account) {
  // DO YOUR MAGIC
  await db('accounts').where({accountsid: id}).updateById({account})
  return {
    account,
    accountsid
  }
}

async function deleteById(id) {
  // DO YOUR MAGIC
  let result = await getById(id);
  await db('accounts').where({accountsid: id}).del();
  return result;
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
