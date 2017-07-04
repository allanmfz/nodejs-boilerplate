import {Blocks} from '../models/blocks';
import {Router}    from 'express';

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
            find = Blocks.findById(req.params.id).exec();
        }
        if(!req.params.id){
            find = Blocks.find({}).limit(limit).exec();
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
		let block = new Blocks(req.body);

        block
           .save()
           .then(function(block){
               if(!block){
                    return res.status(404)
                        .json({
                            status:false,
                            data:{}
                        });
               }

               return res.status(200)
                   .json({
                       status:true,
                       data:block
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
		var findById = Blocks.findById(req.params.id).exec();
        var update   = Blocks.update({
            _id: req.params.id
        }, {
           $set: req.body
        }, {multi: false}).exec();

        findById.then(function(block){
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
	
	    var findById = Blocks.findById(req.params.id).exec();
        var remove   = Blocks.remove({
            _id:req.params.id
        });

        findById.then(function(block){
            
            if(!block){
                return res.status(404)
                    .json(
                        {
                            status:false,
                            data  : {}
                        }
                    )
            }

            
            remove.exec().then(function(block){
                return res.status(200)
                    .json(
                        {
                            status:true,
                            data  : block
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

	return router;
};
