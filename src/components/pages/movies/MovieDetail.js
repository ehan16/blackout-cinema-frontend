import React, { useState, useEffect } from "react";
import axios from 'axios';
import {Link} from 'react-router-dom';

export default function MovieDetail(props) {

    const movieId = props.match.params.movieId;
    const [movie, setMovie] = useState('');
    // const [branches, setBranches] = useState([]);
    const [movieFunctions, setMovieFunctions] = useState([]);

    
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/movies/${movieId}/`)
            .then(res => {
                setMovie(res.data);
            })
            .catch(e => console.log(e))

        axios.get(`http://127.0.0.1:8000/api/functions/`)
            .then(res => {
                setMovieFunctions(res.data);
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
        color: '#d63636',
    }

    const lin = {
        backgroundColor: 'transparent',
        border: '2px solid',
        lineHeight: 'calc(2rem - 4px)',
        borderRadius: '.2rem',
        textDecoration: 'none',
        color: '#d63636',
        textTransform: 'uppercase',
        width: 'fit-content',
        fontWeight: 'bolder'
    }

    const buyStyle = {
        color: 'red',
        fontSize: 'large'
    }

    return (
        <div className="container-fluid p-3">
            <div className="row px-5"> 
                <div className="col-md-6 mx-sm-5 my-4 p-3">

                    <h1 className="pt-5 text-capitalize" style={{ color: 'red', fontWeight: 'bolder'}}>{ movie.title }</h1>
                    
                    <div className="d-inline-block py-3">
                        <li style={myli}>{ movie.year }</li>
                        <li className="text-capitalize" style={myli}>{ movie.genre.genre }</li>
                        <li style={myli}>{ movie.duration } min</li>
                    </div>

                    <p style={{ fontSize: '1em' }}>{ movie.synopsys }</p>
                    
                    <div className="d-inline-block">
                        <li className="text-capitalize" style={myli}>{ movie.language_field.lang }</li>
                        <li style={myli}>{ movie.subtitle ? 'Subtitulada' : null }</li>
                    </div>

                </div>

                <div className="col-md-4 ml-2 d-flex align-items-end flex-row-reverse">
                    
                    <div className="text-center">
                        <a href="" style={aStyle} className="btn fa fa-twitter px-3 fa-icon" aria-hidden="true"></a>
                        <a href="" style={aStyle} className="btn fa fa-facebook-square px-3 fa-icon" aria-hidden="true"></a>
                    </div>

                    <div className="align-self-center">
                        <Link to={`/admin/movie/${movieId}/add-function`}><button style={lin} className="btn p-3" >Agregar función</button></Link>
                    </div>
                </div>
                
            </div>

            <div className="row mx-sm-3 my-3 p-4">
                    <table className="table table-responsive-sm table-hover table-dark list text-center">
                        <thead>
                            <tr className="bg-danger">
                                <th scope="col">ID</th>
                                <th scope="col">Sucursal</th>
                                <th scope="col">Estacionamiento</th>
                                <th scope="col">Fecha</th>
                                <th scope="col">Puestos</th>
                                <th scope="col">Comprar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                movieFunctions.map(functionDetail => 
                                    <tr>
                                        <th scope="row">1</th>
                                        {/* <td>{ functionDetail.branch.city } - { functionDetail.branch.place }</td> */}
                                        <td>{ functionDetail.date }</td>
                                        <td>{ functionDetail.parking_lot.parking_id }</td>
                                        <td>{ functionDetail.date }</td>
                                        <td>{ functionDetail.lot }</td>
                                        <td>
                                            <Link to={`/movie/${movieId}/${functionDetail.function_id}/products`}><button className="btn"><i style={ buyStyle } className="fa fa-credit-card "></i></button></Link>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
        </div>
    )

    
    
}
