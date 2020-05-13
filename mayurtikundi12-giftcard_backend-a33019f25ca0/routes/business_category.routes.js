let router = require('express').Router();
let BusinessCategory = require('../app/controllers/business_category.controller')
// let userAuth = require('../app/controllers/auth.controller')

router.route('/business-category/add').post(BusinessCategory.add_business_category);
router.route('/business-category/delete').delete(BusinessCategory.delete_business_category);
router.route('/business-category/update').put(BusinessCategory.update_business_category);
router.route('/business-category/get/single/:_id').get(BusinessCategory.get_single_business_category);
router.route('/business-category/get/all').get(BusinessCategory.get_all_business_category);

module.exports = router;