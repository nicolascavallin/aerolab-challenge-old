export interface Context {
    state: {
        status: 'loading' | 'ready' | 'error'
        user: User
        history: HistoryItem[]
    }
    actions: {
        updatePoints: ( amount: number ) => void
        updateHistory: () => void
    }
}

export interface User {
    id: string
    name: string
    points: number
    // history: []
}

export interface HistoryItem {

    id: string
    name: string
    category: string
    img: string
    cost: number
    itemId: string
    date: Date

}