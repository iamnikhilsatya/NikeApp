const { MongoClient } = require('mongodb');
const uri =
  'mongodb+srv://satyanikhil2000:TZIfoSzp59tcoavK@cluster0.annmros.mongodb.net/?retryWrites=true&w=majority?directConnection=true';

const client = new MongoClient(uri);



const database = client.db('test');
const products = database.collection('products');
const orders = database.collection('orders');


module.exports = {
  products,
  orders,
};