let mongoose = require('mongoose');
let DonationSchema = mongoose.model('DonationSchema');
let Joi = require('joi')
let DonationValidation = require('../models/donation.model') ;

/**
  * Adds a new donation
  *    @postRequest
*/
module.exports.add_donation = (req,res)=>{
    try{
        let body = req.body ;
        Joi.validate({
            business_id:body.business_id,
            commision: body.commision,
            name:body.name,
            description:body.description
        },DonationValidation.add).then(joiResult=>{

           let donation = new  DonationSchema(joiResult);
           donation.save((error,dbRes)=>{
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
module.exports.delete_donation = (req,res)=>{
    try{
        let body = req.body ;
        Joi.validate({
            _id:body._id ,  
        },DonationValidation.delete).then(joiResult=>{
           DonationSchema.findByIdAndRemove(joiResult._id,(error,dbRes)=>{
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
module.exports.update_donation = (req,res)=>{
    try{
        let body = req.body ;
        Joi.validate({
            _id:body._id,
            commision: body.commision,
            name:body.name,
            description:body.description
        },DonationValidation.update).then(joiResult=>{

           DonationSchema.findByIdAndUpdate(joiResult._id,joiResult,(error,dbRes)=>{
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
module.exports.get_single_donation = (req,res)=>{
    try{
        let params = req.params ;
        Joi.validate({
            _id:params._id,
        },DonationValidation.getSingle).then(joiResult=>{

           DonationSchema.findById(joiResult._id,(error,dbRes)=>{
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
module.exports.get_all_donations = (req,res)=>{
    try{
           DonationSchema.find().limit(30).exec((error,dbRes)=>{
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


module.exports.get_all_donation_by_business = (req,res)=>{
    try{
        let params = req.params ;
        Joi.validate({
            business_id:params.business_id,
        },DonationValidation.getAllByBusinessId).then(joiResult=>{

           DonationSchema.find(joiResult,(error,dbRes)=>{
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





