from pathlib import Path
import re

class PromptManager:
    def __init__(self):
        self._prompts_path = Path(__file__).parent.parent / "prompts"
        self.personality_output = self._prompts_path / "personality"
        self.system_personality = self._prompts_path / "system"

        self.personality_output.mkdir(parents=True, exist_ok=True)

    def save_personality(self, personality_name: str, content: str):
        personality_name = re.sub(
            r'[<>:"/\\|?*]',
            "_",
            personality_name
        )

        prompt_file = self.personality_output / f"{personality_name}.md"

        with open(prompt_file, "w", encoding="utf-8") as file:
            file.write(content)

    def load_system(self):
        """Load the system prompt from the prompts directory."""
        system_prompt_file = self.system_personality / "generator.md"
        if system_prompt_file.exists():
            with open(system_prompt_file, 'r', encoding="utf-8") as file:
                return file.read()
        else:
            raise FileNotFoundError(f"System prompt file {system_prompt_file} not found.")
    def validate_personality(self, content: str):
        if not content.strip():
            raise ValueError("The generated personality is empty.")

        if not content.lstrip().startswith("# Personality"):
            raise ValueError(
                "The generated personality does not start with '# Personality'."
            )

        return True