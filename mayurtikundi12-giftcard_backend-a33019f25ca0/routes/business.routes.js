let router = require('express').Router();
let BusinessCntrl = require('../app/controllers/business.controller');
// let userAuth = require('../app/controllers/auth.controller')
 
router.route('/business/add').post(BusinessCntrl.add_business);
router.route('/business/delete').delete(BusinessCntrl.delete_business);
router.route('/business/update').put(BusinessCntrl.update_business);
router.route('/business/get/single/:_id').get(BusinessCntrl.get_single_business);
router.route('/business/get/all').get(BusinessCntrl.get_all_business);
router.route('/business/create/pass').post(BusinessCntrl.createPassword);
router.route('/business/update/pass').put(BusinessCntrl.updatePassword);
router.route('/business/login').post(BusinessCntrl.login);

module.exports = router;
