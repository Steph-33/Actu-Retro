const express = require('express');
const userRouter = require('./userRoutes');
const adminRouter = require('./adminRoutes');
const articleRouter = require('./articleRoutes');
const newProductRouter = require('./newProductRoutes');
const usedProductRouter = require('./usedProductRoutes');
const basketRouter = require('./basketRoutes');

const router = express.Router();

router.use(userRouter);
router.use(adminRouter);
router.use(articleRouter);
router.use(newProductRouter);
router.use(usedProductRouter);
router.use(basketRouter);

module.exports = router;
