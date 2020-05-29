import React from 'react';
import {Link} from 'react-router-dom';

export default function ProductRow(props) {

    const item = props.item;
    const index = props.index;
    const items = [item.product_1, item.product_2, item.product_3, item.product_4, item.product_1];

    return (
        <tr>
            { props.admin ? <th scope="row">{ item.id }</th> : null }
            <td className="text-capitalize">{ item.name }</td>
            { props.admin ? 
                <th className="text-capitalize">{ item.category === 'combo' ?  items : 'N/A' } </th> 
            : null }
            <td className="text-capitalize">{ item.category }</td>
            <td>{ item.price }</td>
            <td>
                <div className="btn-group btn-group-sm">
                    { !props.admin && !props.buy ? <button className="btn" style={ btnStyle } onClick={() => props.addToBuyList(item)} disabled={item.availability === 0}><i className="fa fa-plus"></i></button> : null}
                    { !props.admin && props.buy ? <button className="btn" style={ btnStyle }><i className="fa fa-trash" onClick={() => props.deleteInBuyList(index)}></i></button> : null}
                    { props.admin && !item.category === 'combo' ? <Link to={`/admin/products/${item.id}`}><button className="btn" style={ btnStyle }><i className="fa fa-pencil"></i></button></Link> : null}
                    { props.admin && item.category === 'combo' ? <Link to={`/admin/combos/${item.id}`}><button className="btn" style={ btnStyle }><i className="fa fa-pencil"></i></button></Link> : null}
                </div>
            </td>
        </tr>
    )
 
}

const btnStyle = {
    background: '#292929',
    color: 'red',
    width: 'auto'
}
