import React from 'react'

function ClientForm(props) {
    return (
        <div>
            <form>
                <div className="form-group">
                    <label>Placa del carro</label>
                    <input type="text" className="form-field"></input>
                </div>
                <div className="form-group">
                    <label>Correo electrónico</label>
                    <input type="email" className="form-field"></input>
                </div>
                <div className="form-group">
                    <label>Número de teléfono</label>
                    <input type="number" className="form-field"></input>
                </div>
                <div className="form-group">
                    <label>Tipo de vehículo</label>
                    <select name="carType" className="form-field">
                        <option value="small">Hola</option>
                        <option value="big">Chao</option>
                    </select>
                </div>
            </form>
        </div>
    )
}

export default ClientForm;