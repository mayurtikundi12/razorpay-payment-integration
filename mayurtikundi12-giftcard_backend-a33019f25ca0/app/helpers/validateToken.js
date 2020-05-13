// let BusinessModel = mongoose.model('BusinessSchema');
let CONFIG = require('../config/config');
let jwt = require('jsonwebtoken');
module.exports.validateToken = (req, res, next) => {
    var token = req.headers['x-access-token'];
  if(token){
                // console.log("this is my token  ==>",token);
                jwt.verify(token, CONFIG.SECRETKEY, function (error, jwtres) {
                    if (error) {
                        res.status(401).json({
                            payload: {
                                auth: false,
                                message: 'unauthorized token please go away',
                                token: null
                            }
                        });
                    } else {
                        // BusinessModel.findById(Object(jwtres['id']), (err) => {
                        //     if (err) {
                        //         res.status(500).json({
                        //             payload: {
                        //                 auth: false,
                        //                 message: 'failed to get the data from server',
                        //                 token: null
                        //             }
                        //         });
                        //     } else {
                                next();
                            // }
                        // })
                    }
                })
            }
   else{
    res.status(404).json({
        payload: {
            auth: false,
            message: 'token not found',
            token: null,
            JoiError:err
        }
    })
   }
     
    // console.log("token is here",token);
    

}


module.exports.createToken = (id)=>{
    return  jwt.sign({
        id: id
    }, CONFIG.SECRETKEY);
}
