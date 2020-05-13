let router = require('express').Router();
let BusinessGroupCntrl = require('../app/controllers/business_group.controller')
// let userAuth = require('../app/controllers/auth.controller')

router.route('/business-group/add').post(BusinessGroupCntrl.add_business_group);
router.route('/business-group/get/all').get(BusinessGroupCntrl.get_all_business_group);
router.route('/business-group/get/single/:_id').get(BusinessGroupCntrl.get_children);


module.exports = router;