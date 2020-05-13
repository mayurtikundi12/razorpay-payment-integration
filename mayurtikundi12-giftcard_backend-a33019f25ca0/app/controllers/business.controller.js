let mongoose = require('mongoose');
let BusinessModel = mongoose.model('BusinessSchema');
let Joi = require('joi')
let BusinessValidation = require('../models/business.model');
var generator = require('generate-password');
let mailer = require('../helpers/mailer');
let CONFIG = require('../config/config');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
let upload = require('../helpers/s3uploader').s3Upload;




module.exports.add_business = (req, res) => {
    try {
        console.log("req", req.body);
        let body = req.body;

            upload(req, res, err => {

                if (err) {
                    console.log("there is an error in multer ", err);
                    res.status(500).json({
                        message: "some error in updating the logo image",
                        payload: null,
                        error: err
                    })
    
                } else {
                    let new_body = req.body ;
             
                    if(new_body.group_id){
                        new_body.group_id = mongoose.Types.ObjectId(new_body.group_id) ;
                    }

                    if (req.files && req.files["logo"]){
                        let logo = req.files["logo"][0];
                        if (logo.fieldname == "logo") {
                            new_body["logo"] = {
                                location : logo.location,
                                key:logo.key
                            };
                        }
                    }
                   
            Joi.validate(new_body, BusinessValidation.add).then(joiResult => {
                    saveData(joiResult,res);
                }
            ).catch(err => {
                console.log(err);
                res.status(400).json({
                    message: err.message,
                    payload: null,
                    error: "required fields were not set"
                })
            });
                }});
     

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message,
            payload: null,
            error: "some error saving the class"
        });
    }


    function saveData(joiResult,res){
        var password = generator.generate({
            length: 10,
            numbers: true
        });
        joiResult["token"] = password;
        let business = new BusinessModel(joiResult);

        business.save((error, dbRes) => {
            if (error) {
                console.log("this is the error ",error);
                if(error.code == 11000){
                 res.status(409).json({
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
             
            }else {


                mailer.sendMail("Account Successfully Created", {
                    username: joiResult["contact_email"],
                    password: password
                }, joiResult["contact_email"],"business_account_created").then((err, mailResponse) => {
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
    }


}


module.exports.delete_business = (req, res) => {
    try {
        let body = req.body;
        Joi.validate({
            _id: body._id,
        }, BusinessValidation.delete).then(joiResult => {

            BusinessModel.findByIdAndRemove(joiResult._id, (error, dbRes) => {
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
 *    @putRequest
 *    @body {string}  category_name -  id of the institute 
 *    @body {Array}  tags - name of the institute  
 */
module.exports.update_business = (req, res) => {
    try {
        upload(req, res, err => {

            if (err) {
                console.log("there is an error in multer ", err);
                res.status(500).json({
                    message: "some error in updating the logo image",
                    payload: null,
                    error: err
                })

            } else {
                let body = req.body ;
                console.log("files ",req.files.logo)
                let logo = null ;
                req.files.logo?logo=req.files.logo[0]:'';
                if(logo && logo.fieldname == "logo"){
                    body.logo = {
                        location:logo.location,
                        key:logo.key
                    }
                }
                // console.log("final bidy ",body)
            Joi.validate(body, BusinessValidation.update).then(joiResult => {

                        for (const key of Object.keys(joiResult)) {
                            if (joiResult[key]==undefined || joiResult[key]==null) {
                                delete joiResult[key];
                            }
                            if(joiResult.group_id){
                                joiResult.group_id = mongoose.Types.ObjectId(joiResult.group_id) ;
                            }
                        }
                        
                        BusinessModel.findOneAndUpdate({
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
                                if (dbRes) {
                                    res.status(200).json({
                                        message: "success",
                                        payload: dbRes,
                                        error: null
                                    });
                                }else{
                                    res.status(404).json({
                                        message: "data not found",
                                        payload: dbRes,
                                        error: null
                                    });
                                }
                            }
                        })

                    }).catch(err => {
                        res.status(400).json({
                            message: err.message,
                            payload: null,
                            error: "required fields were not set"
                        })
                    })
         
            }
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
module.exports.get_single_business = (req, res) => {
    try {
        let params = req.params;

        Joi.validate({
            _id: params._id,
        }, BusinessValidation.getSingle).then(joiResult => {

            BusinessModel.findById(joiResult._id, (error, dbRes) => {
                if (error) {
                    console.log("this is the error ", error);
                    res.status(500).json({
                        message: error.message,
                        payload: null,
                        error: "some error saving the class"
                    });
                } else {
                    if (dbRes) {
                        res.status(200).json({
                            message: "success",
                            payload: dbRes,
                            error: null
                        });
                    }else{
                        res.status(404).json({
                            message: "data not found",
                            payload: dbRes,
                            error: null
                        });
                    }
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
        console.log("error => ", error)
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
module.exports.get_all_business = (req, res) => {
    try {

        BusinessModel.find((error, dbRes) => {
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


/**
 * this function creates the password for the first time
 */
module.exports.createPassword = (req, res) => {
    try {
        let body = req.body;
        Joi.validate({
            email: body.email,
            old_password: body.old_password,
            new_password: body.new_password
        }, BusinessValidation.create_pass).then(joiResult => {


            BusinessModel.findOne({
                contact_email: joiResult.email
            }, (error, dbRes) => {
                if (error) {
                    console.log("this is the error ", error);
                    res.status(500).json({
                        message: error.message,
                        payload: null,
                        error: "some error saving the class"
                    });
                } else {
                    console.log(joiResult["old_password"], " && ", dbRes["token"])
                    if (joiResult["old_password"] == dbRes["token"] && dbRes["token"] !== "invalid") {

                        var salt = bcrypt.genSaltSync(10);
                        var passHash = bcrypt.hashSync(joiResult.new_password, salt);
                        dbRes["password"] = passHash;
                        dbRes["token"] = "invalid";

                        dbRes.save((error, finalDbRes) => {
                            if (error) {
                                res.status(500).json({
                                    message: error.message,
                                    payload: null,
                                    error: "some error saving the class"
                                });
                            } else {
                                delete finalDbRes["password"];
                                res.status(200).json({
                                    message: "class added successfully",
                                    payload: finalDbRes,
                                    error: null
                                });
                            }
                        })
                    } else {
                        res.status(401).json({
                            message: "password does not match",
                            payload: null,
                            error: "old password is not correct"
                        })
                    }
                }
            });
        }).catch(err => {
            res.status(400).json({
                message: err.message,
                payload: null,
                error: "required fields were not set"
            })
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


module.exports.updatePassword = (req, res) => {
    try {
        let body = req.body;
        Joi.validate({
            email: body.email,
            old_password: body.old_password,
            new_password: body.new_password
        }, BusinessValidation.update_pass).then(joiResult => {

            BusinessModel.findOne({
                contact_email: joiResult.email
            }, (error, dbRes) => {
                if (error) {
                    console.log("this is the error ", error);
                    res.status(500).json({
                        message: error.message,
                        payload: null,
                        error: "some error saving the class"
                    });
                } else {
                    console.log("joi ", joiResult.old_password, " kk ", dbRes.password)

                    let checkPass = bcrypt.compareSync(joiResult.old_password, dbRes.password)
                    if (checkPass) {
                        var salt = bcrypt.genSaltSync(10);
                        var passHash = bcrypt.hashSync(body.new_password, salt);
                        dbRes["password"] = passHash;
                        dbRes.save((error, finalDbRes) => {
                            if (error) {
                                res.status(500).json({
                                    message: error.message,
                                    payload: null,
                                    error: "some error saving the class"
                                });
                            } else {
                                delete finalDbRes["password"]
                                res.status(200).json({
                                    message: "class added successfully",
                                    payload: finalDbRes,
                                    error: null
                                });
                            }
                        })
                    } else {
                        res.status(401).json({
                            message: "password does not match",
                            payload: null,
                            error: "old password does not match"
                        })
                    }
                }
            });
        }).catch(err => {
            res.status(400).json({
                message: err.message,
                payload: null,
                error: "required fields were not set"
            })
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





module.exports.login = (req, res) => {
    try {
        let body = req.body;
        Joi.validate({
            email: body.email,
            password: body.password
        }, BusinessValidation.login).then(joiResult => {
            BusinessModel.findOne({
                contact_email: joiResult.email
            }, (error, dbRes) => {
                if (error) {
                    console.log("this is the error ", error);
                    res.status(500).json({
                        message: error.message,
                        payload: null,
                        error: "some error saving the class"
                    });
                } else {
                    console.log("joi ", joiResult)
                    let checkPass = bcrypt.compareSync(joiResult.password, dbRes.password)
                    if (checkPass) {
                        let jwToken = jwt.sign({
                            id: dbRes["_id"]
                        }, CONFIG.SECRETKEY);
                        delete dbRes["password"];
                        dbRes["jwt_token"] = jwToken;
                        res.status(200).json({
                            message: "class added successfully",
                            payload: dbRes,
                            error: null,
                            token: jwToken
                        });


                    } else {
                        res.status(401).json({
                            message: err.message,
                            payload: null,
                            error: "old password is not correct"
                        })
                    }
                }
            });
        }).catch(err => {
            res.status(400).json({
                message: err.message,
                payload: null,
                error: "required fields were not set"
            })
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