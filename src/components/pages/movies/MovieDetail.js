import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function MovieDetail(props) {

    const movieId = props.match.params.movieId;
    const movie = "";
    const branches = [];
    const functions = [];

    
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/movies/${movieId}/`)
        .then(res => {
            movie = res.data;
        })
        .catch(e => console.log(e))

        axios.get(`http://127.0.0.1:8000/api/branches/`)
        .then(res => {
            branches = res.data;
        })
        .catch(e => console.log(e))

        axios.get(`http://127.0.0.1:8000/api/functions/`)
        .then(res => {
            functions = res.data;
        })
        .catch(e => console.log(e))
    }, []);

    return (
        <div>
            <div className="row "> 
                <div className="col mx-sm-3 my-4 text-center">
                    <h1 className="bold">Título</h1>
                    <p>Descripcion</p>
                    <div className="d-inline-block">
                        <ul className="">
                            <li>Año</li>
                            <li>Genero</li>
                            <li>Duracion</li>
                            <li>Lenguaje</li>
                            <li>Subtitulos</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="row mx-sm-3 my-3">
                    <table className="table table-responsive-sm table-hover table-dark list text-center">
                        <thead>
                            <tr>
                                <th>id_funcion</th>
                                <th>sucursal</th>
                                <th>hora</th>
                                <th>puestos disponible</th>
                                <th>comprar</th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                </div>
        </div>
    )
}
