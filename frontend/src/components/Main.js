import React from "react";
import Header from "./Header";
import GenrePanel from "./GenrePanel";
import Dashboard from "./Dashboard";

export default function Main() {
  return (
    <div className="container">
      <Header>
        <GenrePanel />
      </Header>
      <Dashboard />
    </div>
  );
}
