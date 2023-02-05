import React from 'react';
import AppHeader from "../header/AppHeader";
import AppMain from '../main/AppMain';
import data from "../../utils/data";

function App() {
  return (
    <div className="App">
      <AppHeader/>
      <AppMain data={data}/>
    </div>
  );
}

export default App;
