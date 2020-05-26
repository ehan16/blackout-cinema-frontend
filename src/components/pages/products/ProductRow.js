import React from 'react';
import {Link} from 'react-router-dom';

export default function ProductRow(props) {

    let item = props.item;
    let index = props.index;
    let items = [item.product1, item.product2, item.product3, item.product4, item.product1];

    return (
        <tr>
            { props.admin ? <th scope="row">{ item.id }</th> : null }
            <td className="text-capitalize">{ item.name_ }</td>
            { props.admin ? 
                <th className="text-capitalize">{ item.category === 'combo' ?  items : 'N/A' } </th> 
            : null }
            <td className="text-capitalize">{ item.category }</td>
            <td>{ item.price }</td>
            <td>
                <div className="btn-group btn-group-sm">
                    { !props.admin && !props.buy ? <button className="btn" style={ btnStyle } onClick={() => props.addToBuyList(item)}><i className="fa fa-plus"></i></button> : null}
                    { !props.admin && props.buy ? <button className="btn" style={ btnStyle }><i className="fa fa-trash" onClick={() => props.deleteInBuyList(index)}></i></button> : null}
                    { props.admin && !item.category === 'combo' ? <Link to={`/admin/products/${item.id}`}><button className="btn" style={ btnStyle }><i className="fa fa-pencil"></i></button></Link> : null}
                    { props.admin && item.category === 'combo' ? <Link to={`/admin/combos/${item.id}`}><button className="btn" style={ btnStyle }><i className="fa fa-pencil"></i></button></Link> : null}
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
