let mongoose = require('mongoose');
let BaseJoi = require('joi');
let Extension = require('joi-date-extensions');
let Joi = BaseJoi.extend(Extension);

let BusinessCategorySchema = mongoose.Schema({
    category_name: {
        type: String,
        required: true,
        toLowerCase: true,
        unique:true
    },
    tags: [String]
})

module.exports = {
    add : Joi.object().keys({
        category_name: Joi.string().required(),
        tags: Joi.array()
    }),

    delete:{
        _id:Joi.string().required()
    },
    update:{
        _id:Joi.string().required(),
        tags: Joi.array()
    },
    getSingle:{
        _id:Joi.string()
    }
}


mongoose.model('BusinessCategorySchema', BusinessCategorySchema, 'business_category')