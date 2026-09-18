from env_import import EnvImport
from llm_client import LlmClient
from prompt_manager import PromptManager

class Generator:
    def __init__(self):
        self.env_importer = EnvImport(".env")
        self.env_importer.load_env()
        self.prompt_manager = PromptManager()

        self.base_url = self.env_importer.get_env_var("BASE_URL")
        self.api_key = self.env_importer.get_env_var("API_KEY")
        self.model = self.env_importer.get_env_var("MODEL")

        if not all([self.base_url, self.api_key, self.model]):
            raise ValueError("Missing required environment variables: BASE_URL, API_KEY, MODEL")

        self.llm_client = LlmClient(self.base_url, self.api_key, self.model)