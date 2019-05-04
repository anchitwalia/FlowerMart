const mongoose = require('mongoose');
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

var flowerSchema = mongoose.Schema({
  flowerName: { type: String, required: true },
  flowerPrice: String,
  isAvailable: Boolean,
  imgPath: String
})

var flowerModel = mongoose.model('flowerModel', flowerSchema, "flower");


module.exports.find = (query, callback) => {
  flowerModel.findOne(query, callback);
}
module.exports.findAll = (callback) => {
  flowerModel.find(callback);
}
module.exports.addFlower = (flower, callback) => {
  flowerModel.create(flower, callback)
}
module.exports.updateFlower = (query, flower, callback) => {
  flowerModel.findOneAndUpdate(query, flower, callback);
}
module.exports.deleteFlower = (query, callback) => {
  flowerModel.findOneAndRemove(query, callback);
}