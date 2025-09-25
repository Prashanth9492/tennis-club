# College Tennis Championship Backend (MERN)

## Setup

1. Install dependencies:
   ```
npm install
   ```
2. Create a `.env` file (already provided) and set your MongoDB Atlas URI.
3. The backend is configured to use MongoDB Atlas cloud database.
4. Start the backend server:
   ```
npm run dev
   ```
   or
   ```
npm start
   ```

## API Endpoints

### Tournaments
- `GET /api/teams` - Get all tournaments
- `GET /api/teams/category/:category` - Get tournaments by category
- `POST /api/teams` - Create tournament (with logo upload)
- `PUT /api/teams/:id` - Update tournament
- `DELETE /api/teams/:id` - Delete tournament

### Players
- `GET /api/players` - Get all players (optional ?category filter)
- `GET /api/players/category/:category` - Get players by category
- `GET /api/players/:id` - Get player by ID
- `POST /api/players` - Create player (with photo upload)
- `PUT /api/players/:id` - Update player
- `DELETE /api/players/:id` - Delete player

### Matches
- `GET /api/matches` - Get all matches
- `GET /api/matches/live` - Get live matches
- `GET /api/matches/:matchId` - Get match by ID
- `POST /api/matches` - Create match
- `PUT /api/matches/:matchId` - Update match

### Rankings
- `GET /api/pointsTable` - Get rankings (optional ?season & ?category filters)
- `GET /api/pointsTable/seasons` - Get all seasons
- `GET /api/pointsTable/categories` - Get all categories
- `GET /api/pointsTable/player/:playerId` - Get player ranking history
- `POST /api/pointsTable` - Create/update ranking

### General
- `GET /api/news` - Get news
- `POST /api/news` - Create news (with image upload)
- `GET /api/gallery` - Get gallery images
- `POST /api/gallery` - Upload gallery images

Tennis Categories:
- Men_Singles
- Women_Singles
- Men_Doubles
- Women_Doubles
- Mixed_Doubles

Uploads are served from `/uploads`.

No authentication required. Designed for local development and integration with your React frontend.
