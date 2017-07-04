import mongoose from 'mongoose';

export default callback => {
	require('dotenv').config();

	mongoose.connect(process.env.DB_URI);

	callback(mongoose.connection);
}
