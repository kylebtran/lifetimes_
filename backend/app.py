from fastapi import FastAPI
from pymongo import MongoClient
from pymongo.server_api import ServerApi
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import json
with open("config.json") as config_file:
    config = json.load(config_file)
    MONGODB_URI = config["MONGODB_URI"]

import ai_utils
import calc_utils

dream = "I find myself standing in a city made entirely of glass. Every building stretches toward the sky like delicate, shimmering towers, reflecting an endless expanse of stars above. The sky isn’t dark, though—it glows with a soft, otherworldly light, illuminated by not just one moon, but dozens. Each moon is a different color—some are pale silver, others are deep violet, soft pink, or golden—and they seem to hang impossibly close, like lanterns suspended just out of reach. As I walk, my footsteps create ripples on the smooth surface of the streets, which are as clear as water. The ripples spread outward in perfect circles, but instead of fading, they cause the glass around me to hum softly, like a distant melody. There are no people here, just the quiet song of the city and the moons watching. Suddenly, I notice something strange: a seed in my palm, glowing faintly. Before I can react, it takes root in my hand, growing rapidly into a tree that spirals upward in twisting, crystalline branches. The branches stretch, and as they reach their full length, they begin to turn into birds—translucent and shimmering, as if made of light. The birds lift off, circling me, and I feel my feet leave the ground. They carry me higher and higher, past the towering glass structures, past the glowing moons, until I am weightless. The city below fades into a blur of shimmering light, and I am no longer solid—just a part of the night sky, dissolving into the stars. I feel no fear, only a deep sense of peace, as if I’ve returned to where I belong."

uri = MONGODB_URI
app = FastAPI()
client = MongoClient(uri, server_api=ServerApi("1"))

class Text(BaseModel):
    text: str

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

@app.post("/analyze_text")
def analyze_text(data: Text):
    payload = ai_utils.analyze_text(data.text)
    vectors = calc_utils.vectorize_data(payload["analytics"])
    avg_vector = calc_utils.average_vectors(vectors).tolist()
    payload["coordinates"] = dict(zip(["x", "y"], avg_vector))
    print(payload)
    return payload

@app.post("/analyze_concern")
def analyze_concern(data: Text):
    payload = ai_utils.analyze_concern(data.text)
    print(payload)
    return payload