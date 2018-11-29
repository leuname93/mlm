const express = require('express');
const router = express.Router();
const iShoes = require('../middlewares/shoes');

router.get('/dataBase', iShoes.getDataBase);
router.get('/', iShoes.getList);
router.get('/:minPrice/:maxPrice', iShoes.getFilter);
router.get('/:condition', iShoes.getCondition);
router.delete('/delete/:itemId', iShoes.delete);

module.exports = router;