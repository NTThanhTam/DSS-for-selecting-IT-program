import Result from "./components/result.js"
import Login from "./components/login.js"
import Home from "./components/home.js"
import Information from "./components/information.js"
import NavBar from './components/navbar.js'
import HistoryResults from "./components/historyResults.js"
import Register from "./components/register.js"


import SurveyPage from "./pages/surveyPage.js"

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
        <NavBar />
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/survey" element={<SurveyPage/>}/>
            <Route path="/result" element={<Result/>}/>
            <Route path="/information" element={<Information/>}/>
            <Route path="/history" element={<HistoryResults/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
