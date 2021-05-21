const bodyParser = require('body-parser')
const express = require('express')
const config = require('./config')
const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

require("./src/javascript/routes").forEach( route => {
	app[route.method](route.path, route.handler)
})


app.get('/', (req, res) => {
	res.sendStatus(200)
});

module.exports = app