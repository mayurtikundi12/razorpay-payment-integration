let mongoose = require('mongoose');
let BaseJoi = require('joi');
let Extenstion = require('joi-date-extensions');
let Joi = BaseJoi.extend(Extenstion);

let BusinessEnquirySchema = mongoose.Schema({
    business_category: {
        type: String
    },
    business_name: {
        type: String
    },
    contact_name: {
        type: String
    },
    contact_email: {
        type: String,
        unique:true
    },
    contact_number: {
        type: Number
    },
    contacted:Boolean,
    accepted_request:Boolean,
    date_of_request:Date
});

module.exports={
    add: Joi.object().keys({
        business_category: Joi.string(),
        business_name: Joi.string(),
        contact_name: Joi.string(),
        contact_email: Joi.string(),
        contact_number: Joi.number()
    }),
    update:{
        _id:Joi.string(),
        contacted:Joi.boolean(),
        accepted_request:Joi.boolean(),
    },

    delete:{
        _id:Joi.string().required()
    },
    getSingle:{
        _id:Joi.string().required()
    }
};

mongoose.model('BusinessEnquirySchema', BusinessEnquirySchema, 'business_enquiry');