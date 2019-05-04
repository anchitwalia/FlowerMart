var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const config = require('../../config')
const mongouser = config.mongouser
const mongopwd = config.mongopwd

const URL = 'mongodb://' + mongouser + ':' + mongopwd + '@localhost:27017/flowerMart';

var Count = 5;
var i = 0;

mongoose.connect(URL, {useNewUrlParser: true}, function(err1, db1) {
  if (err1) {
    console.log("Error. Not Connected"+ "\n");
  }
  else {
    console.log("Connected with the DataBase"+ "\n");
  }
})



var userSchema = mongoose.Schema({
  fullName: { type: String, required: true },
  userName: { type: String, required: true, unique: true},
  userType: { type: String, required: true },
  password: { type: String, required: true },
})

module.exports = mongoose.model('userModel', userSchema);

var userModel = mongoose.model('userModel', userSchema, "user");

module.exports.find = (query, callback) => {
  userModel.findOne(query ,callback);
}

module.exports.addUser = (user, callback) => {
  userModel.create(user, callback)
}
module.exports.updateUser = (query, user, callback) => {
  userModel.findOneAndUpdate(query, user, callback);
}
module.exports.deleteUser = (query, callback) => {
  userModel.findOneAndRemove(query, callback);
}