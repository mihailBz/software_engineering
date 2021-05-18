import io
import sys
import os
import json
import re
from gensim.models.fasttext import FastText

from gensim.models.fasttext import load_facebook_vectors
from gensim.test.utils import datapath
from gensim.models.keyedvectors import KeyedVectors

DEBUG = True

if not DEBUG:
	cap_path = datapath('/home/mihail/fasttexter/software_engineering/models/ft_model.bin')
	wv = load_facebook_vectors(cap_path)
else:
	wv = KeyedVectors.load_word2vec_format('/home/mihail/fasttexter/software_engineering/models/ft_model.vec.gz', limit=100000)


input_stream = io.TextIOWrapper(sys.stdin.buffer, encoding='utf8')

if __name__ == '__main__':
	for line in input_stream:
		input_json = json.loads(line)
		method = input_json['method']
		output = {'request': input_json, 'response': 'RESPONSE FROM PYTHON'}
		if method != 'calculate_words':
			text = input_json['params']['text']
			if method == 'get_synonyms':
				most_similar = wv.most_similar(text)
				most_similar = [word for word, _ in most_similar]
				output.update({
					'response': {'most_similar': most_similar}
					})
			elif method == 'get_extra_word':
				extra_word = wv.doesnt_match(re.split(', |,|\s', input_json['params']['text']))
				output.update({
					'response': {'extra_word': extra_word}
					})
		else:
			positive = re.split(', |,|\s', input_json['params']['positive'])
			negative = re.split(', |,|\s', input_json['params']['negative'])
			result = wv.most_similar(positive=positive, negative=negative, topn=1)[0][0]
			output.update({
					'response': {'result': result}
					})

		output_json = json.dumps(output, ensure_ascii=False).encode('utf-8')
		sys.stdout.buffer.write(output_json)
		print()

