const {CustomAPIError} = require('../errors/error')

const errorhandler = (err, req, res) => {
    if (err instanceof CustomAPIError){
        res.status(err.statusCode).json({msg: err.message});
    }else{
        res.status(500).json('Internal Server Error, please try again later');
    }
}

module.exports = errorhandler;