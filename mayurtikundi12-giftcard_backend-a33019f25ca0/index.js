let cors = require('cors');
let express = require('express');
const helmet = require('helmet')
require('./app/models/connection')
let CONFIG = require('./app/config/config')
let app = express();
app.use(helmet())
app.use(cors());
const fs = require('fs');
const http = require('http')
const https = require('https');

// certificate
// const privateKey = fs.readFileSync('/etc/letsencrypt/live/institute.courseman.com/privkey.pem','utf8');
// const certificate = fs.readFileSync('/etc/letsencrypt/live/institute.courseman.com/cert.pem','utf8');
// const ca = fs.readFileSync('/etc/letsencrypt/live/institute.courseman.com/chain.pem','utf8');

// const credentials = {
//     key:privateKey,
//     cert:certificate,
//     ca:ca
// }

let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

require('./app/helpers/firebase');
require('./app/helpers/razorpay');

// ****************************all routes import here
// let userAuthRoutes = require('./routes/user.auth.routes');
// app.use('/v1',userAuthRoutes);
let BusinessRoutes = require('./routes/business.routes');
app.use('/v1',BusinessRoutes);
let BusinessCategoryRoutes = require('./routes/business_category.routes');
app.use('/v1',BusinessCategoryRoutes);
let CouponRoutes = require('./routes/coupon.routes');
app.use('/v1',CouponRoutes);
let DonationRoutes = require('./routes/donation.routes');
app.use('/v1',DonationRoutes);
let BusinessEnquiryRoutes = require('./routes/business_enquiry.routes');
app.use('/v1',BusinessEnquiryRoutes);
let UserRoutes = require('./routes/user.routes');
app.use('/v1',UserRoutes);
let BusinessGroupRoutes = require('./routes/business_group.routes');
app.use('/v1',BusinessGroupRoutes);
let UserPurchaseRoutes = require('./routes/user_purcahse.routes');
app.use('/v1',UserPurchaseRoutes);
// ****************************************************



app.listen(3000, (err) => {
    if (err) {
        console.log("error in initialising the node server");
    } else {
        console.log("server started on port " + CONFIG.PORT)
    }
})
 

// Starting both http & https servers
// const httpServer = http.createServer(app);
// const httpsServer = https.createServer(credentials, app);

// httpServer.listen(3000, () => {
// 	console.log('HTTP Server running on port 80');
// });

// httpsServer.listen(3000, () => {
// 	console.log('HTTPS Server running on port 443');
// });