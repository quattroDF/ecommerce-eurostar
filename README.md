# E-Commerce REST API

## Description

This project is a REST API for an e-commerce platform built with **JavaScript** and **Express**. It allows consumers to register, log in to receive a JWT token, and perform authenticated checkouts. All data is stored in memory — no database is required.

The API follows a layered architecture with **Routes**, **Middleware**, **Controllers**, **Services**, and **Models** under the `src` folder.

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd ecommerce-eurostar
```

2. Install dependencies:

```bash
npm install
```

## How to Run

Start the server:

```bash
npm start
```

The API will be available at `http://localhost:3000`.

For development with auto-restart on file changes:

```bash
npm run dev
```

## Rules

- **Authentication**: Only authenticated users (with a valid JWT token) can perform checkout.
- **Payment methods**: Checkout accepts only `cash` or `credit_card`.
- **Cash discount**: Paying with `cash` applies a **10% discount** on the order subtotal.
- **In-memory storage**: All users and products are stored in memory. Data resets when the server restarts.
- **Endpoints**: The API exposes exactly four endpoints — register, login, checkout, and healthcheck.

## Existent Data

### Users (password for all: `password123`)

| ID | Email               | Name            |
|----|---------------------|-----------------|
| 1  | alice@example.com   | Alice Johnson   |
| 2  | bob@example.com     | Bob Smith       |
| 3  | carol@example.com   | Carol Williams  |

### Products

| ID | Name                 | Price   | Stock |
|----|----------------------|---------|-------|
| 1  | Wireless Headphones  | $79.99  | 50    |
| 2  | Smart Watch          | $199.99 | 30    |
| 3  | USB-C Hub            | $49.99  | 100   |

## How to Use the Rest API

### 1. Health Check

Verify the server is running:

```bash
curl http://localhost:3000/healthcheck
```

**Response:**

```json
{
  "status": "ok",
  "timestamp": "2026-06-15T12:00:00.000Z"
}
```

### 2. Register

Create a new user account:

```bash
curl -X POST http://localhost:3000/register \
  -H "Content-Type: application/json" \
  -d "{\"email\": \"newuser@example.com\", \"password\": \"mypassword\", \"name\": \"New User\"}"
```

**Response:**

```json
{
  "user": {
    "id": 4,
    "email": "newuser@example.com",
    "name": "New User"
  },
  "token": "<JWT_TOKEN>"
}
```

### 3. Login

Authenticate and receive a JWT token:

```bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d "{\"email\": \"alice@example.com\", \"password\": \"password123\"}"
```

**Response:**

```json
{
  "user": {
    "id": 1,
    "email": "alice@example.com",
    "name": "Alice Johnson"
  },
  "token": "<JWT_TOKEN>"
}
```

### 4. Checkout

Place an order (requires authentication). Include the JWT token in the `Authorization` header.

**Credit card payment:**

```bash
curl -X POST http://localhost:3000/checkout \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -d "{\"items\": [{\"productId\": 1, \"quantity\": 2}, {\"productId\": 3, \"quantity\": 1}], \"paymentMethod\": \"credit_card\"}"
```

**Cash payment (10% discount applied):**

```bash
curl -X POST http://localhost:3000/checkout \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -d "{\"items\": [{\"productId\": 2, \"quantity\": 1}], \"paymentMethod\": \"cash\"}"
```

**Response:**

```json
{
  "orderId": 1718452800000,
  "userId": 1,
  "items": [
    {
      "productId": 2,
      "name": "Smart Watch",
      "unitPrice": 199.99,
      "quantity": 1,
      "lineTotal": 199.99
    }
  ],
  "paymentMethod": "cash",
  "subtotal": 199.99,
  "discount": 20,
  "total": 179.99
}
```

### Error Responses

| Status | Scenario                                      |
|--------|-----------------------------------------------|
| 400    | Invalid request body or payment method        |
| 401    | Missing, invalid, or expired JWT token        |
| 404    | Product not found                             |
| 409    | Email already registered                      |
| 500    | Internal server error                         |
