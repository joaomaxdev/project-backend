# Project Backend - Geração Tech 🚀

Bem-vindo ao Project Backend desenvolvido como parte do programa Geração Tech. Este projeto fornece uma API robusta para gerenciamento de usuários, produtos e categorias.

## Documentação

- [Versão em Inglês](README.md)
- [Versão em Português](README-ptbr.md)

## Sumário 📚

- [Introdução](#introdução)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração do Banco de Dados](#configuração-do-banco-de-dados)
- [Testando a Aplicação](#testando-a-aplicação)
  - [Rotas de Usuário](#rotas-de-usuário)
  - [Rotas de Categorias](#rotas-de-categorias)
  - [Rotas de Produtos](#rotas-de-produtos)
- [Melhorias Futuras](#melhorias-futuras)
- [Agradecimentos](#agradecimentos)
- [Frase Motivacional](#frase-motivacional)

## Introdução 🚀

### Pré-requisitos 🛠️

Certifique-se de ter os seguintes itens instalados:

- [Node.js](https://nodejs.org/) (v14 ou superior)
- [MySQL](https://www.mysql.com/)

### Instalação 🔧

1. **Clone o Repositório:**
    ```bash
    git clone https://github.com/joaomaxdev/project-backend.git
    ```

2. **Navegue até o Diretório do Projeto:**
    ```bash
    cd project-backend
    ```

3. **Instale as Dependências:**
    ```bash
    npm install
    ```

4. **Configure as Variáveis de Ambiente:**
    Crie um arquivo `.env` no diretório raiz e adicione o seguinte conteúdo:
    ```plaintext
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=
    DB_NAME=project_root
    JWT_SECRET=sua_chave_secreta
    ```

## Configuração do Banco de Dados 🗃️

1. **Acesse o MySQL:**
    ```bash
    mysql -u root -p
    ```

2. **Crie os Bancos de Dados:**
    ```sql
    CREATE DATABASE project_root;
    CREATE DATABASE project_root_test;
    CREATE DATABASE project_root_production;
    ```

3. **Execute as Migrations:**
    ```bash
    npx sequelize-cli db:migrate
    ```

4. **Opcional - Crie as Configurações do Banco de Dados Automaticamente:**
    Você pode usar o seguinte comando para configurar automaticamente as configurações do banco de dados:
    ```bash
    npm run createdb
    ```

## Testando a Aplicação 🧪

Você pode testar os endpoints da API usando ferramentas como [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/).

### Rotas de Usuário 👤

- **Criar um Usuário:**
    - **Endpoint:** `POST /v1/user`
    - **Corpo da Requisição:**
    ```json
    {
      "firstname": "João",
      "surname": "Silva",
      "email": "joao.silva@example.com",
      "password": "senha123",
      "confirmPassword": "senha123"
    }
    ```
    - **Resposta:** Token será gerado para autenticação.

- **Atualizar um Usuário:**
    - **Endpoint:** `PUT /v1/user/:id`
    - **Corpo da Requisição:**
    ```json
    {
      "firstname": "João",
      "surname": "Silva",
      "email": "joao.silva@example.com"
    }
    ```
    - **Headers:** Adicione o token no cabeçalho de Autorização como um token Bearer.
    - **Resposta:** `204 No Content`.

- **Obter um Usuário por ID:**
    - **Endpoint:** `GET /v1/user/:id`
    - **Resposta:**
    ```json
    {
      "id": 1,
      "firstname": "João",
      "surname": "Silva",
      "email": "joao.silva@example.com"
    }
    ```

- **Excluir um Usuário:**
    - **Endpoint:** `DELETE /v1/user/:id`
    - **Resposta:**
        - `204 No Content` - Sucesso.
        - `401 Unauthorized` - Token inválido.
        - `404 Not Found` - Usuário não encontrado.

### Rotas de Categorias 🗂️

- **Criar uma Categoria:**
    - **Endpoint:** `POST /v1/category`
    - **Corpo da Requisição:**
    ```json
    {
      "name": "Calçados",
      "slug": "calcados",
      "use_in_menu": true
    }
    ```
    - **Resposta:** `201 Created`.

- **Obter Todas as Categorias:**
    - **Endpoint:** `GET /v1/category/search`

- **Obter uma Categoria por ID:**
    - **Endpoint:** `GET /v1/category/:id`

- **Atualizar uma Categoria:**
    - **Endpoint:** `PUT /v1/category/:id`
    - **Corpo da Requisição:**
    ```json
    {
      "name": "Calçados",
      "slug": "calcados",
      "use_in_menu": true
    }
    ```
    - **Resposta:** `204 No Content`.

- **Excluir uma Categoria:**
    - **Endpoint:** `DELETE /v1/category/:id`
    - **Resposta:** `204 No Content`.

### Rotas de Produtos 📦

- **Criar um Produto:**
    - **Endpoint:** `POST /v1/product`
    - **Corpo da Requisição:**
    ```json
    {
      "enabled": true,
      "name": "Produto 2",
      "slug": "produto-2",
      "stock": 10,
      "description": "Descrição do Produto 2",
      "price": 250.90,
      "price_with_discount": 199.90,
      "category_ids": [1],
      "images": [
        {
          "type": "image/png",
          "content": "imagem_base64_1"
        },
        {
          "type": "image/png",
          "content": "imagem_base64_2"
        },
        {
          "type": "image/jpg",
          "content": "imagem_base64_3"
        }
      ],
      "options": [
        {
          "title": "Cor",
          "shape": "square",
          "radius": "4px",
          "type": "text",
          "values": ["PP", "GG", "M"]
        },
        {
          "title": "Tamanho",
          "shape": "circle",
          "type": "color",
          "values": ["#000", "#333"]
        }
      ]
    }
    ```
    - **Resposta:** `201 Created`.

- **Obter Todos os Produtos:**
    - **Endpoint:** `GET /v1/product/search`

- **Obter um Produto por ID:**
    - **Endpoint:** `GET /v1/product/:id`

- **Atualizar um Produto:**
    - **Endpoint:** `PUT /v1/product/:id`
    - **Corpo da Requisição:**
    ```json
    {
      "enabled": true,
      "name": "Produto Atualizado 01",
      "slug": "produto-atualizado-01",
      "stock": 20,
      "description": "Descrição atualizada do Produto 01",
      "price": 49.90,
      "price_with_discount": 0,
      "category_ids": [1],
      "images": [
        {
          "type": "image/png",
          "content": "imagem_base64_1"
        },
        {
          "id": 2,
          "deleted": true
        },
        {
          "id": 3,
          "content": "imagem_base64_3"
        },
        {
          "id": 1,
          "content": "https://store.com/media/product-01/image-01.jpg"
        }
      ],
      "options": [
        {
          "id": 1,
          "deleted": true
        },
        {
          "id": 2,
          "radius": "10px",
          "values": ["42/43", "44/45"]
        },
        {
          "title": "Tipo",
          "shape": "square",
          "type": "text",
          "values": ["100% algodão", "65% algodão"]
        }
      ]
    }
    ```
    - **Resposta:** `204 No Content`.

- **Excluir um Produto:**
    - **Endpoint:** `DELETE /v1/product/:id`
    - **Resposta:** `204 No Content`.

## Melhorias Futuras 🚀

Devido a restrições de tempo, nem todos os endpoints estão completos. Atualizações futuras incluirão recursos adicionais e melhorias para completar totalmente o projeto.

Obrigado pela paciência. Para quaisquer dúvidas ou assistência adicional, sinta-se à vontade para entrar em contato.

## Agradecimentos 🙏

Um agradecimento especial ao programa Geração Tech e aos seus mentores pelo apoio e orientação inestimáveis ao longo deste projeto. Seu incentivo e feedback foram cruciais para o meu crescimento e para a conclusão deste trabalho.

## Frase Motivacional 💡

_"A melhor maneira de prever o futuro é criá-lo."_ - Peter Drucker

Obrigado por explorar o Project Backend. Vamos construir um futuro incrível juntos! 🌟
