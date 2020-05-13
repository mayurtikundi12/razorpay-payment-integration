let mongoose = require('mongoose');
let BusinessEnquiryModel = mongoose.model('BusinessEnquirySchema');
let Joi = require('joi')
let BusinessEnquiryValidation = require('../models/business_enquiry.model') ;
let mailer = require('../helpers/mailer');
/**
  * Adds a new enquiry
  *    @postRequest
  *    @body {string}  enquiry_name -  id of the institute 
  *    @body {Array}  tags - name of the institute  
*/
module.exports.add_business_enquiry = (req,res)=>{
    try{
        let body = req.body ;
        Joi.validate(body,BusinessEnquiryValidation.add).then(joiResult=>{
            joiResult["date_of_request"] = (new Date()).toDateString();
           let busines_enquiry = new  BusinessEnquiryModel(joiResult);
           busines_enquiry.save((error,dbRes)=>{
               if (error) {
                   console.log("this is the error ",error);
                   if(error.code == 11000){
                    res.status(200).json({
                        message: "business enquiry already present",
                        payload: null,
                        error: null
                    });
                   }else{
                    res.status(500).json({
                        message: error.message,
                        payload: null,
                        error: "some error saving the class"
                    });
                   }
                
               } else {
                let enquiryMail = "mayurtikundi12@gmail.com" 
                mailer.sendMail("New Business Enquiry", joiResult, enquiryMail,"new_business_enquiry").then((err, mailResponse) => {
                    if (err) {
                        res.status(500).json({
                            message: error.message,
                            payload: null,
                            error: "some error sending mail to the business owner"
                        });
                    } else {
                        dbRes.emailSent = true;
                        res.status(200).json({
                            message: "business added success",
                            payload: dbRes,
                            error: null
                        });
                    }
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
  * Deletes an existing enquiry
  *    @deleteRequest
  *    @body {string}  _id -  id of the institute 
*/
module.exports.delete_business_enquiry = (req,res)=>{
    try{
        let body = req.body ;
        Joi.validate({
            _id:body._id ,  
        },BusinessEnquiryValidation.delete).then(joiResult=>{

           BusinessEnquiryModel.findByIdAndRemove(joiResult._id,(error,dbRes)=>{
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
  * updates a enquiry
  *    @puttRequest
  *    @body {string}  enquiry_name -  id of the institute 
  *    @body {Array}  tags - name of the institute  
*/
module.exports.update_business_enquiry = (req,res)=>{
    try{
        let body = req.body ;
        Joi.validate(body,BusinessEnquiryValidation.update).then(joiResult=>{

           BusinessEnquiryModel.findOneAndUpdate({_id:joiResult._id},joiResult,(error,dbRes)=>{
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
  * Adds a new enquiry
  *    @getRequest
  *    @body {string}  enquiry_name -  id of the institute 
  *    @body {Array}  tags - name of the institute  
*/
module.exports.get_single_business_enquiry = (req,res)=>{
    try{
        let params = req.params ;
        Joi.validate({
            _id:params._id,
        },BusinessEnquiryValidation.getSingle).then(joiResult=>{

           BusinessEnquiryModel.findOne(joiResult,(error,dbRes)=>{
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
module.exports.get_all_business_enquiry = (req,res)=>{
    try{
   
           BusinessEnquiryModel.find((error,dbRes)=>{
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




