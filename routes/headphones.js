const express = require('express');
const router = express.Router();
const hphones = require('../middlewares/headphones');

router.get('/dataBase', hphones.getDataBase);
router.get('/', hphones.getList);
router.get('/:minPrice/:maxPrice', hphones.getFilter);
router.get('/:condition', hphones.getCondition);
router.delete('/delete/:itemId', hphones.delete);

module.exports = router;