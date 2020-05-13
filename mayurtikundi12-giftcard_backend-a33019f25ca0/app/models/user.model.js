let mongoose = require('mongoose');
let BaseJoi = require('joi');
let Extension = require('joi-date-extensions');
let Joi = BaseJoi.extend(Extension);


let UserSchema = mongoose.Schema({
    email: String,
    phoneNumber:{
        type:String,
        unique:true
    },
    uid:String,
    password:String,
    metadata:Array,
    role:{
        type:Number,
        default:104
        // normal user
    },
    createAt:Date,
    updatedAt:Date
})

module.exports = {
    add:Joi.object().keys({
        uid:Joi.string(),
        email: Joi.string().required(),
        phoneNumber:Joi.string().required(),
        password:Joi.string().required(),
        metadata:Joi.any(),
        createAt:Joi.string().required(),
        updatedAt:Joi.number()
    }),
    login:Joi.object().keys({
        uid:Joi.string()
    })
}


mongoose.model('UserSchema', UserSchema, 'user')