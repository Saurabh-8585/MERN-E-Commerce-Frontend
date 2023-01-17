import React, { useContext } from 'react'
import { ContextFunction } from '../../Context/Context'
import CartItem from './CartItem'
const Cart = () => {
    const { cart } = useContext(ContextFunction)

    console.log("cart page  ", cart);
    return (
        <div style={{ marginTop: 90, display: "flex", flexWrap: "wrap" }}>
            {cart.map(prod => <CartItem prod={prod} />)}
        </div>
    )
}

export default Cart