let port = 3000;
let host = '0.0.0.0';
let dbUsername = 'username';
let dbPass = 'db_password';
// let dbURL = `mongodb+srv://${dbUsername}:${dbPass}@cluster0-vdyag.mongodb.net/admin?retryWrites=true&w=majority`;
let dbURL = `mongodb://${dbUsername}:${dbPass}@ds113442.mlab.com:some_url`;

let secretKey = "my name is khan and i am not a terrorist"
let s3AccessID = "S3_ACCESS_ID";
let s3AccessKey = "S3_ACCESS_ID";
let s3Region = "ap-south-1";


// nodemailer credentials
// let email = "No-Reply@favouright.com";
// let emailPass = "Password12!";

let email = "YOUR_EMAIL";
let emailPass = "PASSWORD";

module.exports = {
    PORT: port,
    HOST: host,
    dbURL: dbURL,
    SECRETKEY: secretKey,
    S3ACCESSID: s3AccessID,
    S3ACCESSKEY:s3AccessKey,
    S3REGION:s3Region,
    EMAIL:email,
    EMAILPASS:emailPass

}