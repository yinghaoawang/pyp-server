from flask import Flask

app = Flask(__name__)

@app.route('/')
def index():
    return '{"res": "Hello, World!"}'
