'use strict';

const winston = require('winston');
const anecdotesController = module.exports;

anecdotesController.get = async function (req, res) {
	
	winston.info('this page is 999999999999')
	console.log('cant this be seen?')
	res.render('admin/manage/anecdotes', { // ? from src/views 
		sam: 'sam',
        name: 'sam',
        age: '20',
        
	});
};

