import {Customers} from '../../models/customers';
import {Router}    from 'express';

export default ({db}) => {
	let router = Router();

	router.param('address', function(req, res, next, id) {
		Customers
			.findOne({ "addresses._id": id}, (err, customer) => {
				if (err) {
					return res.status(404).send(err);
				}

				if (!customer) {
					return res.status(404).send(err);	
				}

				req['address'] = customer.addresses[0];

				next();
			});
	});

	router.get('/', (req, res) => {
		res.json(req['customer'].addresses);
	});

	router.post('/', (req, res) => {
		Customers.update(
			{'_id': req['customer']._id},
			{$push: {addresses: req.body}},
			(err, doc) => { res.json(doc); }
		)
	});

	router.delete('/all', (req, res) => {
		let customer = req['customer'];

		customer.addresses.forEach((doc, index) => {
			let address = customer.addresses[index];

			customer.addresses.remove(address._id);
			customer.save();
		});

		res.json({ok: 1});
	});

	router.delete('/:address', (req, res) => {
		Customers.update(
			{'_id': req['customer']._id},
			{$set: {addresses: []}},
			(err, doc) => { res.json(doc); }
		)
	});

	router.get('/:address', (req, res) => {
		res.json(req['address']);
	});

	router.put('/:address', (req, res) => {
		Customers.findOneAndUpdate(
			{"addresses._id": req['address']['_id']},
			{
				$set: {
				"a	nodeddresses.$": req.body
				}
			},
			(err, customer) => {
				if (err) {
					return res.status(404).send(err);
				}
			}
		);

		res.json({ok: 1});
	});

	return router;
};
