import React from 'react';
import './App.css';
import {Switch, BrowserRouter as Router, Route} from 'react-router-dom';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './components/Home'

function App() {
  return (
    
    <div className="container-fluid"> 
      <Router>

      <div className="row">
        <div className="col">
          <Navbar />
        </div>
      </div>

      <div className="section">
          
          <Home />
          <p>asdas</p>

          <Switch>
            {/* <Route path='/' exact={true} component={Home}/> */}
            {/* <Route component={CiudadForm} path='/create/ciudad'/> */}
          </Switch>

      </div>

      <div className="row">
        <div className="col p-0">
          <Footer />
        </div>
      </div>

      </Router> 
    </div>
  );
}

export default App;
