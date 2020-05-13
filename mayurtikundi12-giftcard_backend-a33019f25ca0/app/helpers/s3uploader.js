var multer = require('multer');
var aws = require('aws-sdk');
let config = require('../config/config')
aws.config.update({
    secretAccessKey: config["S3ACCESSKEY"],
    accessKeyId: config["S3ACCESSID"],
    region: config["S3REGION"]
});
var multerS3 = require('multer-s3');

var s3 = new aws.S3();

const fileFilter=(req,file,cb)=>{
    let allowedMimeTypes = ['image/jpeg','image/jpg','image/png']
    if(allowedMimeTypes.includes(file.mimetype.toLowerCase()))
    {
        cb(null,true);
    }else{
        cb(new Error("invalid mimetype,only jpeg,jpg and png"),false)
        console.log("error in image uploading");
        
    }
}


module.exports.s3Upload = multer({
        limits:{fileSize:10485760},
        fileFilter:fileFilter,
        storage: multerS3({
            s3: s3,
            bucket: 'YOUR_S3_BUCKETNAME',
            metadata: function (req, file, cb) {
                cb(null, {
                    fieldName: file.fieldname
                });
            },
            key: function (req, file, cb) {
                // console.log(file);
                cb(null, Date.now().toString())
            }
        })
    }).fields([{
        name: 'logo',
        maxCount: 1
    }, {
        name: "video",
        maxCount: 1
    }]);
