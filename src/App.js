import Navbar from "./components/Navbar";
import News from "./components/News";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
// import About from "../../app-here/src/components/About";
import LoadingBar from 'react-top-loading-bar';

const App = () =>  {
  const pageSize = 10;
  const apiKey = process.env.REACT_APP_NEWS_API; 
  const[progress, setProgress] = useState(0);


    return (
      <Router>
        <>
          <div>
          <LoadingBar
          color='#f11946'
          progress={progress}
          />
            <Navbar />
            <div className="container my-3">
              <Routes>
                <Route exact path="/" element={<News setProgress={setProgress} apiKey={apiKey} key="gen_home" pageSize={10} country="in" category="general"/>} />
                <Route exact path="/business" element={<News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={10} country="in" category="business"/>} />
                <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={10} country="in" category="entertainment"/>} />
                <Route exact path="/general" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country="in" category="general"/>} />
                <Route exact path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={pageSize} country="in" category="health"/>} />
                <Route exact path="/science" element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={pageSize} country="in" category="science"/>} />
                <Route exact path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={pageSize} country="in" category="sports"/>} />
                <Route exact path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={pageSize} country="in" category="technology"/>} />
              </Routes>
            </div>
          </div>
        </>
      </Router>
      // style={{color: "white",backgroundColor: "#042743"}}
    );
}

export default App;
