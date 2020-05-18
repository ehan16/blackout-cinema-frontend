import React from 'react';
import './App.css';
import {Switch, BrowserRouter as Router, Route} from 'react-router-dom';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './components/pages/Home'
import MovieList from './components/pages/movies/MovieList';
import BranchList from './components/pages/branches/BranchList';
import ProductsList from './components/pages/products/ProductsList';
import ClientForm from './components/pages/orders/ClientForm';
import MovieForm from './components/pages/movies/MovieForm';

function App() {
  return (
    
    <div className=""> 
      <Router>

        <Navbar className="d-block"/>

        <div style={{ minHeight: '100vh', marginTop: '7vh' }}>

          <Switch>
            <Route path='/' exact={true} component={Home}/>
            <Route path='/admin/movies' render={(props) => <MovieList {...props} mode='' />} />
            <Route path='/movies/on-air' render={(props) => <MovieList {...props} mode='on-air' />} />
            <Route path='/movies/to-release' render={(props) => <MovieList {...props} mode='to-release' />} />
            <Route path='/branches' component={BranchList} />} />
            <Route path='/products' component={ProductsList} />} />
            <Route path='/admin/branches' render={(props) => <BranchList {...props} admin='True' />} />
            <Route path='/admin/products' render={(props) => <ProductsList {...props} admin='True' />} />
            <Route path='/admin/add-movie' component={MovieForm} />
          </Switch>

          <ClientForm/>

        </div>

        <Footer className="d-block"/>

      </Router> 
    </div>
  );
}

export default App;
