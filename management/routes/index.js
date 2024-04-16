var express = require('express');
var router = express.Router();
const db = require('../models/index');

/* GET home page. */
router.get('/querya', async (req, res, next) => {
  let queryA = (
    await db.sequelize.query(
      'select DISTINCT * from SalesLT.ProductCategory pc where pc.ParentProductCategoryID is NULL ORDER by pc.Name  ;'
    )
  )[0];
  console.log(queryA);
  res.render('querya', { query: queryA });
});

router.get('/queryb', async (req, res, next) => {
  let query = (
    await db.sequelize
      .query(`select pc.Name as Name , AVG(p.ListPrice) as Price  from SalesLT.Product p
	inner join SalesLT.ProductCategory pc on p.ProductCategoryID =pc.ProductCategoryID
	group by pc.Name  order by Price DESC `)
  )[0];
  res.render('queryb', { query: query });
});

router.get('/queryc', async (req, res, next) => {
  let query = (
    await db.sequelize
      .query(`select pc.Name, pc.ProductCategoryID, subquery.Price  from SalesLT.ProductCategory pc left join 
	(select  pc.ParentProductCategoryID , AVG(p.ListPrice) as Price  from SalesLT.Product p
	inner join SalesLT.ProductCategory pc on p.ProductCategoryID =pc.ProductCategoryID
	group by pc.ParentProductCategoryID  ) subquery on subquery.ParentProductCategoryID = pc.ProductCategoryID 
	where subquery.price is not null
	order by Price`)
  )[0];
  console.log(query);
  res.render('queryc', { query: query });
});

router.get('/queryd', async (req, res, next) => {
  let query = (
    await db.sequelize.query(`
	select DISTINCT  COUNT(soh.CustomerID) as Total  ,soh.OrderDate from SalesLT.SalesOrderHeader soh 
where soh.OrderDate  BETWEEN CONVERT(datetime,'01/06/2008',103) and  CONVERT(datetime,'15/06/2008',103) GROUP  by soh.OrderDate 
	`)
  )[0];

  res.render('queryd', { query: query[0] });
});

router.get('/querye', async (req, res, next) => {
  let query = (
    await db.sequelize.query(`
	select c.CustomerID , c.FirstName, c.LastName  from SalesLT.Customer c  where c.FirstName like 'a%'
UNION 
select c2.CustomerID , c2.FirstName, c2.LastName  from SalesLT.Customer c2  where c2.LastName like '%e'
	`)
  )[0];
  res.render('querye', { query: query });
});

router.get('/queryf', async (req, res, next) => {
  let query = [];
  res.render('queryf', { query: query });
});

router.get('/queryg', async (req, res, next) => {
  let query = [];
  res.render('queryg', { query: query });
});

router.get('/queryh', async (req, res, next) => {
  let query = [];
  res.render('queryh', { query: query });
});

router.get('/', async (req, res, next) => {
  let options = [
    {
      name: 'Query A',
      link: 'manager/querya',
      description: 'Display the table results for Query A',
    },
    {
      name: 'Query B',
      link: 'manager/queryb',
      description: 'Display the table results for Query B',
    },
    {
      name: 'Query C',
      link: 'manager/queryc',
      description: 'Display the table results for Query C',
    },
    {
      name: 'Query D',
      link: 'manager/queryd',
      description: 'Display the table results for Query D',
    },
    {
      name: 'Query E',
      link: 'manager/querye',
      description: 'Display the table results for Query E',
    },
    {
      name: 'Query F',
      link: 'manager/queryf',
      description: 'Query result for PowerBI visualization',
    },
    {
      name: 'Query G',
      link: 'manager/queryg',
      description: 'Query result for PowerBI visualization',
    },
    {
      name: 'Query H',
      link: 'manager/queryh',
      description: 'Query result for PowerBI visualization',
    },
  ];

  res.render('index', { options: options });
});

module.exports = router;
