# BalDr - Hair Loss Support Platform

BalDr is a comprehensive hair loss support platform that combines community engagement, personalized guidance, and expert resources to help individuals navigate their hair loss journey.

## Features

- **Community Forum**: Share experiences, ask questions, and connect with others
- **Personalized Hair Analysis**: AI-powered analysis of your hair condition
- **Product Recommendations**: Curated suggestions based on your specific needs
- **Progress Tracking**: Document and monitor your hair growth journey
- **Expert Resources**: Access to professional advice and treatment guides

## Tech Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, TypeScript
- **Database**: MongoDB
- **Authentication**: JWT
- **UI Components**: Shadcn/ui

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm
- MongoDB

### Installation

1. Clone the repository:
```bash
git clone [your-repo-url]
cd baldr-app
```

2. Install dependencies:
```bash
# Install frontend dependencies
pnpm install

# Install backend dependencies
cd backend
pnpm install
```

3. Set up environment variables:
Create `.env` files in both root and backend directories with necessary configurations.

4. Start the development servers:
```bash
# Start frontend (from root directory)
pnpm dev

# Start backend (from backend directory)
pnpm dev
```

The frontend will be available at `http://localhost:3002`
The backend will be available at `http://localhost:3001`

## Project Structure

```
baldr-app/
├── app/                # Next.js pages and routes
├── components/         # React components
├── public/            # Static assets
├── styles/            # Global styles
├── backend/           # Express backend server
│   ├── src/
│   │   ├── routes/   # API routes
│   │   ├── models/   # MongoDB models
│   │   └── index.ts  # Server entry point
└── types/            # TypeScript type definitions
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 