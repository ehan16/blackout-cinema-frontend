import React from 'react';
import './App.css';
import {Switch, BrowserRouter as Router, Route} from 'react-router-dom';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './components/pages/Home'
import MovieList from './components/pages/movies/MovieList';
import BranchList from './components/pages/branches/BranchList';
import ProductsList from './components/pages/products/ProductsList';
import MovieForm from './components/pages/movies/MovieForm';
import ProductForm from './components/pages/products/ProductForm';
import BranchForm from './components/pages/branches/BranchForm';

function App() {
  return (
    
    <div className=""> 
      <Router>

        <Navbar className="d-block"/>

        <div style={{ minHeight: '100vh', marginTop: '7vh' }}>

          <Switch>
            <Route path='/' exact={true} component={Home}/>
            {/* Rutas del cliente */}
            <Route path='/movies/on-air' render={(props) => <MovieList {...props} mode='on-air' />} />
            <Route path='/movies/to-release' render={(props) => <MovieList {...props} mode='to-release' />} />
            <Route path='/movie/:movieId/:branchId/:functionId/products' component={ProductsList} />} />
            <Route path='/branches' component={BranchList} />} />
            {/* Rutas del admin */}
            <Route path='/admin/movies' render={(props) => <MovieList {...props} mode='' />} />
            <Route path='/admin/add-movie' component={MovieForm} />
            <Route path='/admin/movies/:movieId' render={(props) => <MovieForm {...props} edit={true} />} />
            <Route path='/admin/branches' render={(props) => <BranchList {...props} admin={true} />} />
            <Route path='/admin/add-branch' component={BranchForm} />
            <Route path='/admin/branches/:branchId' render={(props) => <BranchForm {...props} edit={true} />} />
            <Route path='/admin/products' render={(props) => <ProductsList {...props} admin={true} />} />
            <Route path='/admin/add-product' component={ProductForm} />
            <Route path='/admin/products/:productId' render={(props) => <ProductForm {...props} edit={true} />} />
            <Route path='/admin/combos/:productId' render={(props) => <ProductForm {...props} edit={true} combo={true} />} />
          </Switch>

        </div>

        <Footer className="d-block"/>

      </Router> 
    </div>
  );
}

export default App;
