from gensim.models.fasttext import load_facebook_vectors
from gensim.test.utils import datapath

cap_path = datapath('/home/mihail/fasttexter/software_engineering/models/ft_model.bin')
wv = load_facebook_vectors(cap_path)

print(len(wv.vocab))

# from gensim.models.fasttext import FastText 

# model = FastText.load_fasttext_format('/home/mihail/fasttexter/software_engineering/models/ft_model.bin', limit=100000)


# print(len(model.wv.vocab))