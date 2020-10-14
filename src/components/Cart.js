import React, { useState } from 'react'
import formatCurrency from '../Util';
import Form from './Form';

// import { Fragment } from 'react';

function Cart(props) {
    const {cartItems} = props;

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [showCheckout, setShowCheckout] = useState(false);

    const handleInput = (e) => {
        setEmail({[e.target.email]: e.target.value});
        setName({[e.target.name]: e.target.value});
        setAddress({[e.target.address]: e.target.value});
    }

    const createOrder =(e) => {
       e.preventDefault();
       const order = {
           email: {email},
           name: {name},
           address: {address},
           cartItems: {cartItems}
        }
        props.createOrder(order)
    }
    return (
            <div>
                {cartItems.length === 0? <div className="cart cart-header">Cart is empty</div>
                :
                <div className="cart cart-header">You have {cartItems.length} in the cart</div>
                }

                <div>
                    <div className="cart">
                        <ul className='cart-items'>
                            {cartItems.map(item => (
                                <li key={item._id}>
                                    <div>
                                        <img src={item.image} alt={cartItems.title}/>
                                    </div>
                                    <div>
                                        <div>{item.title}</div>
                                        <div className="right">
                                            {formatCurrency(item.price)} X {item.count} {" "}
                                        <button className='button' onClick={() => props.removeFromCart(item)}>Remove</button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {cartItems.length !== 0 && (
                        <>
                            <div className="cart">
                                <div className="total">
                                    <div>
                                    Total:{" "}
                                    {formatCurrency(cartItems.reduce((accumulator, item) => accumulator + item.price * item.count, 0))}
                                    </div>
                                    <button onClick={() => setShowCheckout({showCheckout: true})} className="button primary">Proceed</button>
                                </div>
                            </div>
                            {showCheckout && (
                                <div className="cart">
                                <form onSubmit={createOrder}></form>
                                    <Form />
                                </div>
                            )}
                        </>
                    )}
                    
                </div>
            </div>

    )
}

export default Cart
