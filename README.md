# FastTexter

## Налаштування проекту


Клонування репозиторію:
```
$ git clone https://github.com/mihailBz/software_engineering.git
$ cd software_engineering
```

Завантаження моделі FastText:
```
$ curl -o ./models/ft_model.vec.gz https://dl.fbaipublicfiles.com/fasttext/vectors-crawl/cc.uk.300.vec.gz
```

Встановлення залежностей NodeJS:
```
$ npm install
```


Встановлення залежностей Python та налаштування віртуального середовища:
```
$ python3 -m venv ftvenv
$ . ./ftvenv/bin/activate
$ pip install -r requirements.txt
```
Запуск серверу:

```
$ node start.js
```


