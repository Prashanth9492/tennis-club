# Database Configuration - Cricket to Tennis Migration

## Overview
This project has been converted from a cricket management system to a tennis management system. The data is now stored separately from the original cricket data.

## Database Separation

### Tennis Database (Current/Active)
- **Database Name**: `college_tennis`
- **URI**: Uses `MONGODB_URI` environment variable
- **Collections**:
  - `players` - Tennis player information with tennis-specific stats
  - `tournaments` - Tennis tournament information (replaces cricket teams)
  - `matches` - Tennis match data with set/game scoring
  - `rankings` - Player rankings by category (replaces points table)
  - `pointbypoints` - Point-by-point match tracking (replaces ball-by-ball)
  - `livematches` - Real-time tennis match data
  - `news` - News and updates
  - `galleries` - Photo galleries

### Original Cricket Database (Preserved)
- **Database Name**: `cricket`
- **URI**: Uses `CRICKET_MONGODB_URI` environment variable (for reference)
- **Status**: Preserved but not actively used

## Tennis Categories
The system now supports these tennis categories:
- Men_Singles
- Women_Singles
- Men_Doubles
- Women_Doubles
- Mixed_Doubles

## Migration Steps Completed

1. **Environment Configuration**
   - Updated `.env` to use `college_tennis` database
   - Preserved original cricket database reference

2. **Data Models Updated**
   - Player model: Tennis-specific statistics and categories
   - Match model: Tennis scoring with sets, games, and points
   - Tournament model: Replaces teams with tournament management
   - Ranking model: Player rankings by category
   - PointByPoint model: Detailed point tracking

3. **API Endpoints Modified**
   - All routes now handle tennis-specific data
   - Category-based filtering for tournaments and players
   - Tennis-specific match scoring and statistics

## Seeding Tennis Data

To populate the tennis database with sample data:

```bash
cd backend
npm run seed-tennis
```

This will create sample tennis players, tournaments, and rankings in the `college_tennis` database.

## Data Structure Changes

### Players
- Cricket stats (runs, wickets, etc.) → Tennis stats (aces, winners, etc.)
- Team affiliation → Category-based classification
- Cricket-specific fields → Tennis playing style and physical attributes

### Matches
- Cricket scoring (overs, runs, wickets) → Tennis scoring (sets, games, points)
- Ball-by-ball tracking → Point-by-point tracking
- Cricket match types → Tennis match formats

### Teams → Tournaments
- Team management → Tournament organization
- House system → Category-based tournaments
- Team stats → Tournament statistics

### Points Table → Rankings
- Team standings → Individual player rankings
- Match points → Ranking points
- Season-based team performance → Category-based player rankings

## Benefits of Separate Database

1. **Data Integrity**: Original cricket data is preserved
2. **Clean Migration**: Fresh start with tennis-specific schema
3. **Performance**: Optimized for tennis use cases
4. **Maintenance**: Easier to manage tennis-specific queries
5. **Scalability**: Can run both systems if needed

## Future Considerations

- The original cricket database can be accessed if needed by changing the connection string
- Both systems can potentially run in parallel if required
- Easy rollback to cricket system if needed by reverting environment variables