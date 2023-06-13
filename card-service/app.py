import requests
from flask import Flask, jsonify, request

from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

engine = create_engine('sqlite:///database.db', echo=True)

Base = declarative_base()


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    name = Column(String)
    email = Column(String)


Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)
session = Session()

app = Flask(__name__)


@app.route('/', methods=['GET'])
def index():
    users = session.query(User).all()
    json_array = []

    for user in users:
        print(user.name, user.email)
        json_array.append({
            'name': user.name,
            'email': user.email
        })
    return jsonify(json_array)


@app.route('/email/<string:email>', methods=['GET'])
def get_email(email):
    user = session.query(User).filter_by(email=email).first()

    if user is not None:
        response = {
            'id': user.id,
            'name': user.name,
            'email': user.email
        }
        return jsonify(response)
    else:
        return jsonify({'message': 'User does not exist'})


@app.route('/create', methods=['POST'])
def create():
    data = request.json

    if data.get('name') is None or data.get('email') is None:
        return jsonify({'message': 'Missing name or email'})

    new_user = User(name=data.get('name'), email=data.get('email'))
    session.add(new_user)
    session.commit()

    response = {
        'name': data.get('name'),
        'email': data.get('email')
    }
    return jsonify(response)


@app.route('/delete', methods=['DELETE'])
def delete():
    data = request.json
    user = session.query(User).filter_by(email=data.get('email')).first()

    if user:
        session.delete(user)
        session.commit()
        return jsonify({'message': 'User deleted successfully'})
    else:
        return jsonify({'message': 'User not found'})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002)
