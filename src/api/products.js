import {Products} from '../models/catalog/products';
import {Router}   from 'express';

export default ({db}) => {
	let router = Router();

/**
*	GET
*/
	router.get('/:id?', (req, res, next) => {
		
		let find = {};

		let queryVars = req.query;
		let limit =
			queryVars['limit'] != undefined && !isNaN(queryVars['limit']) ?
				queryVars['limit'] : 10;

	    if(req.params.id){
	        find = Products.findById(req.params.id).exec();
	    }
	    if(!req.params.id){
	        find = Products.find({}).limit(limit).exec();
	    }

		find.then(function(result){
	            if(!result){
	                return res.status(400)
	                    .json({
	                        status:false,
	                        data:{}
	                    });
	            }

	            return res.status(200)
	                .json({
	                    status :true,
	                    data   : result
	                })

	        })
	        .catch(function(err){
	            return res.status(500)
	                .json({
	                    status:true,
	                    data: {}
	                })
	        })
	});

	return router;
};
