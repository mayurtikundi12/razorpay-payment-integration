let mongoose = require('mongoose');
let BusinessGroupModel = mongoose.model('BusinessGroupSchema');
let BusinessModel = mongoose.model('BusinessSchema');
let Joi = require('joi')
let BusinessGroupValidation = require('../models/business_group.model') ;

/**
  * Adds a new group
  *    @postRequest
  *    @body {string}  group_name -  id of the institute 
  *    @body {Array}  tags - name of the institute  
*/
module.exports.add_business_group = (req,res)=>{
    try{
        let body = req.body ;
        Joi.validate(body,BusinessGroupValidation.add).then(joiResult=>{

           let busines_group = new  BusinessGroupModel(joiResult);
           busines_group.save((error,dbRes)=>{
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
  * Deletes an existing group
  *    @deleteRequest
  *    @body {string}  _id -  id of the institute 
*/
module.exports.delete_business_group = (req,res)=>{
    try{
        let body = req.body ;
        Joi.validate({
            _id:body._id ,  
        },BusinessGroupValidation.delete).then(joiResult=>{

           BusinessGroupModel.findByIdAndRemove(joiResult._id,(error,dbRes)=>{
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
  * updates a group
  *    @puttRequest
  *    @body {string}  group_name -  id of the institute 
  *    @body {Array}  tags - name of the institute  
*/
module.exports.update_business_group = (req,res)=>{
    try{
        let body = req.body ;
        Joi.validate({
            _id:body._id ,  
            tags  :body.tags 
        },BusinessGroupValidation.update).then(joiResult=>{

           BusinessGroupModel.findOneAndUpdate({_id:joiResult._id},joiResult,(error,dbRes)=>{
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
  * Adds a new group
  *    @getRequest
  *    @body {string}  group_name -  id of the institute 
  *    @body {Array}  tags - name of the institute  
*/
module.exports.get_children = (req,res)=>{
    try{
        let params = req.params ;
        Joi.validate({
            _id:params._id,
        },BusinessGroupValidation.getChildren).then(joiResult=>{
            console.log("joi ",joiResult)
           BusinessGroupModel.aggregate([
               {$match:{"_id":mongoose.Types.ObjectId(joiResult._id)}},
               {
                $lookup:
                  {
                    from: "business_data",
                    localField: "_id",
                    foreignField: "group_id",
                    as: "children"
                  }
             } 
           ]).exec((error,dbRes)=>{
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
module.exports.get_all_business_group = (req,res)=>{
    try{
   
           BusinessGroupModel.find((error,dbRes)=>{
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




