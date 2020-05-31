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
                // {
                //     movie_id: 1,
                //     title: 'Peter Rabbit',
                //     year: 2018,
                //     genre: 'infantil',
                //     duration: 90,
                //     language_field: 'inglés',
                //     subtitle: 'true',
                //     synopsys: 'Asdasda',
                //     date: 'no se',
                //     state_now: 'estreno'
                // },
                // {
                //     movie_id: 2,
                //     title: 'Peter Dog',
                //     year: 2018,
                //     genre: 'infantil',
                //     duration: 90,
                //     language_field: 'inglés',
                //     subtitle: 'true',
                //     synopsys: 'Asdasda',
                //     date: 'no se',
                //     state_now: 'cartelera'
                // }
            ]
        };
    }

    componentDidMount() {
        this.getMovies();
    }
    
    getMovies = () => {
        // Se buscan las peliculas dependiendo de la modalidad
        // if (this.props.mode === '') {
            axios.get('http://127.0.0.1:8000/api/movies').then(res => {
                this.setState({ ...this.state, movies: res.data });
            })
        // } else { //Cambiar para que busque segun la tabla
        //     axios.get(`http://127.0.0.1:8000/api/movies/${this.props.mode}/`).then(res => {
        //         this.setState({ ...this.state, movies: res.data });
        //     })
        // }
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
                            <MovieItem key={movie.movie_id} movie={ movie } mode={ this.props.mode } index={index} launchMovie={this.launchMovie} takeOutMovie={this.takeOutMovie} /> 
                        ))
                    }
                </div>
            </div>
        )

    }

    launchMovie = (movie) => {

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

        swal({
            title: "Confimación",
            text: "Una vez que lo estreno, no podrá cambiarlo. ¿Seguro?",
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then((willDelete) => {
            if(willDelete) {
                axios.put(`http://127.0.0.1:8000/api/movies/${movie.movie_id}`, data)
                .then(this.getMovies()); // Se actualiza la informacion mostrada
                swal("Exitoso", "¡Se ha estrenado la película!", "info", { dangerMode: true });
            } else {
                swal("No ha ocurrido nada", { dangerMode: true });
            }
        })

    }
    
    takeOutMovie = (movie) => {

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

        swal({
            title: "Confimación",
            text: "Una vez que lo elimine, no podrá recuperarlo. ¿Seguro?",
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then((willDelete) => {
            if(willDelete) {
                axios.put(`http://127.0.0.1:8000/api/movies/${movie.movie_id}`, data)
                .then(this.getMovies()); // Se actualiza la informacion mostrada
                swal("Exitoso", "¡Se ha sacado la película del aire!", "info", { dangerMode: true });
            } else {
                swal("No ha ocurrido nada", { dangerMode: true });
            }
        })
    }
    
}

export default MovieList;
