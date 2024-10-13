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
                    "happiness, sadness, fear, anger, surprise, and disgust. Rate the overall concern"
                    "present in the dream on a scale of 0-10. Return only the ratings as a JSON object for emotions and the "
                    'concern as a separate string, formatted as: {"analytics": <ratings(int)>, "concern": <concern(int)>}. '
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
                "content": (
                    'Analyze the text contents of the dreams over the past 7 days. If the provided concern value indicates substantial concern, return a general summary of what is concerning, along with bullet points for the most concerning sentences with the day formatted as (Day). If there are no concerning dreams, state that explicitly. Store the result as a JSON object with the following structure:'
                    '{"summary": "<general summary>", "bulletPoints": ["<most concerning sentence 1>", "<most concerning sentence 2>", ...]}'
                ),
            },
            {
                "role": "user",
                "content": text,
            },
        ],
        temperature=0.0,
    )
    content = response.choices[0].message.content
    print(content)
    concern = json.loads(content.strip("`json"))
    return {"res": concern}
