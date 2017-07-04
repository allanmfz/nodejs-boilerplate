import {Router}  from 'express';

import products   from './products';
import categories from './categories';
import customers  from './customers';
import blocks	  from './blocks';
import cms	  	  from './cms';
import login	  from './login';
import carts	  from './carts';



export default ({db}) => {
	let api = Router();

	// products resource
	api.use('/products'  , products({db}));

	// categories resource
	api.use('/categories', categories({db}));

	// customers resource
	api.use('/customers' , customers({db}));

	// blocks resource
	api.use('/blocks' , blocks({db}));

	// cms resource
	api.use('/cms' , cms({db}));

	// login resource
	api.use('/login' , login({db}));

	// carts resource
	api.use('/carts' , carts({db}));

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.send('hello world!');
	});

	return api;
}
