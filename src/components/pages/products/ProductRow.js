import React from 'react';
import {Link} from 'react-router-dom';

export default function ProductRow(props) {

    const item = props.item;
    const index = props.index;
    const items = <p style={{ fontSize: '0.8rem' }}>{item.product_1}, {item.product_2}, {item.product_3}, {item.product_4}, {item.product_5}</p>;

    return (
        <tr>
            { props.admin ? <th scope="row">{ !props.combo ? item.product_id : item.combo_id }</th> : null }
            <td className="text-capitalize">{ item.name }</td>
            { props.admin && props.combo ? <th className="text-capitalize">{ items }</th> : null }
            <td className="text-capitalize">{ item.category !== undefined ? item.category : 'Combo' }</td>
            <td>{ item.price }</td>
            { !props.buy 
                ? <th>{ !props.combo ? item.availability : item.enable ? <i className="fa fa-check"></i> : <i className="fa fa-times"></i> }</th> 
                : null
            }
            <td>
                { !props.admin ?
                    <div className="btn-group btn-group-sm">
                        { props.buy 
                            ? <button className="btn" style={ btnStyle }><i className="fa fa-trash" onClick={() => props.deleteProduct(index)}></i></button> 
                            : <button className="btn" style={ btnStyle } onClick={() => props.addProduct(item)} disabled={item.availability === 0 || !item.enable}><i className="fa fa-plus"></i></button>
                        }
                    </div>  
                : null}
                { props.admin ?
                    <div className="btn-group btn-group-sm">
                        { props.combo 
                            ? <Link to={`/admin/combos/${item.combo_id}`}><button className="btn" style={ btnStyle }><i className="fa fa-pencil"></i></button></Link> 
                            : <Link to={`/admin/products/${item.product_id}`}><button className="btn" style={ btnStyle }><i className="fa fa-pencil"></i></button></Link>
                        }
                        <button className="btn" style={ btnStyle }><i className="fa fa-trash"></i></button>
                    </div>  
                : null}
            </td>
        </tr>
    ) 
 
}

// typeof car.color === 'undefined'

const btnStyle = {
    background: '#292929',
    color: 'red',
    width: '40px'
}
