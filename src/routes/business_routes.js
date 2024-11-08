const express = require('express');
const router = express.Router();
const businessController = require('../controllers/business_controllers');

router.post('/business', businessController.createBusiness);
router.get('/business', businessController.getAllBusinesses);
router.get('/business/:id', businessController.getBusinessById);
router.put('/business/:id', businessController.updateBusiness);
router.delete('/business/:id', businessController.deleteBusiness);

module.exports = router;
