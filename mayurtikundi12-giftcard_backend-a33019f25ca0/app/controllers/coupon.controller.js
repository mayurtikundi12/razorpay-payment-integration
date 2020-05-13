let mongoose = require('mongoose');
let CouponSchema = mongoose.model('CouponSchema');
let Joi = require('joi')
let CouponValidation = require('../models/coupon.model') ;

/**
  * Adds a new coupon
  *    @postRequest
*/
module.exports.add_coupon = (req,res)=>{
    try{
        let body = req.body ;
        Joi.validate({
            business_id:body.business_id,
            amount: body.amount,
            commision: body.commision,
            validity_period:body.validity_period,
            name:body.name,
            description:body.description
        },CouponValidation.add).then(joiResult=>{

           let coupon = new  CouponSchema(joiResult);
           coupon.save((error,dbRes)=>{
               if (error) {
                   console.log("this is the error ",error);
                res.status(500).json({
                    message: error.message,
                    payload: null,
                    error: "some error saving the class"
                });
               } else {
                res.status(200).json({
                    message: "class added successfully",
                    payload: dbRes,
                    error: null
                }); 
               }
           })
          
        }).catch(err=>{
            res.status(400).json({
                message: err.message,
                payload: null,
                error: "required fields were not set"
            })
        })

    }catch(error){
        res.status(500).json({
            message: error.message,
            payload: null,
            error: "some error saving the class"
        });
    }
}


/**
  * Deletes an existing category
  *    @deleteRequest
*/
module.exports.delete_coupon = (req,res)=>{
    try{
        let body = req.body ;
        Joi.validate({
            _id:body._id ,  
        },CouponValidation.delete).then(joiResult=>{
           CouponSchema.findByIdAndRemove(joiResult._id,(error,dbRes)=>{
               if (error) {
                   console.log("this is the error ",error);
                res.status(500).json({
                    message: error.message,
                    payload: null,
                    error: "some error saving the class"
                });
               } else {
                res.status(200).json({
                    message: "class added successfully",
                    payload: dbRes,
                    error: null
                }); 
               }
           })
          
        }).catch(err=>{
            res.status(400).json({
                message: err.message,
                payload: null,
                error: "required fields were not set"
            })
        })

    }catch(error){
        res.status(500).json({
            message: error.message,
            payload: null,
            error: "some error saving the class"
        });
    }
}



/**
  * updates a category
  *    @puttRequest
  *    @body {string}  category_name -  id of the institute 
  *    @body {Array}  tags - name of the institute  
*/
module.exports.update_coupon = (req,res)=>{
    try{
        let body = req.body ;
        Joi.validate({
            _id:body._id,
            amount: body.amount,
            commision: body.commision,
            validity_period:body.validity_period,
            name:body.name,
            description:body.description
        },CouponValidation.update).then(joiResult=>{

           CouponSchema.findByIdAndUpdate(joiResult._id,joiResult,(error,dbRes)=>{
               if (error) {
                   console.log("this is the error ",error);
                res.status(500).json({
                    message: error.message,
                    payload: null,
                    error: "some error saving the class"
                });
               } else {
                res.status(200).json({
                    message: "class added successfully",
                    payload: dbRes,
                    error: null
                }); 
               }
           })
          
        }).catch(err=>{
            res.status(400).json({
                message: err.message,
                payload: null,
                error: "required fields were not set"
            })
        })

    }catch(error){
        res.status(500).json({
            message: error.message,
            payload: null,
            error: "some error saving the class"
        });
    }
}





/**
  * Adds a new category
  *    @getRequest
  *    @body {string}  category_name -  id of the institute 
  *    @body {Array}  tags - name of the institute  
*/
module.exports.get_single_coupon = (req,res)=>{
    try{
        let params = req.params ;
        Joi.validate({
            _id:params._id,
        },CouponValidation.getSingle).then(joiResult=>{

           CouponSchema.findById(joiResult._id,(error,dbRes)=>{
               if (error) {
                   console.log("this is the error ",error);
                res.status(500).json({
                    message: error.message,
                    payload: null,
                    error: "some error saving the class"
                });
               } else {
                res.status(200).json({
                    message: "class added successfully",
                    payload: dbRes,
                    error: null
                }); 
               }
           })
          
        }).catch(err=>{
            res.status(400).json({
                message: err.message,
                payload: null,
                error: "required fields were not set"
            })
        })

    }catch(error){
        res.status(500).json({
            message: error.message,
            payload: null,
            error: "some error saving the class"
        });
    }
}

/**
  * gets all categories
  *    @postRequest
*/
module.exports.get_all_coupons = (req,res)=>{
    try{
           CouponSchema.find().limit(30).exec((error,dbRes)=>{
               if (error) {
                   console.log("this is the error ",error);
                res.status(500).json({
                    message: error.message,
                    payload: null,
                    error: "some error saving the class"
                });
               } else {
                res.status(200).json({
                    message: "class added successfully",
                    payload: dbRes,
                    error: null
                }); 
               }
           })
    }catch(error){
        console.log(error)
        res.status(500).json({
            message: error.message,
            payload: null,
            error: "some error saving the class"
        });
    }
}


module.exports.get_all_coupon_by_business = (req,res)=>{
    try{
        let params = req.params ;
        Joi.validate({
            business_id:params.business_id,
        },CouponValidation.getAllByBusinessId).then(joiResult=>{

           CouponSchema.find(joiResult,(error,dbRes)=>{
               if (error) {
                   console.log("this is the error ",error);
                res.status(500).json({
                    message: error.message,
                    payload: null,
                    error: "some error saving the class"
                });
               } else {
                res.status(200).json({
                    message: "class added successfully",
                    payload: dbRes,
                    error: null
                }); 
               }
           })
          
        }).catch(err=>{
            res.status(400).json({
                message: err.message,
                payload: null,
                error: "required fields were not set"
            })
        })

    }catch(error){
        res.status(500).json({
            message: error.message,
            payload: null,
            error: "some error saving the class"
        });
    }
}





