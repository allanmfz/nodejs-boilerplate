import {Customers} from '../models/customers';
import {Router}    from 'express';

export default ({db}) => {
	let router = Router();
	
	router.post('/', (req, res) => {

		Customers.find({email:req.body.email, password:req.body.password}).exec(function (err, doc) {
			res.json(doc);  
		});
	});


	return router;
};
