# HousesCricket Backend (MERN)

## Setup

1. Install dependencies:
   ```
npm install
   ```
2. Create a `.env` file (already provided) and set your MongoDB URI if needed.
3. Start MongoDB locally (default URI is `mongodb://localhost:27017/housescricket`).
4. Start the backend server:
   ```
npm run dev
   ```
   or
   ```
npm start
   ```

## API Endpoints

- `POST /api/teams` (with logo upload)
- `POST /api/players` (with photo upload)
- `POST /api/matches`
- `POST /api/news` (with image upload)
- `POST /api/gallery` (with multiple images upload)
- `GET /api/teams`, `/api/players`, `/api/matches`, `/api/news`, `/api/gallery`

Uploads are served from `/uploads`.

No authentication required. Designed for local development and integration with your React frontend.
