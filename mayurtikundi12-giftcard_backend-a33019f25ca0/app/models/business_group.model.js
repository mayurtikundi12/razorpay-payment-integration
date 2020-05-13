let mongoose = require('mongoose');
let BaseJoi = require('joi');
let Extension = require('joi-date-extensions');
let Joi = BaseJoi.extend(Extension);

let BusinessGroupSchema = mongoose.Schema({
    group_name:{
        type:String,
        unique:true
    },
    enabled:{
        type:Boolean,
        default:true
    },
    soft_delete:{
        type:Boolean,
        default:false
    }
})

module.exports = {
    add : Joi.object().keys({
        group_name:Joi.string().required(),
        enabled:Joi.boolean()
    }),

    delete:{
        _id:Joi.string().required()
    },
    update:{
        _id:Joi.string().required(),
        group_name:Joi.string(),
        enabled:Joi.boolean()
    },
    getChildren:{
        _id:Joi.string()
    }
}


mongoose.model('BusinessGroupSchema', BusinessGroupSchema, 'business_group')