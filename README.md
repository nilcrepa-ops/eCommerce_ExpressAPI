# eCommerce Express API

A simple Express.js project that exposes a CRUD API for products backed by a MySQL database and a small client interface served from `public/`.

## Features

- REST endpoints to list, read, create, update and delete products
- MySQL database connection via `mysql2`
- Environment-configured database credentials using `dotenv`
- Static frontend files served from `public/`

## Project Structure

- `app.js` - main Express server and API routes
- `db.js` - MySQL connection setup
- `public/` - static frontend
  - `index.html` - product management UI
  - `script.js` - frontend logic and API calls
  - `style.css` - frontend styling
- `package.json` - project dependencies

## Requirements

- Node.js 18+ (recommended)
- MySQL server

## Installation

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the project root with your database credentials:

```env
DB_HOST=localhost
DB_USER=your_db_user
DB_PASS=your_db_password
DB_NAME=your_db_name
```

3. Make sure the `products` table exists in your MySQL database.

## Running the Project

Start the server with:

```bash
node app.js
```

If you want automatic restart during development, use:

```bash
npx nodemon app.js
```

Then open:

```
http://localhost:3000
```

## API Endpoints

- `GET /products` - Get all products
- `GET /products/:prod_id` - Get a single product by ID
- `POST /products` - Create a new product
- `PUT /products/:prod_id` - Update an existing product
- `DELETE /products/:prod_id` - Delete a product

### JSON request format for POST / PUT

```json
{
  "product": {
    "prod_name": "Example name",
    "prod_price": 19.99,
    "prod_desc": "Product description"
  }
}
```

## Notes

- The server serves static files from the `public/` folder.
- If the frontend does not update automatically after a delete, refresh the page.
- The project currently uses `app.js` as the entry point even though `package.json` defines `main: index.js`.

## License

This project is provided as-is.
