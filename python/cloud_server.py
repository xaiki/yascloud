import os

from os import path
from wordcloud import WordCloud

from flask import Flask, send_file, request
from flask_cors import CORS

basepath = os.getcwd()
app = Flask(__name__)
CORS(app)

stopwords = open(f'{basepath}/python/stopwords-es.txt').read().split('\n')
wc = WordCloud(stopwords=stopwords)

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/img/<string:hash>', methods=['GET', 'POST'])
def hash_image(hash):
    filename = f"{basepath}/imgs/{hash}.png"
    try:
        return send_file(filename, mimetype="image/png")
    except:
        text = request.get_data().decode("utf-8")
        wc.generate(text).to_file(filename)
        return send_file(filename, mimetype="image/png")

