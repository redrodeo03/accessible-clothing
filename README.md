# Accessible Clothing Website

This project is a website for a brand that makes accessible, comfortable clothes for individuals with disabilities.

## Features

- Product showcase carousel
- Contact form with message logging
- Dark theme design
- SQLite database for storing messages

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the server: `npm start`
4. Visit `http://localhost:3000` in your web browser

## Development

To run the server with auto-restart on file changes:

```
npm run dev
```

## Database

Messages are stored in a SQLite database (`messages.db`). To view the database contents, you can use a SQLite browser or the SQLite command-line tool.

## Deployment

When deploying, ensure that the server has write permissions for the directory where `messages.db` will be created.

## License

ISC