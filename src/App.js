import React from 'react';
import './App.css';
import {Switch, BrowserRouter as Router, Route} from 'react-router-dom';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './components/pages/Home'
import MovieList from './components/pages/movies/MovieList';
import BranchList from './components/pages/branches/BranchList';
import ProductsList from './components/pages/products/ProductsList';
import MovieDetail from './components/pages/movies/MovieDetail';
import MovieForm from './components/pages/movies/MovieForm';
import ProductForm from './components/pages/products/ProductForm';
import BranchForm from './components/pages/branches/BranchForm';
import FunctionForm from './components/pages/movies/FunctionForm';
import OrdersList from './components/pages/orders/OrdersList';
import ClientsList from './components/pages/orders/ClientsList';

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
            <Route path='/movie/:movieId/' exact={true} component={MovieDetail} />} />
            <Route path='/movie/:movieId/:branchId/:functionId/products' component={ProductsList} />} />
            <Route path='/branches' component={BranchList} />} />
            {/* Rutas del admin */}
            <Route path='/admin/movies' exact={true} render={(props) => <MovieList {...props} mode='' />} />
            <Route path='/admin/add-movie' component={MovieForm} />
            <Route path='/admin/movies/:movieId' render={(props) => <MovieForm {...props} edit={true} />} />
            <Route path='/admin/movie/:movieId/add-function' render={(props) => <FunctionForm {...props} />} />
            <Route path='/admin/movie/:movieId/functions' render={(props) => <MovieDetail {...props} admin={true} />} />
            <Route path='/admin/branches' exact={true} render={(props) => <BranchList {...props} admin={true} />} />
            <Route path='/admin/add-branch' component={BranchForm} />
            <Route path='/admin/branches/:branchId' render={(props) => <BranchForm {...props} edit={true} />} />
            <Route path='/admin/products' exact={true} render={(props) => <ProductsList {...props} admin={true} />} />
            <Route path='/admin/add-product' component={ProductForm} />
            <Route path='/admin/products/:productId' render={(props) => <ProductForm {...props} edit={true} />} />
            <Route path='/admin/combos/:productId' render={(props) => <ProductForm {...props} edit={true} combo={true} />} />
            <Route path='/admin/orders' component={OrdersList} />
            <Route path='/admin/clients' component={ClientsList} />
            <Route path='/admin/statistics' component={ClientsList} />
          </Switch>

        </div>

        <Footer className="d-block"/>

      </Router> 
    </div>
  );
}

export default App;
