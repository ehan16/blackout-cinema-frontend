import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import MovieItem from './MovieItem';
import Banner from '../../Banner';

export class MovieList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movies: [
                {
                    id: 1,
                    title: 'Peter Rabbit',
                    year: 2018,
                    genre: 'infantil',
                    duration: 90,
                    language_field: 'inglés',
                    subtitle: 'true',
                    synopsys: 'Asdasda',
                    date: 'no se',
                    state_now: 'estreno'
                },
                {
                    id: 2,
                    title: 'Peter Dog',
                    year: 2018,
                    genre: 'infantil',
                    duration: 90,
                    language_field: 'inglés',
                    subtitle: 'true',
                    synopsys: 'Asdasda',
                    date: 'no se',
                    state_now: 'cartelera'
                }
            ]
        };
    }

    componentDidMount() {
        this.getMovies();
    }
    
    getMovies = () => {
        // Se buscan las peliculas dependiendo de la modalidad
        // if (this.props.mode === '') {
        //     axios.get('http://127.0.0.1:8000/api/movies').then(res => {
        //         this.setState({ ...this.state, movies: res.data });
        //     })
        // } else { //Cambiar para que busque segun la tabla
        //     axios.get(`http://127.0.0.1:8000/api/movies/${this.props.mode}/`).then(res => {
        //         this.setState({ ...this.state, movies: res.data });
        //     })
        // }
        alert("HOLAAA");
    }

    render() {

        return (
            <div>
                <Banner name="Películas"/>
                <div className="container-fluid p-3">
                    {
                        this.props.mode === '' ?
                        <div className="text-center">
                            <Link to="/admin/add-movie/"><button className="btn-add" >Agregar película</button></Link>
                        </div>
                        : null
                    }
                    { 
                        this.state.movies.map( (movie,index) => (
                            <MovieItem key={movie.id} movie={ movie } mode={ this.props.mode } index={index} launchMovie={this.launchMovie} takeOutMovie={this.takeOutMovie} /> 
                        ))
                    }
                </div>
            </div>
        )

    }

    launchMovie = (movie, index) => {

        const data = {
            title: movie.title,
            year: movie.year,
            genre: movie.genre,
            duration: movie.duration,
            language_field: movie.language_field,
            subtitle: movie.subtitle,
            synopsys: movie.synopsys,
            date: movie.date,
            state_now: 'cartelera'
        };

        axios.put(`http://127.0.0.1:8000/api/movies/${movie.id}`, data)
        .then(this.getMovies());  // Se actualiza la informacion mostrada
        swal("Se ha estrenado la película", { dangerMode: true });

    }
    
    takeOutMovie = (movie, index) => {

        const data = {
            title: movie.title,
            year: movie.year,
            genre: movie.genre,
            duration: movie.duration,
            language_field: movie.language_field,
            subtitle: movie.subtitle,
            synopsys: movie.synopsys,
            date: movie.date,
            state_now: 'pasada'
        };

        axios.put(`http://127.0.0.1:8000/api/movies/${movie.id}`, data)
        .then(this.getMovies()); // Se actualiza la informacion mostrada
        swal("Se ha sacado la película del aire", { dangerMode: true });

    }
    
}

export default MovieList;
