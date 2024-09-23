# RESTful API Sample

This is a sample RESTful API built with the [Google Books API](https://developers.google.com/books), using modern web technologies including React, TypeScript, Next.js, Shadcn, and Tailwind CSS.

## Features

- Fetches books from the Google Books API based on user queries.
- Supports search by:
  - General query
  - Book title
  - Author name
- Displays search results in a tabular format with sortable columns.
- Utilizes a clean and modern UI with Tailwind CSS.
- Handles API errors gracefully and provides meaningful error messages.

## Tech Stack

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript.
- **Next.js**: A React framework for building server-side rendered and statically generated web applications.
- **Shadcn**: A design system using components with headless UI logic.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **Google Books API**: A public API for searching books.

## Setup

### Prerequisites

- Node.js (version 16.x or higher)
- NPM or Yarn package manager
- Google Books API key (You can obtain it from [Google Cloud Console](https://console.cloud.google.com/))

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/restful-api-sample.git
```

2. Navigate to the project directory:

```bash
cd restful-api-sample
```

3. Install the dependencies:

```bash
npm install
```

4. Set up your environment variables:
   Create a .env.local file in the root of your project and add your Google Books API key:

```bash
GOOGLE_BOOKS_API_KEY=your_google_books_api_key
```

### Running the Application

To run the development server, use the following command:

```bash
npm run dev
```
