import mongoose from 'mongoose';

let schema = new mongoose.Schema({
    customer:String,
    finalized:Boolean,
    create_time:String,
    items:[{
        product:String,
        qnt:Number,
    }]

});
export var Carts = mongoose.model('Cart', schema, 'carts');
