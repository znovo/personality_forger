from core.generator import Generator

generator = Generator()
saidas = ["sair","exit", "quit","q", "bye"]
user = ""

print("BEM VINDO AO GERADOR DE PERSONALIDADES!")
while user not in saidas:
    user = input("escreva uma personalidade que você deseja gerar (ou pressione Enter para gerar uma aleatória): ")
    if user == "":
        user = None
    personality_name = input("Digite o nome da personalidade (ou pressione Enter para usar 'default'): ")
    if personality_name == "":
        personality_name = "default"

    try:
        personality = generator.generate(
            user=user,
            personality_name=personality_name
        )

    except Exception as e:
        print("\nErro ao gerar personalidade:")
        print(e)
        exit(1)
    print("==========================================================")
    print(f"Personalidade gerada com sucesso! Salva como '{personality_name}.md' na pasta 'prompts/personality'.")
    print("Conteúdo da personalidade gerada:")
    print("==========================================================")
    print(personality)
    print("==========================================================")