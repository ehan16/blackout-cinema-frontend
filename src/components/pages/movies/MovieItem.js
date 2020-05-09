import React from 'react'
import cinema from '../../../assets/cinema.jpeg'

function MovieItem(props) {
    return (
        <div style={ containerStyle }>
            <img src={ cinema } style={{ width: '85%' , borderRadius: '10px'}} />
            <div style={ infoStyle }>
                <h2>No te lo pierdas</h2>
            </div>
        </div>
    )
}

const containerStyle = {
    position: 'relative',
    textAlign: 'center',
    margin: '10px'
}

const infoStyle = {
    position: 'absolute',
    top: '20px',
    left: '15%'
}

export default MovieItem;
