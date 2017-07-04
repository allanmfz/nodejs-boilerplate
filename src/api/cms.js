import {Cms} from '../models/cms';
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
            find = Cms.findById(req.params.id).exec();
        }
        if(!req.params.id){
            find = Cms.find({}).limit(limit).exec();
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
		let cms = new Cms(req.body);

        cms
           .save()
           .then(function(cms){
               if(!cms){
                    return res.status(404)
                        .json({
                            status:false,
                            data:{}
                        });
               }

               return res.status(200)
                   .json({
                       status:true,
                       data:cms
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
		var findById = Cms.findById(req.params.id).exec();
        var update   = Cms.update({
            _id: req.params.id
        }, {
           $set: req.body
        }, {multi: false}).exec();

        findById.then(function(cms){
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
	
	    var findById = Cms.findById(req.params.id).exec();
        var remove   = Cms.remove({
            _id:req.params.id
        });

        findById.then(function(cms){
            
            if(!cms){
                return res.status(404)
                    .json(
                        {
                            status:false,
                            data  : {}
                        }
                    )
            }

            
            remove.exec().then(function(cms){
                return res.status(200)
                    .json(
                        {
                            status:true,
                            data  : cms
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
