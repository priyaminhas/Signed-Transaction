var express = require('express');
var router = express.Router();
const connectWeb3 = require('../connectWeb3');
/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  console.log('connectWeb3');
  connectWeb3.incrementFunction(10).then(result => {
    console.log(result);
  }).catch(error =>{
    console.log('erro');
    console.log(error);
  });
});

module.exports = router;
