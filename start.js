app = require('./server')

app.listen(config.service.port, () => {
	console.log(`fastexter service for ukr language starts on port ${config.service.port} in ${config.service.mode} mode.`);
});