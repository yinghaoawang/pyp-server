import requests
from flask import Flask

app = Flask(__name__)

@app.route('/')
def index():
    response = requests.get('http://app1:5000')
    data = response.json()
    return "Data received: {}".format(data)
