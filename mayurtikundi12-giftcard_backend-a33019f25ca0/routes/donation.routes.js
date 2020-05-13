let router = require('express').Router();
let DonationCntrl = require('../app/controllers/donation.controller');
// let userAuth = require('../app/controllers/auth.controller')
 
router.route('/donation/add').post(DonationCntrl.add_donation);
router.route('/donation/delete').delete(DonationCntrl.delete_donation);
router.route('/donation/update').put(DonationCntrl.update_donation);
router.route('/donation/get/single/:_id').get(DonationCntrl.get_single_donation);
router.route('/donation/get/all').get(DonationCntrl.get_all_donations);
router.route('/donation/business/get/:business_id').get(DonationCntrl.get_all_donation_by_business);

 
module.exports = router;
