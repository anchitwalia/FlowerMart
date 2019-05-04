const express = require('express');
const router = express.Router();
const multer = require('multer');

const Order = require('../Model/OrderModel');
const upload = multer();

const checkAuth = require('../Middleware/check'); 

router.post('/getorder', upload.none(), checkAuth, (req, res, next) => {
  Order.findOrder((error, response) => {
    if(error) {
      console.log('Error : ' + error);
      return res.status(500).send(error);
    }
    else {
      if(response.length == 0) {
        console.log('Order Empty');
        return res.status(204).send(response);
      }
      else {
        console.log('Get Order Sucessful');
        return res.status(200).send(response);
      }
    }
  })
})

router.post('/addorder', upload.none(), checkAuth, (req, res, next) => {
  Order.findLast((error, response) => {
    if(error) {
      console.log("Get ID Failed");
      return res.status(500).json({
        error : error
      });
    }
    else {
      console.log("Get ID Successfull");
      var id;
      if(response == null) {
        id = 100000;
      }
      else {
        id = response.orderId + 1;
      }
      const order = ({
        orderId: id,
        flowerName: req.body.flowerName,
        flowerPrice: req.body.flowerPrice,
        userName: req.body.userName,
        name: req.body.name,
        address: req.body.address,
        mobile: req.body.mobile,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country,
        isShipped: req.body.isShipped,
        date: req.body.date,
        time: req.body.time
      })
      Order.addOrder(order, (error2, response2) => {
        if(error) {
          console.log('Create Error : ' + error2);
          return res.status(500).send(error2);
        }
        else {
          console.log('Create Order Sucessful');
          return res.status(201).json({
            message: 'Create Order Sucessful'
          });
        }
      })
    }
  })
}) 

router.post('/getorderbyvalue', upload.none(), checkAuth, (req, res, next) => {
  const value = req.body.value;
  var query;
  if(isNaN(value)) {
    if(value == 'true' || value == 'false') {
      query =  { isShipped:  value };
    } else {
      query = { $or: [ { userName: { $regex: value + '.*' } } , 
                      { flowerName: { $regex: value + '.*' } }, 
                      { date: { $regex: value + '.*' } }, 
                      { time: { $regex: value + '.*' } } ] }
    }
  }
  else {
    query = { orderId: value };
  }
  Order.findOrder(query, (error, response) => {
    if(error) {
      console.log('Search Error : ' + error);
      return res.status(500).send(error);
    }
    else {
      if(response.length == 0) {
        console.log('Search Empty');
        return res.status(204).send(response);
      }
      else {
        console.log('Search Order Sucessful');
        return res.status(200).send(response);
      }
    }
  })
})

router.post('/updateorder', upload.none(), checkAuth, (req, res, next) => {
  var query = JSON.parse(req.body.query);
  var newValue = JSON.parse(req.body.value);
  Order.updateOrder(query, newValue, (error, response) => {
    if(error) {
      console.log('Update Error : ' + error);
      return res.status(500).json({
        error: error,
        message: 'Update Error'
      });
    }
    else {
      console.log('Update Order Sucessful');
      return res.status(200).json({
        message: 'Order Updated'
      });
    }
  })
})

module.exports = router;