import React from 'react'

export default function ProductRow(props) {

    let item = props.item;
    let index = props.index;

    return (
        <tr>
            { props.admin ? <th scope="row">1</th> : null }
            <td>Hola</td>
            <td>Hola</td>
            <td>Hola</td>
            <td>
                <div className="btn-group btn-group-sm">
                    { !props.admin && !props.buy ? <button className="btn" style={ btnStyle } onClick={() => props.addToBuyList(item)}><i className="fa fa-plus"></i></button> : null}
                    { !props.admin && props.buy ? <button className="btn" style={ btnStyle }><i className="fa fa-trash" onClick={() => props.deleteInBuyList(index)}></i></button> : null}
                    { props.admin ? <button className="btn" style={ btnStyle }><i className="fa fa-pencil"></i></button> : null}
                    { props.admin ? <button className="btn" style={ btnStyle }><i className="fa fa-trash"></i></button> : null}
                </div>
            </td>
        </tr>
    )
 
}


const btnStyle = {
    background: '#292929',
    color: 'red'
}
