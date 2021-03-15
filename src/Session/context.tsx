import { Center } from '@chakra-ui/layout'
import React, { FC, createContext, useEffect, useState } from 'react'
import api from './api'
import { Context, HistoryItem, User } from './types'

const SessionContext = createContext( {} as Context )

const SessionProvider: FC = ({ children }) => {

    const [ status, setStatus ] = useState<'loading' | 'ready' | 'error'>( 'loading' )
    const [ user, setUser ] = useState<User>( null )
    const [ history, setHistory ] = useState<HistoryItem[]>( [] )

    useEffect(() => {

        api.user.then( user => {

            setUser( user )
            setStatus( 'ready' )

        }).catch( _ => setStatus( 'error' ))

        updateHistory()
        
    }, [])

    const updatePoints = ( amount: number ) => setUser({ ...user, points: user.points + amount })

    const updateHistory = () => {
        // no está actualizando 🥴
        api.history.then( res => setHistory( [ ...res ].reverse() ) )
    }

    if( status === 'loading' ) return <Center><p>Loading</p></Center>

    const state = {
        status,
        user,
        history,
    }
    const actions = {
        updatePoints,
        updateHistory,
    }

    return(
        <SessionContext.Provider value={{ actions, state }}>
            { children }
        </SessionContext.Provider>
    )
}

export {
    SessionContext as default,
    SessionProvider,
}