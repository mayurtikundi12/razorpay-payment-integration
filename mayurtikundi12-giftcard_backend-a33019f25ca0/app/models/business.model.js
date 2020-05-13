let mongoose = require('mongoose');
let BaseJoi = require('joi');
let Extenstion = require('joi-date-extensions');
let Joi = BaseJoi.extend(Extenstion);

let LogoSchema = mongoose.Schema({
    location: String,
    key: String
}, {
    _id: false
});


let BankDetailsSchema = mongoose.Schema({
    legal_entity_name: {
        type: String,
        lowercase: true,
        required: true
    },
    account_number: {
        type: Number,
        // max: 12
    },
    gst_number: {
        type: Number,
    },
    ifsc_number: {
        type: String,
    }
}, {
    _id: false
})

let AddressSchema = mongoose.Schema({
    address: String,
    area:String,
    city: String,
    state: String,
    country: String,
    pincode: {
        type: Number,
        max: 999999
    },
    lat: Number,
    long: Number,
    area: String
},{
    _id:false
})

let SocialMediaSchema = mongoose.Schema({
        facebook:String,
        instagram:String,
        website:String
},{
    _id:false
})

let BusinessSchema = mongoose.Schema({
    password:String,
    group_id:mongoose.Schema.ObjectId,
    business_category: {
        type: String
    },
    logo: {
        type: LogoSchema
    },
    business_name: {
        type: String
    },
    description: {
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
    commision:{
        type:Number,
        max:100
    },
    discount:{
        type:Number,
        max:100
    },
    gift_enabled: {
        type: Boolean
    },
    donation_enabled: {
        type: String
    },
    is_enabled: Boolean,
    bank_details: {
        type: BankDetailsSchema
    },
    address: {
        type: AddressSchema
    },
    social:SocialMediaSchema,
    token:String

});

module.exports={

    add: Joi.object().keys({
        business_category: Joi.string(),
        group_id: Joi.string(),
        business_name: Joi.string(),
        logo:Joi.object({
            location:Joi.string(),
            key:Joi.string()
        }),
        description: Joi.string(),
        contact_name: Joi.string(),
        contact_email: Joi.string(),
        contact_number: Joi.number(),
        gift_enabled: Joi.any(),
        donation_enabled: Joi.any(),
        commision:Joi.number(),
        discount:Joi.number(),
        bank_details: Joi.object({
            legal_entity_name: Joi.string(),
            account_number: Joi.number(),
            gst_number: Joi.number(),
            ifsc_number: Joi.string()
        }),
        address: Joi.object({
            address: Joi.string(),
            area:Joi.string(),
            city: Joi.string(),
            state: Joi.string(),
            country: Joi.string(),
            pincode: Joi.number(),
            lat: Joi.number(),
            long: Joi.number(),
            area: Joi.string()
        }),
        social:Joi.object({
            facebook: Joi.string(),
            instagram:Joi.string(),
            website: Joi.string()
        }),
        is_enabled: Joi.any()
    }),

    delete: {
        _id: Joi.string().required()
    },

    update: {
        _id: Joi.string().required(),
        business_category: Joi.string(),
        group_id: Joi.string(),
        business_name: Joi.string(),
        logo:Joi.object({
            location:Joi.string(),
            key:Joi.string()
        }),
        description: Joi.string(),
        contact_name: Joi.string(),
        // contact_email: Joi.string(),
        contact_number: Joi.number(),
        gift_enabled: Joi.boolean(),
        donation_enabled: Joi.boolean(),
        is_enabled: Joi.boolean(),
        commision:Joi.number(),
        discount:Joi.number(),
        bank_details: Joi.object({
            legal_entity_name: Joi.string(),
            account_number: Joi.number(),
            gst_number: Joi.number(),
            ifsc_number: Joi.string()
        }),
        address: Joi.object({
            address: Joi.string(),
            area:Joi.string(),
            city: Joi.string(),
            state: Joi.string(),
            country: Joi.string(),
            pincode: Joi.number(),
            lat: Joi.number(),
            long: Joi.number()
        }),
        social:Joi.object({
            facebook: Joi.string(),
            instagram:Joi.string(),
            website: Joi.string()
        }),
    },

    getSingle: {
        _id: Joi.string()
    },

    create_pass:{
        email: Joi.string(),
        old_password:Joi.string(),
        new_password:Joi.string()
    },
    update_pass:{
        email: Joi.string(),
        old_password:Joi.string(),
        new_password:Joi.string()
    },

    login:{
        email: Joi.string(),
        password:Joi.string(),
    }
};

mongoose.model('BusinessSchema', BusinessSchema, 'business_data');