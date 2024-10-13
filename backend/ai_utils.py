from openai import OpenAI
import json

with open("config.json") as config_file:
    config = json.load(config_file)
    perplexity_api_key = config["perplexity-api-key"]
client = OpenAI(api_key=perplexity_api_key, base_url="https://api.perplexity.ai")

def analyze_text(text: str) -> dict:
    response = client.chat.completions.create(
        model="llama-3.1-sonar-small-128k-chat",
        messages=[
            {
                "role": "system",
                "content": (
                    "Analyze the dream and rate the following emotions on a scale of 0-10: "
                    "happiness, sadness, fear, anger, surprise, and disgust. Also, identify the overall concern "
                    "present in the dream on a scale of 0-10. Return only the ratings as a JSON object for emotions and the "
                    "concern as a separate string, formatted as: {\"analytics\": <ratings>, \"concern\": <concern>}. "
                    "Do not include any additional text."
                ),
            },
            {
                "role": "user",
                "content": text,
            },
        ],
        max_tokens=150,  # Increased to accommodate extra information
        temperature=0.0,
    )
    
    content = response.choices[0].message.content
    analytics_response = json.loads(content.strip("`json"))
    
    # Ensure the response contains both analytics and concern
    analytics = analytics_response.get("analytics", {})
    concern = analytics_response.get("concern", "")
    
    return {"message": text, "analytics": analytics, "concern": concern}

def analyze_concern(text: str) -> dict:
    response = client.chat.completions.create(
        model="llama-3.1-sonar-small-128k-chat",
        messages=[
            {
                "role": "system",
                "content": "Analyze the emotions (happiness, sadness, fear, anger, surprise, disgust) and duration of sleep over the past 7 days of data. Compute a 'concern' value on a scale of 0-10, considering that the 'concern' value should be calculated conservatively, with higher concern assigned only if there are extreme spikes in negative emotions (sadness, fear, anger, disgust) or unusual emotional variations. Additionally, identify and return a message that specifies what is specifically causing the concern. Do not return individual emotion ratings. Return only the computed concern value and the message as a JSON object with no text outside the braces."
            },
            {
                "role": "user",
                "content": text,
            },
        ],
        temperature=0.0,
    )
    content = response.choices[0].message.content
    concern = json.loads(content.strip("`json"))
    return {"message": text, "concern": concern}