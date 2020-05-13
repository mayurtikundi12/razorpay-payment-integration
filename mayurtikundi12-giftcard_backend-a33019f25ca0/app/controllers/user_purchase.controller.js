let mongoose = require('mongoose');
let UserPurchaseModel = mongoose.model('UserPurchaseSchema');
let UserModel = mongoose.model('UserSchema');
let BusinessModel = mongoose.model('BusinessSchema');
let Joi = require('joi')
let UserPurchaseValidation = require('../models/user_purchase.model');
let mailer = require('../helpers/mailer');
let razorpayInstance = require('../helpers/razorpay');

async function getBusiness(bid) {
    let result = await BusinessModel.findById(bid);
    return result;
}


async function getUser(uid) {
    let result = await UserModel.findById(uid);
    return result;
}

module.exports.purchase = async (req, res) => {
    try {
        let body = req.body;
        Joi.validate(body, UserPurchaseValidation.purchase).then(async joiResult => {

            let business_data = await getBusiness(joiResult.business_id);
            let user_data = await getUser(joiResult.user_id);

            // console.log("getting businrassdata ",business_data);
            // console.log("getting userdata ",user_data);
            if (business_data && user_data && business_data.commision && business_data.discount) {

                joiResult.commision = business_data.commision;
                joiResult.discount = business_data.discount;
                joiResult.purchase_date = (new Date()).toISOString();

                if (business_data.group_id) {
                    if (business_data.group_id == joiResult.group_id) {
                        saveUserPurchase(joiResult, res);
                    } else {
                        res.status(400).json({
                            message: "business or user does not exist",
                            payload: null,
                            error: "business or user does not exist"
                        })
                    }
                } else {
                    saveUserPurchase(joiResult, res);
                }

            } else {
                res.status(400).json({
                    message: "business or user does not exist",
                    payload: null,
                    error: "business or user does not exist"
                })
            }

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

    function saveUserPurchase(data, res) {


        var options = {
            amount: data.amount * 100, // amount in the smallest currency unit
            currency: "INR",
            receipt: data.user_email,
            payment_capture: '0'
        };

        razorpayInstance.instance.orders.create(options, function (razor_error, order) {
            if (razor_error) {
                console.log("razor error ", razor_error)

                res.status(417).json({
                    message: razor_error.message,
                    payload: null,
                    error: "razor pay order creation unsuccessful"
                });
            } else {
                data["order"] = order;
                let busines_category = new UserPurchaseModel(data);
                busines_category.save(async (error, dbRes) => {
                    if (error) {
                        console.log("this is the error ", error);
                        res.status(500).json({
                            message: error.message,
                            payload: null,
                            error: "some error saving the class"
                        });
                    } else {

                        res.status(200).json({
                            message: "order created successfully",
                            payload: {
                                dbRes,
                                key: razorpayInstance.config.key_id
                            },
                            error: null
                        });


                    }
                });

            }
        });





 
    }
}


/**
 * Deletes an existing category
 *    @deleteRequest
 *    @body {string}  _id -  id of the institute 
 */
module.exports.delete_user_purchase = (req, res) => {
    try {
        let body = req.body;
        Joi.validate({
            _id: body._id,
        }, UserPurchaseValidation.delete).then(joiResult => {

            UserPurchaseModel.findByIdAndRemove(joiResult._id, (error, dbRes) => {
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
module.exports.purchase_success = (req, res) => {
    try {
        let body = req.body;
        Joi.validate(body, UserPurchaseValidation.purchase_success).then(joiResult => {
            joiResult.is_valid = true
            UserPurchaseModel.findOneAndUpdate({
                _id: joiResult._id
            }, joiResult, async (error, dbRes) => {
                if (error) {
                    console.log("this is the error ", error);
                    res.status(500).json({
                        message: error.message,
                        payload: null,
                        error: "some error saving the class"
                    });
                } else {

                    if (joiResult.user_email == joiResult.recipient_email) {
                        await mailer.sendMail("you have a gift card !!", joiResult, joiResult.user_email, 'user_purchase_self')
                    } else {
                        await mailer.sendMail("you have a gift card !!", joiResult, joiResult.user_email, 'user_purchase_self');
                        await mailer.sendMail("you have a gift card !!", joiResult, joiResult.recipient_email, 'user_purchase_recipient');
                    }


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
module.exports.get_single_purchase = (req, res) => {
    try {
        let params = req.params;
        Joi.validate({
            _id: params._id,
        }, UserPurchaseValidation.get_single).then(joiResult => {

            UserPurchaseModel.findOne(joiResult, (error, dbRes) => {
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
                            message: "class added successfully",
                            payload: dbRes,
                            error: null
                        });
                    } else {
                        res.status(404).json({
                            message: "no data available",
                            payload: null,
                            error: "no data available"
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
        res.status(500).json({
            message: error.message,
            payload: null,
            error: "some error saving the class"
        });
    }
}



module.exports.get_by_user_id = (req, res) => {
    try {
        let params = req.params;
        Joi.validate({
            _id: params._id,
        }, UserPurchaseValidation.get_single).then(joiResult => {

            UserPurchaseModel.find({
                user_id: joiResult._id
            }, (error, dbRes) => {
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
                            message: "class added successfully",
                            payload: dbRes,
                            error: null
                        });
                    } else {
                        res.status(404).json({
                            message: "no data available",
                            payload: null,
                            error: "no data available"
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
        res.status(500).json({
            message: error.message,
            payload: null,
            error: "some error saving the class"
        });
    }
}


module.exports.get_by_bussines_id = (req, res) => {
    try {
        let params = req.params;
        Joi.validate({
            _id: params._id,
        }, UserPurchaseValidation.get_single).then(joiResult => {

            UserPurchaseModel.find({
                business_id: joiResult._id
            }, (error, dbRes) => {
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
                            message: "class added successfully",
                            payload: dbRes,
                            error: null
                        });
                    } else {
                        res.status(404).json({
                            message: "no data available",
                            payload: null,
                            error: "no data available"
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
        res.status(500).json({
            message: error.message,
            payload: null,
            error: "some error saving the class"
        });
    }
}


module.exports.get_by_bussiness_group_id = (req, res) => {
    try {
        let params = req.params;
        Joi.validate({
            _id: params._id,
        }, UserPurchaseValidation.get_single).then(joiResult => {

            UserPurchaseModel.find({
                group_id: joiResult._id
            }, (error, dbRes) => {
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
                            message: "class added successfully",
                            payload: dbRes,
                            error: null
                        });
                    } else {
                        res.status(404).json({
                            message: "no data available",
                            payload: null,
                            error: "no data available"
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
module.exports.get_all_user_purchase = (req, res) => {
    try {

        UserPurchaseModel.find((error, dbRes) => {
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