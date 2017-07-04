import http 		from 'http';
import express 		from 'express';
import cors 	    from 'cors';
import bodyParser   from 'body-parser';
import initializeDb from './db';
import middleware 	from './middleware';
import api 			from './api';

console.log('Starting Mage4You API E-Commerce');

let app = express();
app.server = http.createServer(app);



// 3rd party middleware
app.use(cors({
	exposedHeaders: [
		'Link'
	]
}));

app.use(bodyParser.json({
	limit : '50mb'
}));

app.use(bodyParser.urlencoded({
  extended: true
}));

// Initialize 
initializeDb(db => {
	app.use(middleware({db}));
	app.use('/api', api({db}));

	app.server.listen(process.env.API_PORT || 81);
});

export default app;
