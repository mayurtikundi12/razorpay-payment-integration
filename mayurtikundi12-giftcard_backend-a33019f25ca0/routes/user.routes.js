let router = require('express').Router();
let UserCntrl = require('../app/controllers/user.controller');
// let userAuth = require('../app/controllers/auth.controller')
 
router.route('/user/login').post(UserCntrl.login);
router.route('/user/get/all').get(UserCntrl.get_all_user);


 
module.exports = router;
