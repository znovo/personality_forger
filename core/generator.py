from pathlib import Path
import os
from dotenv import load_dotenv

from .llm_client import LlmClient
from .prompt_manager import PromptManager


class Generator:

    def __init__(self):
        load_dotenv()

        self.prompt_manager = PromptManager()


        self.base_url = os.getenv("BASE_URL")
        self.api_key = os.getenv("API_KEY")
        self.model = os.getenv("MODEL")

        if not all([self.base_url, self.api_key, self.model]):
            raise ValueError(
                "Missing required environment variables: "
                "BASE_URL, API_KEY, MODEL"
            )

        self.llm_client = LlmClient(
            self.base_url,
            self.api_key,
            self.model
        )

    def generate(self, system=None, user=None, personality_name=None):
        if system is None:
            system = self.prompt_manager.load_system()

        if user is None:
            user = "generate a random personality prompt"

        if personality_name is None:
            personality_name = "default"

        response = self.llm_client.call_model(system, user)

        self.prompt_manager.validate_personality(response)
        self.prompt_manager.save_personality(personality_name, response)

        return response
