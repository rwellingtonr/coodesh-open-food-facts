# Coodesh Open Food Facts

Informações nutricionais de diversos produtos alimentícios

## Tecnologias

- Axios
- Class Transformer
- Class Validator
- Docker
- Express
- Faker.js
- Helmet
- MongoDB
- NestJS
- Node.js 20
- Readline
- Swagger
- Throttler
- TypeScript
- Vitest
- zlib

## Como Iniciar

### Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/)
- [Node.js](https://nodejs.org/en/download/)
- [PNPM](https://pnpm.io/installation)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/rwellingtonr/coodesh-open-food-facts.git

# Entre na pasta do projeto
cd coodesh-open-food-facts

# Instale o PNPM, caso ainda não tenha
npm install -g pnpm

# Instale as dependências com o PNPM
pnpm i
```

### Configuração

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis de ambiente:

```bash
# Porta do servidor HTTP
PORT=3333
# URL do MongoDB
DATABASE_URL="mongodb://localhost:27017/coodesh?directConnection=true&authSource=admin"
# Chave de API para requisições HTTP
API_KEY='646c490db8f1951b717be6816af287e0'
# URL do servidor de desafios
CHALLENGES_BASE_URL="https://challenges.coode.sh/food/data/json"
# Podendo escolher o melhor horário para a execução do job
CRON_TIME='EVERY_DAY_AT_1AM'
```

Possíveis valores para CRON_TIME:

- EVERY_DAY_AT_1AM
- EVERY_DAY_AT_2AM
- EVERY_DAY_AT_3AM
- EVERY_DAY_AT_4AM
- EVERY_DAY_AT_5AM
- EVERY_DAY_AT_6AM
- EVERY_DAY_AT_7AM
- EVERY_DAY_AT_8AM
- EVERY_DAY_AT_9AM
- EVERY_DAY_AT_10AM
- EVERY_DAY_AT_11AM
- EVERY_DAY_AT_NOON
- EVERY_DAY_AT_1PM
- EVERY_DAY_AT_2PM
- EVERY_DAY_AT_3PM
- EVERY_DAY_AT_4PM
- EVERY_DAY_AT_5PM
- EVERY_DAY_AT_6PM
- EVERY_DAY_AT_7PM
- EVERY_DAY_AT_8PM
- EVERY_DAY_AT_9PM
- EVERY_DAY_AT_10PM
- EVERY_DAY_AT_11PM
- EVERY_DAY_AT_MIDNIGHT

Ou simplemente copie o arquivo `.env.example`

```bash
cp .env.example .env
```

### Executando o projeto

Primeiramente, vamos precisar subir o `docker-compose` para o MongoDB e em seguida podemos iniciar a aplicação.

```bash
# Inicie o docker-compose
docker compose up -d

# Rode as migration do prisma
pnpm prisma:push

# Realize o build
pnpm build

# Inicie o servidor

pnpm start:prod
```

## Executar os testes automatizados

Após feita toda a configuração, podemos executar os testes automatizados com o comando:

```bash
pnpm test
```

## Documentação OPEN API 3.0

Para acessar a documentação do projeto, basta acessar a URL `http://localhost:3333/docs` no seu navegador.

## Arquitetura

Para este projeto foi adotada o Clean Architecture, que é uma arquitetura de software que separa as responsabilidades de negócios, de domínio e de controladores.

[Clean Architecture](https://medium.com/luizalabs/descomplicando-a-clean-architecture-cf4dfc4a1ac6)

### Motivação

Manter um código limpo e organizado ajuda a manter o código mais legível e fácil de manter. Assim, separando as responsabilidades do software, mantendo um código menos acoplamento e mais modularizado.

## Funcionamento do CRON

Primeiramente, ele busca todos os nomes de arquivos `.gz` para serem processados. Após isso, se inicia um loop para fazer o download do arquivo, ser descompactado e processado via stream. Ou seja, todo o processamento é feito sem sobrecarregar a memória do servidor, pois não guarda os dados em memória, mas é processado via demanda. Assim, evitando o travamento do Node.js e sobrecarga de memória.
Todo processo é monitorado por uma **Collection** auxiliar, assim, gravando o status de cada arquivo a ser processado, se houve alguma erro ao ler alguma linha do arquivo, quanto foi consumido de memória e quanto tempo demorou para processar o arquivo.
