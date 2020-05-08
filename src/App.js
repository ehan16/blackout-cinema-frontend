import React from 'react';
import './App.css';
import {Switch, BrowserRouter as Router, Route} from 'react-router-dom';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './components/pages/Home'

function App() {
  return (
    
    <div className=""> 
      <Router>

        <Navbar className="d-block"/>

        <div style={{ minHeight: '100vh', marginTop: '7vh' }}>

          <Switch>
            * <Route path='/' exact={true} component={Home}/>
            {/* <Route component={CiudadForm} path='/create/ciudad'/> */}
          </Switch>

        </div>

        <Footer className="d-block"/>

      </Router> 
    </div>
  );
}

export default App;
