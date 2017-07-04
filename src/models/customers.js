import mongoose from 'mongoose';

let schema = new mongoose.Schema({
	first_name: {
        type    : String,
        required: [true, 'First name is required.']
    },
    last_name: {
        type    : String,
        required: [true, 'Last name is required.']
    },
    email: {
        type    : String,
        validate: {
            validator: (v) => {
                return /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i.test(v);
            }
        },
        required: [true, 'Email is required.']
    },
    birthdate: {
        type    : String,
        required: [true, 'Birthdate is required.']
    },

    addresses: [
        {
			telephone: String,
			zip_code: String,
			country: String,
			state: String,
			city: String,
			neighborhood: String,
			complement: String,
			number: String,
			street: String,
			name: String
        }
    ]
});

export var Customers = mongoose.model('Customer', schema, 'customers');
