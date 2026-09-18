class EnvImport:
    def __init__(self, env_file: str):
        self.env_file = env_file
        self.env_vars = {}

    def load_env(self):
        """Load environment variables from a .env file."""
        try:
            with open(self.env_file, 'r') as file:
                for line in file:
                    line = line.strip()
                    if line and not line.startswith('#'):
                        key, value = line.split('=', 1)
                        self.env_vars[key.strip()] = value.strip()
        except FileNotFoundError:
            print(f"Environment file {self.env_file} not found.")
        except Exception as e:
            print(f"An error occurred while loading the environment file: {e}")

    def get_env_var(self, key: str):
        """Get the value of an environment variable."""
        return self.env_vars.get(key)
    def set_env_var(self, key: str, value: str):
        """Set the value of an environment variable."""
        with open(self.env_file, 'a') as file:
            file.write(f"{key}={value}\n")
        self.env_vars[key] = value