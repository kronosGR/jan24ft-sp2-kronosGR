var express = require('express');
var router = express.Router();
const db = require('../models/index');
const createHttpError = require('http-errors');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Product service' });
});

router.get('/:id', async function (req, res, next) {
  const id = req.params.id;
  const product = (
    await db.sequelize.query(
      `select p.ProductID , p.Name ,p.Color , p.[Size] , p.Weight , p.ListPrice , p.SellStartDate , m.Name as ModelName,
      c.Name as CategoryName
      from SalesLT.Product as p
      inner join SalesLt.ProductModel as m on p.ProductModelID = m.ProductModelID
      inner join SalesLT.ProductCategory as c on p.ProductCategoryID  = c.ProductCategoryID  where ProductID='${id}'`
    )
  )[0][0];
  const date = new Date(product.SellStartDate);
  product.SellStartDate = `${
    date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  }/${
    date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  }/${date.getFullYear()}`;

  res.render('product', { product: product });
});

module.exports = router;
