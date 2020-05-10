import React, { Component } from 'react'
import axios from 'axios'
import MovieItem from './MovieItem'

export class MovieList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movies: [
                {
                    title: 'Peter Rabbit',
                    year: 2018,
                    lots: 5,
                    id: 1,
                    genre: 'infantil',
                    duration: 90,
                    language: 'inglés',
                    subtitles: 'True',
                    on_air: 'True',
                    released: 'True'
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
        } else {
            axios.get(`http://127.0.0.1:8000/api/movies/${this.props.mode}/`).then(res => {
                this.setState({ ...this.state, movies: res.data });
            })
        }
    }

    render() {
        return (
            <div>
                <p>{ this.props.mode }</p>
                <p>{ this.props.mode }</p>
                <p>{ this.props.mode }</p>
                <p>{ this.props.mode }</p>
                <p>{ this.props.mode }</p>
                <p>{ this.props.mode }</p>
                <div className="container-fluid pt-5">
                    { 
                        this.state.movies.map( (movie) => (
                            <MovieItem movie={ movie } /> 
                        ))
                    }
                </div>
            </div>
        )
    }
    
}


export default MovieList;
