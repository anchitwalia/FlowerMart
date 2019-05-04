var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const config = require('../../config')
const mongouser = config.mongouser
const mongopwd = config.mongopwd

const URL = 'mongodb://' + mongouser + ':' + mongopwd + '@localhost:27017/flowerMart';

mongoose.connect(URL, {useNewUrlParser: true}, function(err1, db1) {
  if (err1) {
    console.log("Error. Not Connected"+ "\n");
  }
  else {
    console.log("Connected with the DataBase"+ "\n");
  }
})

var orderSchema = mongoose.Schema({
    orderId: {type: Number, required: true},
    flowerName: { type: String, required: true },
    flowerPrice: { type: String, required: true },
    userName: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    mobile: { type: String, required: true },
    city: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true },
    isShipped: { type: Boolean, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true }
})

var orderModel = mongoose.model('orderModel', orderSchema, "order");

module.exports.findOrder = (query, callback) => {
  orderModel.find(query ,callback);
}

module.exports.findLast = (query, callback) => {
  orderModel.findOne(query, orderModel.orderId ,callback).sort({ _id: -1 });
}

module.exports.addOrder = (order, callback) => {
  orderModel.create(order, callback)
}
module.exports.updateOrder = (query, order, callback) => {
  orderModel.findOneAndUpdate(query, order, callback);
}
module.exports.deleteOrder = (query, callback) => {
  orderModel.findOneAndRemove(query, callback);
}