export interface Context {
    actions: {}
    state: {
        status: 'loading' | 'ready' | 'error'
        products: Product[]
    }
}

export enum Status {
    loading,
    error,
    ready,
}

export interface Product {
    id: string
    name: string
    cost: number
    category: string
    img: string
}