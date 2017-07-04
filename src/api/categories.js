import {CategoryFactory} from '../factories/catalog/categories';
import {Categories}      from '../models/catalog/categories';
import {Products}        from '../models/catalog/products';
import {Router}          from 'express';
import {prepareData}     from '../helpers/api';

export default ({db}) => {
    let router  = Router();
    let factory = new CategoryFactory();

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
            find = Categories.findById(req.params.id).exec();
        }
        if(!req.params.id){
            find = Categories.find({}).limit(limit).exec();
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
     * Procura os produtos de uma categoria 
     * @TODO: procura os produtos que tenha o ID da categoria cadastrodo
     */
    router.get('/:id/products', (req, res, next) => {
        

        let find = {};
        let queryVars = req.query;
        let limit =
            queryVars['limit'] != undefined && !isNaN(queryVars['limit']) ?
                queryVars['limit'] : 10;

        find = Products.find({'categories': {$in: [req.params.id]}}).limit(limit);
        
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

        let category = new Categories(req.body);

        category
           .save()
           .then(function(category){
               if(!category){
                    return res.status(404)
                        .json({
                            status:false,
                            data:{}
                        });
               }

               return res.status(200)
                   .json({
                       status:true,
                       data:category
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
    router.put('/:id', (req, res) => {
        var findById = Categories.findById(req.params.id).exec();
        var update   = Categories.update({
            _id: req.params.id
        }, {
           $set: req.body
        }, {multi: false}).exec();

        findById.then(function(category){
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
    router.delete('/:id', (req, res) => {

        var findById = Categories.findById(req.params.id).exec();
        var remove   = Categories.remove({
            _id:req.params.id
        });

        findById.then(function(category){
            
            if(!category){
                return res.status(404)
                    .json(
                        {
                            status:false,
                            data  : {}
                        }
                    )
            }

            
            remove.exec().then(function(category){
                return res.status(200)
                    .json(
                        {
                            status:true,
                            data  : category
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