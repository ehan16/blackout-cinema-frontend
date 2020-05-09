import React, { Component } from 'react'
import axios from 'axios'
import MovieItem from './MovieItem'

export class MovieList extends Component {

    render() {
        return (
            <div>
                <div className="container-fluid pt-5">
                    <MovieItem movie={ this.movie } />
                </div>
            </div>
        )
    }
    
    movie = {
        title: 'Peter Rabbit',
        year: '2018',
        lots: '0',
        id: '1',
        genre: 'infantil',
        duration: '90 min',
        language: 'inglés',
        subtitles: 'true',
        on_air: 'true'
    }
}


export default MovieList;
