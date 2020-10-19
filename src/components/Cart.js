import React, { useState } from 'react'
import formatCurrency from '../Util';

function Cart(props) {
    const {cartItems} = props;

    const [state, setState] = useState({
        email: '',
        name: '',
        address: ''
    })
    const [showCheckout, setShowCheckout] = useState(false);

    const handleInput = (e) => {
        setState({...state, [e.target.name]: e.target.value});
    }

    const createOrder =(e) => {
       e.preventDefault();
       const order = {
           name: state.name,
           email: state.email,
           address: state.address,
           cartItems: state.cartItems,
        };
        props.createOrder(order)
        console.log(order)
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
                        <div>
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
                                    <form onSubmit={createOrder}>
                                    <ul className="form-container">
                                        <li>
                                            <label htmlFor="">Email</label>
                                            <input name='email' type="email" onChange={handleInput} required/>
                                        </li>
                                        <li>
                                            <label htmlFor="">Name</label>
                                            <input name='name' type="text" onChange={handleInput} required/>
                                        </li>
                                        <li>
                                            <label htmlFor="">Address</label>
                                            <input name='address' type="text" onChange={handleInput} required/>
                                        </li>
                                        <li>
                                            <button className='button primary' type='submit'>Checkout</button>
                                        </li>
                                    </ul>
                                    </form>
                                    
                                </div>
                            )}
                        </div>
                    )}
                    
                </div>
            </div>

    )
}

export default Cart
