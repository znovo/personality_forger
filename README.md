# Personality Forge

Ferramenta para criação de **personalidades originais para agentes de IA**, com saída em Markdown e interface web.

O Personality Forge utiliza modelos de linguagem para transformar temas, conceitos e descrições em personalidades estruturadas, consistentes e prontas para serem utilizadas em outros projetos.

## ✨ Funcionalidades

* 🤖 Geração de personalidades usando LLMs
* 🌐 Interface web para criação e gerenciamento
* 📝 Saída em Markdown
* 🎭 Criação de personalidades a partir de temas ou conceitos
* 💾 Armazenamento local das personalidades geradas
* 📚 Listagem e visualização de personalidades salvas
* 🗑️ Exclusão de personalidades
* 🔌 Suporte a APIs compatíveis com a OpenAI
* 🧩 Arquitetura separada entre frontend, API e lógica principal
* 💻 Interface de linha de comando para geração local

## 🏗️ Arquitetura

O projeto é dividido em três partes principais:

```text
Frontend
   │
   │ HTTP
   ▼
FastAPI
   │
   ▼
Core
 ├── Generator
 ├── PromptManager
 └── LlmClient
        │
        ▼
     LLM API
```

O frontend se comunica com o backend através da API HTTP. A chave da API do modelo permanece no backend e não é exposta ao navegador.

## 📁 Estrutura

```text
personality_forge/
├── .env
├── .env.example
├── .gitignore
├── LICENSE
├── README.md
├── main.py
├── requirements.txt
├── pyproject.toml
├── uv.lock
├── start.bat
│
├── api/
│   ├── __init__.py
│   └── server.py
│
├── core/
│   ├── __init__.py
│   ├── env_import.py
│   ├── generator.py
│   ├── llm_client.py
│   └── prompt_manager.py
│
├── frontend/
│   └── # arquivos da interface web
│
└── prompts/
    ├── personality/
    │   └── # personalidades geradas
    │
    └── system/
        └── generator.md
```

### `api/`

Contém o servidor web desenvolvido com **FastAPI**.

O arquivo `server.py` disponibiliza os endpoints utilizados pelo frontend para gerar, listar, visualizar e excluir personalidades.

### `core/`

Contém a lógica principal da aplicação.

* `generator.py`
  Responsável pelo processo de geração das personalidades.

* `llm_client.py`
  Responsável pela comunicação com a API do modelo de linguagem.

* `prompt_manager.py`
  Gerencia os prompts e os arquivos de personalidades geradas.

* `env_import.py`
  Contém funções relacionadas ao carregamento das configurações de ambiente.

### `frontend/`

Contém a interface web do Personality Forge.

A interface se comunica com o backend através da API HTTP.

### `prompts/system/`

Contém os prompts utilizados internamente pelo Personality Forge para orientar a geração das personalidades.

### `prompts/personality/`

Diretório onde as personalidades geradas são armazenadas.

Os arquivos dessa pasta são gerados localmente e não devem ser enviados para o repositório.

## ⚙️ Requisitos

Antes de instalar o projeto, tenha instalado:

* **Python 3.11 ou superior** — Python 3.11 é a versão recomendada
* Uma API de modelo de linguagem compatível com a API da OpenAI

O projeto atualmente utiliza Python `>=3.11`.

O `uv` é opcional. Ele pode ser utilizado para criar o ambiente virtual e instalar as dependências, mas também é possível instalar o projeto utilizando o arquivo `requirements.txt`.

### Verificando o Python

```bash
python --version
```

O resultado recomendado é semelhante a:

```text
Python 3.11.x
```

Versões mais recentes do Python também podem funcionar, desde que sejam compatíveis com as dependências do projeto.

### Instalação com `requirements.txt`

Crie e ative um ambiente virtual:

```bash
python -m venv .venv
```

No Linux ou macOS:

```bash
source .venv/bin/activate
```

No Windows:

```bash
.venv\Scripts\activate
```

Instale as dependências:

```bash
pip install -r requirements.txt
```

### Instalação com `uv`

Caso prefira utilizar o `uv`, crie o ambiente e instale as dependências com:

```bash
uv sync
```

O `uv` é apenas uma alternativa de gerenciamento de ambiente e dependências.

## 📦 Instalação

Clone o repositório:

