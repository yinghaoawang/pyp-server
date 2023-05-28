import requests
from flask import Flask

app = Flask(__name__)

@app.route('/')
def index():
    response = requests.get('http://0.0.0.0:5002/')
    return "Gottem"