import Result from "./components/result.js"
import Login from "./components/login.js"
import Home from "./components/home.js"
import Information from "./components/information.js"
import NavBar from './components/navbar.js'
import HistoryResults from "./components/historyResults.js"
import Register from "./components/register.js"

import Footer from "./pages/footer.js"
import SurveyPage from "./pages/surveyPage.js"
import LoadingPage from "./pages/loadingPage.js";

import { AdminDashboard } from './pages';

import { react, useEffect, useState } from 'react';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

export const clientURL = `http://localhost:3000`;

const App = () => {
  sessionStorage.setItem('user', JSON.stringify({ "auth": true, "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6InN0dWRlbnQiLCJpYXQiOjE3NDczMDU3NTIsImV4cCI6MTc0NzM5MjE1Mn0.1oKjFXMWuYHATAjiYpydeZ7C4JzA_ArKBd8mRkcXbHA", "Status": "Success", "user_id": 1, "user_role": "student" }))

  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/survey" element={<SurveyPage />} />
          <Route path="/result" element={<Result />} />
          <Route path="/information" element={<Information />} />
          <Route path="/history" element={<HistoryResults />} />
        </Routes>
        <Footer className='app' />
      </BrowserRouter>
    </div>
  );
}

export default App;
