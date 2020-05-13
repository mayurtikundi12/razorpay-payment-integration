let mongoose = require('mongoose');
let BaseJoi = require('joi');
let Extension = require('joi-date-extensions');
let Joi = BaseJoi.extend(Extension);

let PaymentSchema = mongoose.Schema({
    razorpay_order_id:String,
    razorpay_payment_id:String,
    razorpay_signature:String
})


let UserPurchaseSchema = mongoose.Schema({
    group_id: {
        type:mongoose.Schema.ObjectId
    },
    business_id: {
        type:mongoose.Schema.ObjectId
    },
    user_id: {
        type:mongoose.Schema.ObjectId,
        required:true
    },
    amount: {
        type:Number,
        required:true
    },
    commision:{
        type:Number,
        required:true,
        max:100
    },
    discount:{
        type:Number,
        required:true,
        max:100,
        min:0
    },
    recipient_name:{
        type:String
    },
    recipient_email:{
        type:String
    },
    user_email:{
        type:String
    },
    user_name:{
        type:String
    },
    purchase_date:Date,
    is_valid:{
        type:Boolean,
        default:false
    },
    redeem_date:Date,
    is_soft_delete:{
        type:Boolean,
        default:false
    },
    order:{
        type:Object
    },
    payment:{
        type:PaymentSchema
    }
});

module.exports = {
    purchase : Joi.object().keys({
        group_id: Joi.string(),
        business_id: Joi.string(),
        user_id: Joi.string().required(),
        amount: Joi.number().required(),
        recipient_name:Joi.string(),
        recipient_email:Joi.string(),
        user_email:Joi.string(),
        user_name:Joi.string()
    }),

    delete:{
        _id:Joi.string().required()
    },
    purchase_success:{
        _id:Joi.string().required(),
        payment:Joi.object({
            razorpay_order_id:Joi.string(),
            razorpay_payment_id:Joi.string(),
            razorpay_signature:Joi.string()          
        }).required(),
        user_name:Joi.string(),
        amount: Joi.number().required(),
        recipient_email:Joi.string(),
        user_email:Joi.string()
    },
    get_single:{
        _id:Joi.string()
    }
}


mongoose.model('UserPurchaseSchema', UserPurchaseSchema, 'user-purchase')