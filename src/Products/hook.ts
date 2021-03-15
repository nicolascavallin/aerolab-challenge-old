import { useContext } from 'react'
import ProductsContext from './context'

const useProducts = () => {

    const { state: { status, products, }, actions: {} } = useContext( ProductsContext )

    return { status, products, }

}

export default useProducts
