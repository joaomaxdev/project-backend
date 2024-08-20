# Project Backend - Geração Tech 🚀

Welcome to the Project Backend developed as part of the Geração Tech program. This project provides a robust backend API with functionalities for user management, product handling, and category management.

## Documentation

- [English Version](README.md)
- [Versão em Português](README-ptbr.md)

## Table of Contents 📚

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Testing the Application](#testing-the-application)
  - [User Routes](#user-routes)
  - [Categories Routes](#categories-routes)
  - [Product Routes](#product-routes)
- [Future Improvements](#future-improvements)
- [Acknowledgments](#acknowledgments)
- [Motivational Quote](#motivational-quote)

## Getting Started 🚀

### Prerequisites 🛠️

Ensure that you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MySQL](https://www.mysql.com/)

### Installation 🔧

1. **Clone the Repository:**
    ```bash
    git clone https://github.com/joaomaxdev/project-backend.git
    ```

2. **Navigate to the Project Directory:**
    ```bash
    cd project-backend
    ```

3. **Install Dependencies:**
    ```bash
    npm install
    ```

4. **Configure Environment Variables:**
    Create a `.env` file in the root directory and add the following content:
    ```plaintext
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=
    DB_NAME=project_root
    JWT_SECRET=your_secret_key
    ```

## Database Setup 🗃️

1. **Log in to MySQL:**
    ```bash
    mysql -u root -p
    ```

2. **Create the Database:**
    ```sql
    CREATE DATABASE project_root;
    CREATE DATABASE project_root_test;
    CREATE DATABASE project_root_production;
    ```

3. **Run Migrations:**
    ```bash
    npx sequelize-cli db:migrate
    ```

4. **Optional - Create Database Configurations Automatically:**
    You can use the following command to automatically set up the database configurations:
    ```bash
    npm run createdb
    ```

## Testing the Application 🧪

You can test the API endpoints using tools like [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/).

### User Routes 👤

- **Create a User:**
    - **Endpoint:** `POST /v1/user`
    - **Request Body:**
    ```json
    {
      "firstname": "John",
      "surname": "Doe",
      "email": "john.doe@example.com",
      "password": "password123",
      "confirmPassword": "password123"
    }
    ```
    - **Response:** Token will be generated for authentication.

- **Update a User:**
    - **Endpoint:** `PUT /v1/user/:id`
    - **Request Body:**
    ```json
    {
      "firstname": "John",
      "surname": "Doe",
      "email": "john.doe@example.com"
    }
    ```
    - **Headers:** Add the token in the Authorization header as a Bearer token.
    - **Response:** `204 No Content`.

- **Get a User by ID:**
    - **Endpoint:** `GET /v1/user/:id`
    - **Response:**
    ```json
    {
      "id": 1,
      "firstname": "John",
      "surname": "Doe",
      "email": "john.doe@example.com"
    }
    ```

- **Delete a User:**
    - **Endpoint:** `DELETE /v1/user/:id`
    - **Response:**
        - `204 No Content` - Success.
        - `401 Unauthorized` - Invalid token.
        - `404 Not Found` - User not found.

### Categories Routes 🗂️

- **Create a Category:**
    - **Endpoint:** `POST /v1/category`
    - **Request Body:**
    ```json
    {
      "name": "Shoes",
      "slug": "shoes",
      "use_in_menu": true
    }
    ```
    - **Response:** `201 Created`.

- **Get All Categories:**
    - **Endpoint:** `GET /v1/category/search`

- **Get a Category by ID:**
    - **Endpoint:** `GET /v1/category/:id`

- **Update a Category:**
    - **Endpoint:** `PUT /v1/category/:id`
    - **Request Body:**
    ```json
    {
      "name": "Shoes",
      "slug": "shoes",
      "use_in_menu": true
    }
    ```
    - **Response:** `204 No Content`.

- **Delete a Category:**
    - **Endpoint:** `DELETE /v1/category/:id`
    - **Response:** `204 No Content`.

### Product Routes 📦

- **Create a Product:**
    - **Endpoint:** `POST /v1/product`
    - **Request Body:**
    ```json
    {
      "enabled": true,
      "name": "Product 2",
      "slug": "product-2",
      "stock": 10,
      "description": "Description of Product 2",
      "price": 250.90,
      "price_with_discount": 199.90,
      "category_ids": [1],
      "images": [
        {
          "type": "image/png",
          "content": "base64_image_1"
        },
        {
          "type": "image/png",
          "content": "base64_image_2"
        },
        {
          "type": "image/jpg",
          "content": "base64_image_3"
        }
      ],
      "options": [
        {
          "title": "Color",
          "shape": "square",
          "radius": "4px",
          "type": "text",
          "values": ["PP", "GG", "M"]
        },
        {
          "title": "Size",
          "shape": "circle",
          "type": "color",
          "values": ["#000", "#333"]
        }
      ]
    }
    ```
    - **Response:** `201 Created`.

- **Get All Products:**
    - **Endpoint:** `GET /v1/product/search`

- **Get a Product by ID:**
    - **Endpoint:** `GET /v1/product/:id`

- **Update a Product:**
    - **Endpoint:** `PUT /v1/product/:id`
    - **Request Body:**
    ```json
    {
      "enabled": true,
      "name": "Updated Product 01",
      "slug": "updated-product-01",
      "stock": 20,
      "description": "Updated description of Product 01",
      "price": 49.90,
      "price_with_discount": 0,
      "category_ids": [1],
      "images": [
        {
          "type": "image/png",
          "content": "base64_image_1"
        },
        {
          "id": 2,
          "deleted": true
        },
        {
          "id": 3,
          "content": "base64_image_3"
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
          "title": "Type",
          "shape": "square",
          "type": "text",
          "values": ["100% cotton", "65% cotton"]
        }
      ]
    }
    ```
    - **Response:** `204 No Content`.

- **Delete a Product:**
    - **Endpoint:** `DELETE /v1/product/:id`
    - **Response:** `204 No Content`.

## Future Improvements 🚀

Due to time constraints, not all endpoints are complete. Future updates will include additional features and improvements to fully complete the project.

Thank you for your patience. For any questions or further assistance, feel free to reach out.

## Acknowledgments 🙏

A special thanks to the Geração Tech program and its mentors for their invaluable support and guidance throughout this project. Your encouragement and feedback were crucial in helping me grow and complete this work.

## Motivational Quote 💡

_"The best way to predict the future is to invent it."_ – Alan Kay

---

João Max (joaomaxdev)
Fullstack Developer
