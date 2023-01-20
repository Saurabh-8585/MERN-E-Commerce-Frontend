import axios from 'axios'
import React, { useState, createContext } from 'react'
import { toast } from 'react-toastify'
export const ContextFunction = createContext()

const Context = ({ children }) => {
    const [cart, setCart] = useState([])


    return (
        <ContextFunction.Provider value={{ cart, setCart }}>
            {children}
        </ContextFunction.Provider>
    )
}

export default Context