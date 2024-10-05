import Survey from "./components/survey.js"
import Result from "./components/result.js"
import Login from "./components/login.js"
import Home from "./components/home.js"

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

export const clientURL = `http://localhost:3000`;

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/home" element={<Home />} />
            <Route path="/survey" element={<Survey/>}/>
            <Route path="/result" element={<Result/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
