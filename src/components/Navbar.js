import React from "react";
import {Link} from 'react-router-dom';

class Navbar extends React.Component {

    render() {
        return (
        
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <a className="navbar-brand">Blackout cinema</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        {/* <Link to='/' class="nav-item nav-link active" >Inicio <span class="sr-only">(current)</span></Link> */}
                        {/* <Link to='/view/clientes' class="nav-item nav-link">Clientes</Link>  */}
                    </div>
                </div>
            </nav>

        );
    }

}

export default Navbar;