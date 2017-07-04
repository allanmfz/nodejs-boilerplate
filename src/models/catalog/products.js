import mongoose from 'mongoose';

let schema = new mongoose.Schema({
    type: String,
    name: String,
    sku: String,
    description: String,
    short_description: String,
    slug: String,
    enabled: Boolean,
    price_configuration: {
        price: Number,
        special_price: Number,
        special_price_from: Date,
        special_price_to: Date
    },
    images: [
        {
            url: String,
            label: String,
            order: Number
        }
    ],
    stock: {
        manage: Boolean,
        qtd: Number,
        stock_disponibility: Boolean
    },
    category: String,
    _comment: String,
    peso: Number,
    marca: String,
    part_number: String,
    garantia_meses: Number,
    comprimento: Number,
    altura: Number,
    largura: Number
});

export var Products = mongoose.model('Product', schema, 'products');
