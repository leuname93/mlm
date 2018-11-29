const express = require('express');
const router = express.Router();
const iBags = require('../middlewares/bags');


router.get('/dataBase', iBags.getDataBase);
router.get('/', iBags.getList);
router.get('/:minPrice/:maxPrice', iBags.getFilter);
router.get('/:condition', iBags.getCondition);
router.delete('/delete/:itemId', iBags.delete);



module.exports = router;