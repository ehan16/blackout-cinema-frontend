import React, { Component } from 'react';
import axios from 'axios';
import MovieItem from './MovieItem';
import Banner from '../../Banner';
import {Link} from 'react-router-dom';

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
                    language: 'inglés',
                    subtitles: 'true',
                    synopsys: 'Asdasda',
                    date: 'no se',
                    mode: 'estreno'
                }
            ]
        };
    }

    componentDidMount() {
        // if (this.props.mode === '') {
        //     axios.get('/movieshttp://127.0.0.1:8000/api/').then(res => {
        //         this.setState({ ...this.state, movies: res.data });
        //     })
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
                        this.state.movies.map( (movie) => (
                            <MovieItem key={movie.id} movie={ movie } mode={ this.props.mode } /> 
                        ))
                    }
                </div>
            </div>
        )
    }
    
}

export default MovieList;
