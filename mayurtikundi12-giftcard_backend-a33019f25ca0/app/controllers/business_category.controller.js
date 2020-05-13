let mongoose = require('mongoose');
let BusinessCategoryModel = mongoose.model('BusinessCategorySchema');
let Joi = require('joi')
let BusinessCategoryValidation = require('../models/business_category.model') ;

/**
  * Adds a new category
  *    @postRequest
  *    @body {string}  category_name -  id of the institute 
  *    @body {Array}  tags - name of the institute  
*/
module.exports.add_business_category = (req,res)=>{
    try{
        let body = req.body ;
        Joi.validate({
            category_name:body.category_name ,  
            tags  :body.tags 
        },BusinessCategoryValidation.add).then(joiResult=>{

           let busines_category = new  BusinessCategoryModel(joiResult);
           busines_category.save((error,dbRes)=>{
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
  *    @body {string}  _id -  id of the institute 
*/
module.exports.delete_business_category = (req,res)=>{
    try{
        let body = req.body ;
        Joi.validate({
            _id:body._id ,  
        },BusinessCategoryValidation.delete).then(joiResult=>{

           BusinessCategoryModel.findByIdAndRemove(joiResult._id,(error,dbRes)=>{
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
module.exports.update_business_category = (req,res)=>{
    try{
        let body = req.body ;
        Joi.validate({
            _id:body._id ,  
            tags  :body.tags 
        },BusinessCategoryValidation.update).then(joiResult=>{

           BusinessCategoryModel.findOneAndUpdate({_id:joiResult._id},joiResult,(error,dbRes)=>{
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
module.exports.get_single_business_category = (req,res)=>{
    try{
        let params = req.params ;
        Joi.validate({
            _id:params._id,
        },BusinessCategoryValidation.getSingle).then(joiResult=>{

           BusinessCategoryModel.findOne(joiResult,(error,dbRes)=>{
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
module.exports.get_all_business_category = (req,res)=>{
    try{
   
           BusinessCategoryModel.find((error,dbRes)=>{
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




