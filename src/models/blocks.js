import mongoose from 'mongoose';

let schema = new mongoose.Schema({
    title:String,
    identifier:String,
    content:String,
    create_time:String,
    update_time:String,
    is_active: Boolean,
});
export var Blocks = mongoose.model('Block', schema, 'blocks');
