var express = require('express');
var router = express.Router();
const db = require('../models/index');

/* GET home page. */
router.get('/', async function (req, res, next) {
  res.render('index', { title: 'Customer service' });
});

router.get('/:query', async (req, res, next) => {
  const query = req.params.query;

  const customers = await db.sequelize.query(
    `select * from SalesLT.Customer c where c.LastName LIKE '${query}%';`
  );
  console.log(customers[0][0]);

  res.render('customer', { customers: customers[0] });
});

module.exports = router;
