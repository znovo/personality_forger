# Personality Forge

Ferramenta para criação de **personalidades originais para agentes de IA**, com saída em Markdown.

O objetivo é facilitar a criação de personalidades consistentes sem precisar escrever manualmente todos os detalhes de comportamento, comunicação e emoções.

## ✨ Funcionalidades

* 🤖 Geração de personalidades usando LLMs
* 📝 Saída em arquivos Markdown
* 🎭 Criação de personalidades a partir de temas ou conceitos
* 🔧 Estrutura preparada para modificar personalidades existentes
* 🔌 Suporte a APIs compatíveis com a OpenAI

## 📁 Estrutura

```text
personality_forge/
├── .env
├── core/
│   ├── env_import.py
│   ├── llm_client.py
│   └── prompt_manager.py
│
└── prompts/
    ├── personality/
    │   └── # personalidades geradas
    │
    └── system/
        └── generator.md
```

### `core/`

Contém a lógica principal da aplicação.

* `env_import.py`
  Carrega as configurações do ambiente.

* `llm_client.py`
  Responsável pela comunicação com o modelo de linguagem.

* `prompt_manager.py`
  Gerencia os prompts utilizados pelo projeto e os arquivos de saída.

### `prompts/system/`

Contém os prompts utilizados internamente pelo Personality Forge.

### `prompts/personality/`

Diretório onde as personalidades geradas são armazenadas.

Os arquivos dessa pasta são gerados localmente e não devem ser enviados para o repositório.

## ⚙️ Configuração

Crie um arquivo `.env` na raiz do projeto:

```env
API_KEY=sua_api_key
BASE_URL=https://seu-endpoint/v1
MODEL=seu-modelo
```

O projeto utiliza uma API compatível com o formato da OpenAI, permitindo utilizar diferentes provedores de modelos.

> **Nunca publique sua API key no GitHub.**

## 🚀 Uso

O projeto ainda está em desenvolvimento.

A ideia é permitir algo semelhante a:

```text
Tema: inteligência artificial curiosa, misteriosa e amigável
```

E gerar automaticamente uma personalidade em:

```text
prompts/personality/personality.md
```

## 🧠 Personalidades

Uma personalidade gerada pode conter informações como:

* Essência
* Traços de personalidade
* Forma de comunicação
* Comportamento
* Expressão emocional
* Humor
* Relação com o usuário
* Contradições
* Exemplos de comportamento

O objetivo é produzir uma personalidade **original e consistente**, em vez de simplesmente copiar a personalidade de um personagem existente.

## 🛠️ Status

**Em desenvolvimento 🚧**

Atualmente o projeto está sendo estruturado, com foco inicial em:

* [x] Cliente LLM
* [x] Carregamento de variáveis de ambiente
* [x] Gerenciamento de prompts
* [ ] Gerador de personalidades
* [ ] Modificação de personalidades existentes
* [ ] Interface de linha de comando

## 📜 Licença

Este projeto está licenciado sob a **MIT License**.

Consulte o arquivo `LICENSE` para mais informações.
