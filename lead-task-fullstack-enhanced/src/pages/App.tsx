import React from "react";
import LeadPage from "./LeadPage";
import { LeadsProvider } from "../context/LeadsContext";

const App = () => {
  return (
    <LeadsProvider>
    <div className="">
      <LeadPage />
    </div>
  </LeadsProvider>
  );
};

export default App;