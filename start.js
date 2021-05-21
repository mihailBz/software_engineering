const app = require('./server')
const config = require('./config')

app.listen(config.service.port, () => {
	console.log(`fastexter service for ukr language starts on port ${config.service.port} in ${config.service.mode} mode.`);
});