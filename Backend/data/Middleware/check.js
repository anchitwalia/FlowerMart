const jwt = require('jsonwebtoken');
const multer = require('multer');

const upload = multer();

module.exports = (req, res, next) => {
    try {
        const decoded = jwt.verify(req.body.Token, 'ABCDEFGHIjklmnopqrstuvwxyz');
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth Failed'
        });
    }
}