let router = require('express').Router();
let BusinessEnquiryCntrl = require('../app/controllers/business_enquiry.controller')
// let userAuth = require('../app/controllers/auth.controller')

router.route('/business-enquiry/add').post(BusinessEnquiryCntrl.add_business_enquiry);
router.route('/business-enquiry/delete').delete(BusinessEnquiryCntrl.delete_business_enquiry);
router.route('/business-enquiry/update').put(BusinessEnquiryCntrl.update_business_enquiry);
router.route('/business-enquiry/get/single/:_id').get(BusinessEnquiryCntrl.get_single_business_enquiry);
router.route('/business-enquiry/get/all').get(BusinessEnquiryCntrl.get_all_business_enquiry);

module.exports = router;