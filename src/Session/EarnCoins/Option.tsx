import { Button } from '@chakra-ui/button'
import { useRouter } from 'next/dist/client/router'
import React, { FC, useState } from 'react'
import { useToast } from '../../hooks/useToast'
import api from '../../Session/api'
import useSession from '../hook'

interface Props {
    amount: number
}

const Option: FC<Props> = ({ amount }) => {

    const session = useSession()
    const toast = useToast()
    const { push } = useRouter()

    const [ isLoading, setIsLoading ] = useState( false )

    const onEarn = async () => {

        setIsLoading( true )
        await api.points( amount ).then( async res => {

            if( res.status === 200 ){
                toast({ status: 'success', description: `Points earned. Now you have ${ amount.toLocaleString( 'de-DE' ) } new points.` }) 
                session.updatePoints( amount )
                push( '/' )
            } else {
                toast({ status: 'error', description: 'Well... Something went wrong, try again.' }) 
            }

        })
        setIsLoading( false )
        
    }

    return (
        <Button
            colorScheme='yellow'
            onClick={ onEarn }
            isLoading={ isLoading }
        >
            Get { amount.toLocaleString( 'de-DE' ) } coins
        </Button>
    )
}

export default Option