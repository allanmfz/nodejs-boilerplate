import {Customers}       from '../models/customers';
import {Router}          from 'express';
import {prepareData}     from '../helpers/api';
import addresses         from './customers/addresses';

export default ({db}) => {
	let router = Router();

/** 
*   GET
*/
	router.get('/:id?', (req, res, next) => {
		
		let find = {};

        let queryVars = req.query;
        let limit =
            queryVars['limit'] != undefined && !isNaN(queryVars['limit']) ?
                queryVars['limit'] : 10;

        if(req.params.id){
            find = Customers.findById(req.params.id).exec();
        }
        if(!req.params.id){
            find = Customers.find({}).limit(limit).exec();
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
/**
*   POST
*/
	router.post('/', (req, res, next) => {
		let customers = new Customers(req.body);

        customers
           .save()
           .then(function(customers){
               if(!customers){
                    return res.status(404)
                        .json({
                            status:false,
                            data:{}
                        });
               }

               return res.status(200)
                   .json({
                       status:true,
                       data:customers
                   });

           })
           .catch(function(err) {
               return res.status(500)
                   .json({
                       status:false,
                       data:{}
                   });

           });	
	});
/**
*   PUT
*/
	router.put('/:id', (req, res, next) => {
		var findById = Customers.findById(req.params.id).exec();
        var update   = Customers.update({
            _id: req.params.id
        }, {
           $set: req.body
        }, {multi: false}).exec();

        findById.then(function(customer){
            update
                .then(function(result){
                    if(!result){
                        return res.status(400)
                            .json({
                                status:false,
                                data:{}
                            })
                    }

                    return res.status(200)
                        .json({
                            status:true,
                            data:result
                        });
                })
                .catch(function(err){
                    return res.status(500)
                        .json({
                            status:false,
                            data:{}
                        });
                });

        })
        .catch(function(err){
            return res.status(500)
                .json({
                    status:false,
                    data:{}
                });
        });
	});

/**
*   DELETE
*/
	router.delete('/:id', (req, res, next) => {
	
	    var findById = Customers.findById(req.params.id).exec();
        var remove   = Customers.remove({
            _id:req.params.id
        });

        findById.then(function(curtomer){
            
            if(!curtomer){
                return res.status(404)
                    .json(
                        {
                            status:false,
                            data  : {}
                        }
                    )
            }

            
            remove.exec().then(function(curtomer){
                return res.status(200)
                    .json(
                        {
                            status:true,
                            data  : curtomer
                        }
                    )
            }).catch(function (err) {
                return res.status(500)
                    .json(
                        {
                            status:false,
                            data  : {}
                        }
                    )
            });
        });

	});

	//router.use('/:customer/addresses', addresses({db}));

	return router;
};
