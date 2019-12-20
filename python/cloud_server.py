import os

from os import path
from wordcloud import WordCloud

from flask import Flask, send_file, request
from flask_cors import CORS

basepath = os.getcwd()
app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/img/<string:hash>', methods=['GET', 'POST'])
def hash_image(hash):
    filename = f"{basepath}/imgs/{hash}.png"
    print("got request for", hash)
    try:
        return send_file(filename, mimetype="image/png")
    except:
        text = request.get_data().decode("utf-8")
        print("processing for", text)
        WordCloud().generate(text).to_file(filename)
        return send_file(filename, mimetype="image/png")
