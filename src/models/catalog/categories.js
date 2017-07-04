import mongoose from 'mongoose';

let schema = new mongoose.Schema({
    name       : {
        type    : String,
        required: [true, 'Category name is required.']
    },
    description: {
        type    : String,
        required: [true, 'Category description is required.']
    },
    slug       : {
        type    : String,
        validate: {
            validator: (v) => {
                return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(v);
            }
        },
        required: [true, 'Category slug is required.']
    },
    enabled    : {
        type   : Boolean,
        enum   : [true, false],
        default: true
    }
});

export var Categories = mongoose.model('Category', schema, 'categories');
