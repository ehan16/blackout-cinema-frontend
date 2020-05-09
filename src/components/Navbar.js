import React from "react";
import {Link} from 'react-router-dom';

class Navbar extends React.Component {

    render() {
        return (
        
            <nav className="navbar navbar-expand-lg navbar-dark fixed-top py-1" style={{ background: '#111' }}>
                <h1 className="navbar-brand" style={{ color: 'red', fontWeight: 'bolder'}}>Blackout cinema</h1>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav ml-4">
                        <Link to='/' class="nav-item nav-link" >Inicio</Link>
                        <Link to='/movies' class="nav-item nav-link">Películas</Link> 
                    </div>
                </div>
            </nav>

        );
    }

}

// '#280547' dark purple
// '#470505' dark red

export default Navbar;