import React from "react";

const Dashboard = () => {
  const username = localStorage.getItem("username");
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Dashboard</h1>
      <p className="text-lg">Hello, {username || "User"}! You have successfully logged in.</p>
    </div>
  );
};

export default Dashboard;
