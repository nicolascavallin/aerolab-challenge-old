import React, { FC, createContext, useEffect, useState } from 'react'
import api from './api'
import { Context, Product, Status } from './types'

const ProductsContext = createContext( {} as Context )

const ProductsProvider: FC = ({ children }) => {

    const [ status, setStatus ] = useState<'loading' | 'ready' | 'error'>( 'loading' )
    const [ products, setProducts ] = useState<Product[]>( [] )

    useEffect(() => {

        api.fetch.then( products => {
            setProducts([ ...products ])
            setStatus( 'ready' )
        }).catch( _ => setStatus( 'error' ))
        
    }, [])

    const state = {
        status,
        products,
    }
    const actions = {}

    return(
        <ProductsContext.Provider value={{ actions, state }}>
            { children }
        </ProductsContext.Provider>
    )
}

export {
    ProductsContext as default,
    ProductsProvider,
}