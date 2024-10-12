from pymongo import MongoClient
import json
with open("config.json") as config_file:
    config = json.load(config_file)
    MONGODB_URI = config["MONGODB_URI"]

client = MongoClient(MONGODB_URI)
db = client.todo_db
collection_name = db["todo_collection"]