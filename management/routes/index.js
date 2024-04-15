var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/querya', async (req, res, next) => {
	let queryA = [];
	res.render('querya', { query: queryA });
});

router.get('/queryb', async (req, res, next) => {
	let query = [];
	res.render('queryb', { query: query });
});

router.get('/queryc', async (req, res, next) => {
	let query = [];
	res.render('queryc', { query: query });
});

router.get('/queryd', async (req, res, next) => {
	let query = [{Total:0}];
	res.render('queryd', { query: query[0] });
});

router.get('/querye', async (req, res, next) => {
	let query = [];
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
			link: 'querya',
			description: 'Display the table results for Query A',
		},
		{
			name: 'Query B',
			link: 'queryb',
			description: 'Display the table results for Query B',
		},
		{
			name: 'Query C',
			link: 'queryc',
			description: 'Display the table results for Query C',
		},
		{
			name: 'Query D',
			link: 'queryd',
			description: 'Display the table results for Query D',
		},
		{
			name: 'Query E',
			link: 'querye',
			description: 'Display the table results for Query E',
		},
		{
			name: 'Query F',
			link: 'queryf',
			description: 'Query result for PowerBI visualization',
		},
		{
			name: 'Query G',
			link: 'queryg',
			description: 'Query result for PowerBI visualization',
		},
		{
			name: 'Query H',
			link: 'queryh',
			description: 'Query result for PowerBI visualization',
		},
	];

	res.render('index', { options: options });
});

module.exports = router;

