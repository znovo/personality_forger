from pathlib import Path


class PromptManager:
    def __init__(self):
        self._prompts_path = Path(__file__).parent.parent / "prompts"

        self.personality_output = self._prompts_path / "personality"
        self.system_personality = self._prompts_path / "system"

    def save_personality(self, personality_name: str, content: str):
        """Save a prompt to the prompts directory."""
        prompt_file = self.personality_output / f"{personality_name}.md"
        with open(prompt_file, 'w') as file:
            file.write(content)

    def load_system(self):
        """Load the system prompt from the prompts directory."""
        system_prompt_file = self.system_personality / "generator.md"
        if system_prompt_file.exists():
            with open(system_prompt_file, 'r') as file:
                return file.read()
        else:
            raise FileNotFoundError(f"System prompt file {system_prompt_file} not found.")