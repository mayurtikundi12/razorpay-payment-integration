let router = require('express').Router();
let UserPurcahseCntrl = require('../app/controllers/user_purchase.controller')
// let userAuth = require('../app/controllers/auth.controller')

router.route('/user-purchase/purchase').post(UserPurcahseCntrl.purchase);
router.route('/user-purchase/delete').delete(UserPurcahseCntrl.delete_user_purchase);
router.route('/user-purchase/purchase_complete_success').put(UserPurcahseCntrl.purchase_success);
router.route('/user-purchase/get/single/:_id').get(UserPurcahseCntrl.get_single_purchase);
router.route('/user-purchase/get/user/:_id').get(UserPurcahseCntrl.get_by_user_id);
router.route('/user-purchase/get/business/:_id').get(UserPurcahseCntrl.get_by_bussines_id);
router.route('/user-purchase/get/group/:_id').get(UserPurcahseCntrl.get_by_bussiness_group_id);
router.route('/user-purchase/get/all').get(UserPurcahseCntrl.get_all_user_purchase);

module.exports = router;