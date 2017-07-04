import {Carts} from '../models/carts';
import {Router}    from 'express';


export default ({db}) => {
	let router = Router();
	
	router.get('/:customer', (req, res) => {
		Carts
			.find(
				{
					customer : req.params.customer,
					finalized: false,
				}
			)
			.exec((err, doc) => {
				if (err) {
					res.send(err);
				}

				res.json(doc);
			});	
	});

	router.post('/', (req, res) => {
		Carts.create(req.body,(err, doc) => { res.json(doc); })
	});

	router.put('/', (req, res) => {
		Carts.update(
			{'_id': req.body.id},

			{$set: req.body},
			
			(err, doc) => { res.json(doc); }
		)
	});

	return router;
};
