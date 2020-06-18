import React, { useState, useEffect } from "react";
import axios from 'axios';
import Banner from '../../Banner';
import swal from "sweetalert";

const LangGenre = (props) => {

    const [language, setLanguage] = useState("");
    const [genre, setGenre] = useState("");

    const handleChange = (e) => {
        e.preventDefault();
        const {name, value} = e.currentTarget;
        switch (name) {
            case 'language':
                setLanguage(value)
                break;
            case 'genre':
                setGenre(value)
                break;
        }
    }

    const handleSubmitGenre = (e) => {
        e.preventDefalut();
        if(genre === ""){
            swal("ERROR", "Existen campos invalidos", "error", { dangerMode: true });
        }
    }

    const hanldeSubmitLang = (e) => {
        e.preventDefault();
        if(language === ""){
            swal("ERROR", "Existen campos inválidos", "error", { dangerMode: true });
        }
    }

    return(
        <div>
            <Banner name='Lenguajes y Generos'/>
            <div className="row mx-2 px-sm-3 pb-3 pt-2 " >

                <div className='col-md-4 my-3 py-4 text-center card-style rounded'>
                    <h4 className="mt-2" style={{ color: 'red', fontWeight: 'bold'}}>Agregar Generos:</h4>
                    <input className="form-field mb-2" style={{width:'auto'}}></input>
                    <span><button className="ml-2" style={{width: 'auto', borderRadius: '30px'}}><i class="fa fa-plus-circle"></i></button></span>
                    <h4 className="mt-2" style={{ color: 'red', fontWeight: 'bold'}}>Agregar Lenguajes:</h4>
                    <input className="form-field" style={{width:'auto'}}></input>
                    <span><button className="ml-2" style={{width: 'auto', borderRadius: '30px'}}><i class="fa fa-plus-circle"></i></button></span>
                </div>

                <div className="col-md-4 my-3 py-4 text-center">
                    <table className="table table-striped table-hover table-dark">
                        <thead>
                            <tr className="bg-danger">
                                <th scope="col">Genero</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr key="">
                                <td>here</td>
                            </tr>
                            <tr key="">
                                <td>here</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="col-md-4 my-3 py-4 text-center">
                    <table className="table table-striped table-hover table-dark">
                            <thead>
                                <tr className="bg-danger">
                                    <th scope="col">Lenguajes</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr key="">
                                    <td>here</td>
                                </tr>
                                <tr key="">
                                    <td>here</td>
                                </tr>
                            </tbody>
                        </table>
                </div>
            </div>
        </div>
    )
    

}

export default LangGenre;
