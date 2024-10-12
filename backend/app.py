from fastapi import FastAPI
from pymongo import MongoClient
from pymongo.server_api import ServerApi
from fastapi.middleware.cors import CORSMiddleware

import json
with open("config.json") as config_file:
    config = json.load(config_file)
    MONGODB_URI = config["MONGODB_URI"]

uri = MONGODB_URI
app = FastAPI()
client = MongoClient(uri, server_api=ServerApi('1'))
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict origins to the Next.js domain for security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}