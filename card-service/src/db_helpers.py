from pymongo import MongoClient
from config import get_config


def get_database():
    # Provide the mongodb atlas url to connect python to mongodb using pymongo
    connectionString = get_config()['db']['connectionString']

    # Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
    client = MongoClient(connectionString)

    # Create the database for our example (we will use the same database throughout the tutorial
    return client['card-service']


def get_cards():
    db = get_database()
    collection = db['cards']
    cards = collection.find()
    cardList = []

    for card in cards:
        card['_id'] = str(card['_id'])
        cardList.append(card)

    return cardList


def insert_card(card_data):
    db = get_database()
    db['cards'].insert_one(card_data)
