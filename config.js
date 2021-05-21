const path = require("path")

module.exports = {
	service: {
		lang: "uk",
		mode: process.env.NODE_ENV || "development",
		port: process.env.PORT || 3001,
		host: process.env.HOST || "localhost"
	},

	python: {
		// mode: 'text',
		encoding: 'utf8',
		pythonOptions: ['-u'],
		scriptPath: __dirname + '/src/python/',
		pythonPath: 'python',
		args: [process.env.NODE_ENV || "development"]
	}
}