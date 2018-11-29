const express = require('express');
const router = express.Router();

router.use('/headphones', require('./headphones'));
router.use('/bags', require('./bags'));
router.use('/shoes', require('./shoes'));

router.get('/', function(req, res){
	res.send({message:'welcome to main homepage'});
});

module.exports = router;