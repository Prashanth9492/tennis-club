import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';

const TestAPI = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMatches = async () => {
    try {
      setLoading(true);
      console.log("Testing API fetch...");
      console.log("API URL:", `${import.meta.env.VITE_API_BASE_URL}/matches`);
      
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/matches`);
      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Fetched data:", data);
      setMatches(data);
      setError(null);
    } catch (err) {
      console.error("Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">API Test Page</h1>
      
      <div className="mb-4">
        <Button onClick={fetchMatches} disabled={loading}>
          {loading ? "Loading..." : "Fetch Matches"}
        </Button>
      </div>
      
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          Error: {error}
        </div>
      )}
      
      <div className="mb-4">
        <strong>Matches Count:</strong> {matches.length}
      </div>
      
      <div className="space-y-4">
        {matches.map((match, index) => (
          <div key={match._id || index} className="p-4 border rounded">
            <div><strong>Teams:</strong> {match.team1} vs {match.team2}</div>
            <div><strong>Date:</strong> {new Date(match.date).toLocaleDateString()}</div>
            <div><strong>Venue:</strong> {match.venue}</div>
            <div><strong>Status:</strong> {match.status}</div>
            <div><strong>Type:</strong> {match.type}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestAPI;
