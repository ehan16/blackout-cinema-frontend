import React, { useState, useEffect } from "react";
import axios from 'axios';
import {Link} from 'react-router-dom';

export default function MovieDetail(props) {

    const movieId = props.match.params.movieId;
    const [movie, setMovie] = useState('');
    // const [branches, setBranches] = useState([]);
    const [functions, setFunctions] = useState([]);

    
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/movies/${movieId}/`)
            .then(res => {
                setMovie(res.data);
            })
            .catch(e => console.log(e))

    //    axios.get(`http://127.0.0.1:8000/api/branches/`)
    //     .then(res => {
    //        setBranches(res.data)
    //     })
    //     .catch(e => console.log(e))

        axios.get(`http://127.0.0.1:8000/api/functions/`)
            .then(res => {
                setFunctions(res.data);
                console.log(res.data)
            })
            .catch(e => console.log(e))
    }, []);

    const myli = {
        listStyle: 'none',
        display: 'inline',
        padding: '.8em',
        color: '#c7c7c7',
    }

    const aStyle = {
        textDecoration: 'none',
        color: '#d63636'
    }

    const lin = {
        backgroundColor: 'transparent',
        border: '2px solid',
        lineHeight: 'calc(2rem - 4px)',
        borderRadius: '.2rem',
        textDecoration: 'none',
        color: '#d63636',
        textTransform: 'uppercase'
    }

    return (
        <div className="container-fluid p-3">
            <div className="row"> 
                <div className="col-6 mx-sm-5 my-4">

                    <h1 className="pt-5" style={{ color: 'red', fontWeight: 'bolder'}}>Peaky Blinders</h1>
                    
                    <div className="d-inline-block py-3">
                        <li style={myli}>2017</li>
                        <li style={myli}>Drama, Crimen</li>
                        <li style={myli}>60 min</li>
                    </div>
                    

                    <p style={{fontSize: '1em'}}>La serie está ambientada en el mundo de los gangsters de los años 20, en Birmingham. Un joven a lomos de un hermoso corcel negro recorre las calles de Birmingham (Inglaterra). Estamos en 1919, la Gran Guerra ha terminado, pero aquel individuo posee el don de atemorizar a su paso a cualquier transeúnte. ¿Quién es? ¿Por qué les asusta tanto? Al parecer busca un hechizo, una pócima, que garantice la victoria de su caballo de carreras. Una mujer oriental proveerá al temido muchacho de una mágica especia que hará que el noble animal equino logre su fin.</p>
                    
                    <div className="d-inline-block">
                        <li style={myli}>Inglés</li>
                        <li style={myli}>Subtitulada</li>
                    </div>
                </div>

                <div className="col-4 d-flex align-items-end flex-row-reverse">
                    
                    <div>
                        <a href="#" style={aStyle} className="btn fa fa-twitter px-3" aria-hidden="true"></a>
                        <a href="#" style={aStyle} className="btn fa fa-facebook-square px-3" aria-hidden="true"></a>
                    </div>

                    <div className="align-self-center">
                        <Link to={`/admin/movie/${movieId}/add-function`}><button style={lin} className="btn lg p-3" >Agregar película</button></Link>
                    </div>
                </div>
                
            </div>

            <div className="row mx-sm-3 my-3">
                    <table className="table table-responsive-md table-hover table-dark list text-center">
                        <thead>
                            <tr className="bg-danger">
                                <th scope="col">ID</th>
                                <th scope="col">Sucursal</th>
                                <th scope="col">Hora</th>
                                <th scope="col">Puestos Disponible</th>
                                <th scope="col">Comprar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                functions.map(functionDetail => 
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Plaza Alfredo Sadel</td>
                                        <td>9 pm</td>
                                        <td>20</td>
                                        <td>COMPRAR</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
        </div>
    )

    
    
}
