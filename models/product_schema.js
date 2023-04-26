const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = new Schema({
  product_image: String,
  product_name: String,
//   imageDetails: Array(new Schema({
//     path: String,
//     name: String,
//   })),
  price: Number,
  description: String,
  quantity: Number

});
module.exports = mongoose.model("products", productSchema);