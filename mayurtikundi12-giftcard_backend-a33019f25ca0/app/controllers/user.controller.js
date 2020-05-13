let mongoose = require('mongoose');
let UserModel = mongoose.model('UserSchema');
let Joi = require('joi')
let UserValidation = require('../models/user.model');
let firebase = require('../helpers/firebase');
let jwt = require('../helpers/validateToken');
/**
 * Adds a new category
 *    @postRequest
 *    @body {string}  category_name -  id of the institute 
 *    @body {Array}  tags - name of the institute  
 */
module.exports.login = (req, res) => {
    try {
        let body = req.body;
        Joi.validate(body, UserValidation.login).then(joiResult => {
            firebase.auth().getUser(joiResult.uid).then(data => {
                

                var query = {
                    uid:joiResult.uid
                },
                    update = {
                        uid:joiResult.uid,
                        email: data.email,
                        phoneNumber:data.phoneNumber,
                        password:"",
                        metadata:data.metadata,
                        createAt:(new Date()).toDateString(),
                        updatedAt:(new Date()).toDateString()
                    },
                    options = {
                        upsert: true,
                        new: true,
                        setDefaultsOnInsert: true
                    };
                UserModel.findOneAndUpdate(query, update, options, function (error, dbRes) {
                    if (error) {
                        console.log("this is the error ", error);
                        res.status(500).json({
                            message: error.message,
                            payload: null,
                            error: "some error saving the class"
                        });
                    } else {
                        let jwToken = jwt.createToken(dbRes["_id"]);

                        res.status(200).json({
                            message: "class added successfully",
                            payload: dbRes,
                            error: null,
                            token:jwToken
                        });
                    }
                });
            }).catch(error => {
                res.status(500).json({
                    message: error.message,
                    payload: null,
                    error: "some error saving the class"
                });
            })

        }).catch(err => {
            res.status(400).json({
                message: err.message,
                payload: null,
                error: "required fields were not set"
            })
        })

    } catch (error) {
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
module.exports.delete_business_category = (req, res) => {
    try {
        let body = req.body;
        Joi.validate({
            _id: body._id,
        }, UserValidation.delete).then(joiResult => {

            UserModel.findByIdAndRemove(joiResult._id, (error, dbRes) => {
                if (error) {
                    console.log("this is the error ", error);
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

        }).catch(err => {
            res.status(400).json({
                message: err.message,
                payload: null,
                error: "required fields were not set"
            })
        })

    } catch (error) {
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
module.exports.update_business_category = (req, res) => {
    try {
        let body = req.body;
        Joi.validate({
            _id: body._id,
            tags: body.tags
        }, UserValidation.update).then(joiResult => {

            UserModel.findOneAndUpdate({
                _id: joiResult._id
            }, joiResult, (error, dbRes) => {
                if (error) {
                    console.log("this is the error ", error);
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

        }).catch(err => {
            res.status(400).json({
                message: err.message,
                payload: null,
                error: "required fields were not set"
            })
        })

    } catch (error) {
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
module.exports.get_single_business_category = (req, res) => {
    try {
        let params = req.params;
        Joi.validate({
            _id: params._id,
        }, UserValidation.getSingle).then(joiResult => {

            UserModel.findOne(joiResult, (error, dbRes) => {
                if (error) {
                    console.log("this is the error ", error);
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

        }).catch(err => {
            res.status(400).json({
                message: err.message,
                payload: null,
                error: "required fields were not set"
            })
        })

    } catch (error) {
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
module.exports.get_all_user = (req, res) => {
    try {

        UserModel.find((error, dbRes) => {
            if (error) {
                console.log("this is the error ", error);
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
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message,
            payload: null,
            error: "some error saving the class"
        });
    }
}