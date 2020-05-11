import React, { Component } from 'react'
import axios from 'axios'
import MovieItem from './MovieItem'
import Banner from '../../Banner'

export class MovieList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movies: [
                {
                    id: 1,
                    title: 'Peter Rabbit',
                    year: 2018,
                    lots: 5,
                    genre: 'infantil',
                    duration: 90,
                    language: 'inglés',
                    subtitles: 'True'
                }
            ]
        };
    }

    componentDidMount() {
        if (this.props.mode === '') {
            axios.get('http://127.0.0.1:8000/api/movies/').then(res => {
                const movies = res.data;
                this.setState({ movies });
            })
        } else { //Cambiar para que busque segun la tabla
            axios.get(`http://127.0.0.1:8000/api/movies/${this.props.mode}/`).then(res => {
                this.setState({ ...this.state, movies: res.data });
            })
        }
    }

    render() {
        return (
            <div>
                <Banner name="Películas"/>
                <p>{ this.props.mode }</p>
                <div className="container-fluid p-3">
                    { 
                        this.state.movies.map( (movie) => (
                            <MovieItem movie={ movie } mode={ this.props.mode } /> 
                        ))
                    }
                </div>
            </div>
        )
    }
    
}


export default MovieList;
