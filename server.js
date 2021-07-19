const express = require('express');
const mongoose = require('mongoose');
const ShortUrl = require('./models/shortUrl');

require('dotenv').config();

const app = express();
mongoose.connect(
	process.env.DB_URL,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	(err) => {
		if (err) {
			console.log("Can't connect to database");
		}
	},
);

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
	res.render('index');
});

app.post('/shortUrls', async (req, res) => {
	await ShortUrl.create({ full: req.body.fullUrl });
	res.redirect('/');
});

app.listen(process.env.PORT || 3000);
