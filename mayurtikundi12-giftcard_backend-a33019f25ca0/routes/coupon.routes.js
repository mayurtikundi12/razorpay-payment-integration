let router = require('express').Router();
let CouponCntrl = require('../app/controllers/coupon.controller');
// let userAuth = require('../app/controllers/auth.controller')
 
router.route('/coupon/add').post(CouponCntrl.add_coupon);
router.route('/coupon/delete').delete(CouponCntrl.delete_coupon);
router.route('/coupon/update').put(CouponCntrl.update_coupon);
router.route('/coupon/get/single/:_id').get(CouponCntrl.get_single_coupon);
router.route('/coupon/get/all').get(CouponCntrl.get_all_coupons);
router.route('/coupon/business/get/:business_id').get(CouponCntrl.get_all_coupon_by_business);

 
module.exports = router;
