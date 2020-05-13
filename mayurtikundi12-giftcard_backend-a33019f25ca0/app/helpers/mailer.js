let nodemailer = require('nodemailer')
let config = require('../config/config')
let EmailMaker = require('./emailMaker');

let transporter = nodemailer.createTransport({
    port: 465,
    secure: true,
    service: 'Gmail',
    auth: {
        user: config.EMAIL,
        pass: config.EMAILPASS
    }
});
var mailOptions = {
    from: '',
    to: 'ABC@gmail.com',
    subject: '',
    html:''
};

module.exports.sendMail = async (subject,body,to,template)=>{
    mailOptions.to = to ;
    mailOptions.subject = subject ;
    mailOptions.html = EmailMaker.createEmail(body,template) ;
    await  transporter.sendMail(mailOptions,(error,mailResponse)=>{
        if (error) {
            console.log("error in sending mail ",error)
            return Promise.reject({error:error,message:"failed to senf email"})
        } else {
            console.log("mail sent seuccess to ",to);
            return Promise.resolve(mailResponse)
        }
    });

}