```bash
git clone https://github.com/SEU_USUARIO/personality_forge.git
cd personality_forge
```

Crie o ambiente virtual e instale as dependências seguindo uma das opções descritas acima.

## ▶️ Iniciando o projeto

Depois de instalar as dependências e configurar o arquivo `.env`, basta executar o arquivo `start.bat` para iniciar o frontend e o backend:

```bat
start.bat
```

O script iniciará automaticamente o servidor FastAPI e a interface web.

Após a inicialização, acesse a aplicação pelo endereço informado pelo script ou, normalmente, em:

```text
http://127.0.0.1:8000
```

O arquivo `start.bat` deve ser executado no Windows, a partir da raiz do projeto.

## 🔐 Configuração

Crie um arquivo `.env` na raiz do projeto:

```env
API_KEY=sua_api_key
BASE_URL=https://seu-endpoint/v1
MODEL=seu-modelo
```

### Variáveis

| Variável   | Descrição                     |
| ---------- | ----------------------------- |
| `API_KEY`  | Chave de autenticação da API  |
| `BASE_URL` | Endpoint base da API          |
| `MODEL`    | Modelo de linguagem utilizado |

O projeto utiliza uma API compatível com o formato da OpenAI, permitindo utilizar diferentes provedores de modelos.

> **Nunca publique sua API key no GitHub.**

O arquivo `.env` deve permanecer fora do controle de versão. Utilize `.env.example` como referência para a configuração.

## 🚀 Executando o backend

Também é possível iniciar o servidor FastAPI manualmente com:

```bash
uv run uvicorn api.server:app --reload
```

Por padrão, o servidor ficará disponível em:

```text
http://127.0.0.1:8000
```

## 🌐 Interface Web

Com o backend em execução, abra a interface localizada em:

```text
frontend/
```

A interface utiliza a API do Personality Forge para:

* Criar personalidades
* Definir o nome da personalidade
* Visualizar o resultado
* Listar personalidades salvas
* Abrir personalidades existentes
* Excluir personalidades

O backend deve estar em execução para que os recursos que dependem da API funcionem.

## 🔌 API

O backend disponibiliza atualmente os seguintes endpoints:

### `GET /health`

Verifica se o servidor está funcionando.

### `GET /personalities`

Retorna as personalidades salvas.

### `GET /personalities/{name}`

Retorna uma personalidade específica.

### `POST /generate`

Gera e salva uma nova personalidade.

Exemplo de requisição:

```json
{
  "prompt": "uma inteligência artificial curiosa, misteriosa e amigável",
  "name": "curiosa"
}
```

### `DELETE /personalities/{name}`

Remove uma personalidade salva.

### Documentação da API

O FastAPI fornece uma interface interativa para testar os endpoints:

```text
http://127.0.0.1:8000/docs
```

Também existe o endpoint de verificação:

```text
http://127.0.0.1:8000/health
```

Uma resposta saudável será:

```json
{
  "status": "ok"
}
```

## 💻 Interface de Linha de Comando

Também é possível utilizar o gerador diretamente pelo terminal:

```bash
uv run python main.py
```

O programa permite informar um tema e o nome da personalidade e salva o resultado em:

```text
prompts/personality/
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

### Exemplo de entrada

```text
Uma inteligência artificial curiosa, misteriosa e amigável.
```

### Resultado

A personalidade é estruturada em Markdown e salva localmente, por exemplo:

```text
prompts/personality/curiosa.md
```

## 🛠️ Status

**Funcional 🚀**

O projeto atualmente possui:

* [x] Cliente LLM
* [x] Carregamento de variáveis de ambiente
* [x] Gerenciamento de prompts
* [x] Gerador de personalidades
* [x] Armazenamento local
* [x] Interface de linha de comando
* [x] API REST com FastAPI
* [x] Interface web
* [x] Inicialização do frontend e backend pelo arquivo `start.bat`
* [x] Listagem de personalidades
* [x] Visualização de personalidades
* [x] Exclusão de personalidades
* [ ] Modificação de personalidades existentes

O projeto continua em desenvolvimento e novas funcionalidades podem ser adicionadas futuramente.

## 📜 Licença

Este projeto está licenciado sob a **MIT License**.

Consulte o arquivo `LICENSE` para mais informações.
