import openai

class LlmClient:
    def __init__(self, base_url: str, api_key: str, model: str):
        self.base_url = base_url
        self.api_key = api_key
        self.model = model
        self.client = openai.OpenAI(api_key=self.api_key, base_url=self.base_url)

    def swap_model(self, new_model: str):
        self.model = new_model
    def swap_api_key(self, new_api_key: str):
        self.api_key = new_api_key
    def swap_base_url(self, new_base_url: str):
        self.base_url = new_base_url

    def call_model(self, system, user, temperature=0.9):
        messages = [
            {"role": "system", "content": system},
            {"role": "user", "content": user}
        ]
        response = self.client.chat.completions.create(
            model=self.model,
            messages=messages,
            temperature=temperature
        )
        return response.choices[0].message.content
