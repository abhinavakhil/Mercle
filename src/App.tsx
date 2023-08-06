import React from "react";
import EngagementMessagesOverTime from "./components/engagementMessagesOverTime";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <div className="container">
        <h1>Mercle React Assignment</h1>

        <div className="wrapper">
          <EngagementMessagesOverTime />
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
