let mongoose = require('mongoose');
let BaseJoi = require('joi');
let Extenstion = require('joi-date-extensions');
let Joi = BaseJoi.extend(Extenstion);
let DonationSchema = mongoose.Schema({
    business_id: {
        type: String,
        // required: true,
    },
    // amount: {
    //     type: Number,
    //     required: true,
    // },
    commision: {
        type: Number,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    description:{
        type: String
    }
})

module.exports = {
    add:Joi.object().keys({
            business_id:Joi.string(),
            commision: Joi.number(),
            name:Joi.string(),
            description:Joi.string()
        }),
        delete:{
            _id:Joi.string().required()
        },
        update:{
            _id:Joi.string(),
            commision: Joi.number(),
            validity_period:Joi.number(),
            name:Joi.string(),
            description:Joi.string()
        },
        getSingle:{
            _id:Joi.string()
        },
        getAllByBusinessId:{
            business_id:Joi.string()
        }
}
mongoose.model('DonationSchema', DonationSchema, 'donation');