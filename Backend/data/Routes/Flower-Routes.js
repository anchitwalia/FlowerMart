const express = require('express');
const Flower = require('../Model/FlowerModel');
const multer = require('multer');
const checkAuth = require('../Middleware/check');

var fs = require('fs');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'data/staticContent/assets/images/flower/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname + '.jpg');
    }
})

const upload = multer({ storage: storage });

router.post('/addimage', upload.single('image'), checkAuth, (req,res, next) => {
  if(!req.file) {
    console.log('Image not Added');
      return res.status(500).json({
        error: 'Image not Added'
    });
  }
  else {
    console.log('Image Added');
    return res.status(201).json({
      message: 'Image Added'
    });
  }
})

router.post('/addflower', upload.none(), checkAuth, (req, res, next) => {
  Flower.find({flowerName: req.body.flowerName}, (error, result) => {
    if(error) {
      console.log(error);
      return res.status(500).json({
        error: err
      });
    }
    else {
      if(!result) {
        const flower = ({
          flowerName: req.body.flowerName,
          flowerPrice: req.body.flowerPrice,
          isAvailable: req.body.isAvailable,
          imgPath: req.body.imgPath
        })
        Flower.addFlower(flower, (err, response) => {
          if(response) {
            console.log('Flower Added');
            return res.status(201).json({
              message: 'Flower Added'
            });
          }
          else {
            console.log(err);
            return res.status(500).json({
              error: err
            });
          }
        })
      }
      else {
        console.log('Flower Exist');
        return res.status(400).json({
          message: 'Flower Exist'
        });
      }
    }
  })
})

router.post('/getflower', upload.none(), checkAuth, (req, res, next) => {
  Flower.findAll((error, response) => {
    if(error) {
      console.log("Get Flower Failed");
      res.status(501).send(error);
    }
    else {
      if(!response) {
        console.log("404 Error");
        return res.status(404).json({
          message: 'Flower not found'
        });
      }
      else {
        console.log("Get Flower Successfull");
        return res.status(200).send(response);
      }
    }
  })
})

router.post('/deleteflower', upload.none(), checkAuth, (req, res, next) => {
  const query = {flowerName: req.body.flowerName };
  Flower.find(query, (error, response) => {
    if(error) {
      console.log(error);
      return res.status(501).json({
        error: error,
        message: 'Flower Not Found'
      });
    }
    else {
      Flower.deleteFlower(query, (err, resp) => {
        if(resp) {
          var filePath = 'data/staticContent/' + req.body.imgPath;
          try {
            fs.unlinkSync(filePath)
          }
          catch (er) {
            console.log(er);
          }
          console.log('Query Deleted');
          return res.status(200).json({
            message: 'Query Deleted'
          })
        }
        else {
          console.log(error);
          return res.status(501).json({
            error: error,
            message: 'Server Error'
          });
        }
      })
    }
  })
})

router.post('/updateflower', upload.none(), checkAuth, (req, res, next) => {
  const query = { flowerName: req.body.flowerName };
  const newValue = {$set: {isAvailable: req.body.isAvailable}};
  Flower.find(query, (error, response) => {
    if(error) {
      console.log(error);
      return res.status(501).json({
        error: error
      });
    }
    else {
      Flower.updateFlower(query, newValue, (err, resp) => {
        if(resp) {
          console.log('Query Updated');
          return res.status(200).json({
            message: 'Query Updated'
          })
        }
        else {
          console.log(error);
          return res.status(501).json({
            error: error
          });
        }
      })
    }
  })
})

module.exports = router;