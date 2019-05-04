const express = require('express');
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Model/UserModel');

const router = express.Router();
const upload = multer();

const checkAuth = require('../Middleware/check');

router.post('/checkauth', upload.none(), checkAuth, (req, res, next) => {
  res.status(200).json({
    message: 'Authenticated',
    token: req.body.Token
  })
});

router.get('/checkconnect', (req, res, next) => {
  if(req) {
    console.log("Connectivity Tested");
    res.status(200).json({
      message: 'Connectivity Exist',
      status: true
    })
  }
  else {
    res.status(404).json({
      message: 'Connectivity Does Not Exist',
      status: false
    })
  }
})

router.post('/login', upload.none(), (req, res, next) => {
    User.find({ userName: req.body.userName }, (err, result) => {
      if(err) {
        console.log(err);
        return res.status(500).json({
          error: err
        });
      }
      else {
        if(!result) {
          console.log("Not Authenticated");
          return res.status(401).json({
            message: 'Not Authenticated'
          });
        }
        else{{
          const a = bcrypt.compare(req.body.password, result.password, (err, resp) => {
            if(err) {
              console.log(err);
              return res.status(401).json({
                message: 'Auth Failed'
              });
            }
            else {
              if(resp) {
                const token = jwt.sign({
                  userName: result.userName,
                  userId: result._id,
                  userType: result.userType
                },
                'ABCDEFGHIjklmnopqrstuvwxyz',
                {
                  expiresIn: '1h'
                },
                )
                return res.status(200).json({
                  message: 'Auth Successful',
                  userName: result.userName,
                  userType: result.userType,
                  token: token
                });
              }
              else {
                console.log(err);
                return res.status(401).json({
                message: 'Auth Failed'
              });
              }
            }
          });
        }}
      }
    })
})

router.post('/signup', upload.none(), (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if(err) {
      return res.status(500).json({
        error: err
      });
    } 
    else {
      const user = new User ({
        fullName: req.body.fullName,
        userName: req.body.userName,
        userType: req.body.userType,
        password: hash
      });
      User.addUser(user, (err, result) => {
        if(err) {
          console.log(err);
          res.status(501).json({
            error: err
          })
        }
        else {
          res.status(201).json({
            result: 'User Created'
          })
        }
      });
    }
  })
});

module.exports = router;