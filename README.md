This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Running the Application

1. Install dependencies:

```bash
npm install
```

2. Create the environment file:

```bash
echo "NEXT_PUBLIC_API_BASE_URL=http://localhost:3001" > .env.local
```

3. Start the development server:

```bash
npm run dev
```

4. Open http://localhost:3000 in your browser

## Features Implemented

✅ **Core Requirements:**

- Display all products from GET /products
- Form to add new products via POST /products
- Delete products with DELETE /products/:id
- React Hooks for state management
- Form validation (required name, positive price)
- Tailwind CSS styling
- Error handling with proper status codes

✅ **Bonus Features:**

- Search/filter functionality
- Loading states
- Toast notifications
- Responsive design
- TypeScript for type safety

✅ **Best Practices:**

- Modular component structure
- Custom hooks for API logic
- Proper error handling
- Type definitions
- Clean, maintainable code

## API Integration Notes

The frontend assumes your backend API:

- Runs on `http://localhost:3001`
- Returns products with `{ id, name, price, description }` structure
- Uses standard HTTP status codes
- Returns JSON responses

Make sure your Nest.js backend is running before starting the frontend!
