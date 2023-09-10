import React from "react";
import Home from "./components/Home";
import Doc from "./components/Doc";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App(props) {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/doc" Component={Doc} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
