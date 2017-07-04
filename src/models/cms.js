import mongoose from 'mongoose';

let schema = new mongoose.Schema({
    
    title:String,
    template:String,
    meta_keywords:String,
    meta_description:String,
    identifier:String,
    content_heading:String,
    content:String,
    create_time:String,
    update_time:String,
    is_active: Boolean,
    blocks: [
    	{
    		block: String,
			id_block: String,
        }
    ]
});

export var Cms = mongoose.model('Cms', schema, 'cms');
