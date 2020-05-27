import React, { useState, useEffect } from "react";
import axios from 'axios';
import {Link, useHistory} from 'react-router-dom';
import swal from 'sweetalert';

const FunctionForm = (props) => {

    const curr = new Date();
    curr.setDate(curr.getDate() - 1);
    const today = curr.toISOString().substr(0,10);
    const [lot, setLot] = useState(50);
    const [date, setDate] = useState(today);
    const [branch, setBranch] = useState("");
    const movieId = props.match.movieId;
    let branches = [];
    const history = useHistory();

    const handleChange = (e) => {
        e.preventDefault();
        const {name, value} = e.currentTarget;
        switch (name) {
            case 'branch':
                setBranch(value)
                break;
            case 'lot':
                setLot(value)
                break;
            case 'date':
                setDate(value)
                break;
        }
    }

    const handleSubmit = (e) => {

        e.preventDefault();
        if (branch === "") {

            // Se valida que ningun campo este vacio
            swal("ERROR", "Existen campos inválidos", "error", { dangerMode: true });

        } else {
            
            const data = {
                lot: lot,
                movie_id: movieId,
                branch: branch,
                date: date
            }
    
            if (props.edit) {
                const functionId = props.match.params.functionId; // Se identifica el id de la pelicula a editar
                axios.put(`http://127.0.0.1:8000/api/functions/${functionId}/`, data);
                console.log(data, 'Modo edicion');
            } else {
                axios.post('http://127.0.0.1:8000/api/functions/', data);
                console.log(data);
            }
            
            history.push('/admin/movies');

        }
    }

    const getFunction = async() => {
        const functionId = props.match.params.functionId; // Se identifica el id de la pelicula a editar
        await axios.get(`http://127.0.0.1:8000/api/functions/${functionId}/`)
        .then(res => {
            setLot(res.data.lot);
        })
        .catch(err => console.log(err));
    }

    useEffect(() => {
        branches = axios.get('http://127.0.0.1:8000/api/branches/').then(res => {
            res.data.map(branch => <option value={branch.id} className="text-capitalize">{branch.zone} - {branch.place}</option>);
        });
    }, [])

    return (
        <div>
            <div className="title-style">
                { props.edit ? <h1>Editar función</h1> : <h1>Agregar función</h1> }
            </div>
            <form method="post">
                <div className="form-group">
                    <label htmlFor="lot">Puestos</label>
                    <input type="number" className="form-field" value={lot} name="lot" id="lot" disabled={true} onChange={(e) => handleChange(e)}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="branch">Sucursal</label>
                    <select value={branch} name="branch" id="branch" className="form-field" onChange={(e) => handleChange(e)}>
                        <option value="">Ninguno</option>
                        { branches }
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="date">Fecha</label>
                    <input type="date" className="form-field" value={date} name="date" id="date" onChange={(e) => handleChange(e)}></input>
                </div>
                <div className="btn-group">
                    <Link to="/admin/movies"><button type="button" className="btn-form">Cancelar</button></Link>
                    <button type="submit" className="btn-form btn-submit" onClick={ handleSubmit }>Aceptar</button>
                </div>
            </form>
        </div>
    )

}

export default FunctionForm;
