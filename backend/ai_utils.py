from openai import OpenAI
import json
with open("config.json") as config_file:
    config = json.load(config_file)
    perplexity_api_key = config["perplexity-api-key"]
client = OpenAI(api_key=perplexity_api_key, base_url="https://api.perplexity.ai")
def analyze_dream(dream):
    response = client.chat.completions.create(
        model="llama-3.1-sonar-small-128k-chat",
        messages=[
            {
                "role": "system",
                "content": "Analyze the dream and rate the following emotions on a scale of 0-10: happiness, sadness, fear, anger, surprise, and disgust. Return only the ratings as a JSON object with no text outside the braces.",
            },
            {
                "role": "user",
                "content": dream,
            },
        ],
        max_tokens=100,
        temperature=0.0,
    )
    content = response.choices[0].message.content
    ratings = json.loads(content)
    return {"dream": dream, "ratings": ratings}