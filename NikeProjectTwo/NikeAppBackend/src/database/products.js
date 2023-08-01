const { ObjectId } = require('mongodb');
const db = require('./db');

const getAllProducts = async () => {
  return await db.products.find().toArray();
};

const getProduct = async (id) => {
  return await db.products.findOne({ _id: new ObjectId(id) });
};

module.exports = {
  getAllProducts,
  getProduct,
};