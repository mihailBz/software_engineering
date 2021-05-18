let {PythonShell} = require('python-shell')
const _ = require('lodash')
const config = require('../../config')
const v4 = require('uuid').v4


let Queue = require('queue-promise')
const queue = new Queue({
	concurrent: 1,
	interval: 2
});

queue.on('start', () => {
	console.log(`Queue started at ${new Date()}`)
});

queue.on('stop', () => {
	console.log(`Queue stopped at ${new Date()}`)
});

queue.on('resolve', data => console.log('task:', data, ' resolved'));
queue.on('reject', error => console.error(error));

let task = (method, params, res) => () => new Promise((resolve, reject) => {
	params = _.extend(params, {_id:v4()})

	let command = {
		method,
		params
	}
	console.log('SEND>', JSON.stringify(command))


	// const data = {
	// method: 'get_synonyms',
	// params: {'text': 'HHHHHEEELLLLOOOO'}
	// };

	// fastexter.send(JSON.stringify(data), { mode: 'json' });

	// fastexter.on('message', message => {
	// 	console.log(message);
	// });

	// fastexter.end((err, code, signal) => {
	// 	if (err) throw err;
	// 	console.log(`The exit code was: ${code}`);
	// 	console.log('finished');
	// });

	// PythonShell.run('fastexter.py', _.extend(config.python), (err, result) => {
	// 	if (err) throw err;
	// 	console.log(`result: ${result}`)

	// });

	// fastexter.send('HELLO FORM JS TO PYTHON', { mode: 'text'})

	// fastexter.stdout.on('data', (data) => {
	// 	console.log('In "on" statement')
	// 	console.log(data);
	// });

	fastexter.send(JSON.stringify(command), { mode: 'json' });


	fastexter.once('message', (message) => {
		let data = JSON.parse(message)
		command.result = data.response
		console.log(`recievd a message from python ${command}`);
		res.json(command);
		resolve(command)
	});

	// fastexter.end((err, code, signal) => {
	// 	if (err) throw err;
	// 	console.log(`The exit code was: ${code}`);
	// 	console.log(`The exit signal was: ${signal}`);
	// 	console.log('finished');
	// });

})

let fastexter = new PythonShell('fastexter.py', _.extend(config.python));

console.log('MODEL HAS BEEN LOADED');



module.exports = [
	{
		method: 'post',
		path: '/synonym',
		handler: (req, res) => {

			queue.enqueue(task(
				'get_synonyms',
				{'text': req.body.text || ''},
				res
				));
			console.log('Got body.text: ', req.body.text)
		}
	},

	{
		method: 'post',
		path: '/wordcalc',
		handler: (req, res) => {
			queue.enqueue(task(
				'calculate_words',
				{
					'positive': req.body.positive || '',
					'negative': req.body.negative || ''
				},
				res
			))
		}
	},

	{
		method: 'post',
		path: '/extraword',
		handler: (req, res) => {
			queue.enqueue(task(
				'get_extra_word',
				{
					'text': req.body.text || ''
				},
				res
			))
		}
	}
]