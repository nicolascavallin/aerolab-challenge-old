import { Box, VStack } from '@chakra-ui/layout'
import React, { FC, useState } from 'react'
import Option from './Option'

const EarnCoins: FC = () => {

    const [ isLoading, setIsLoading ] = useState( false )

    return (
        <VStack
            spacing={ 4 }
            p={ 8 }
            bg='white'
            shadow='2px 2px 4px rgba(0,0,0,0.1)'
        >
            { [ 1000, 5000, 7500 ].map( p => <Option key={ p } amount={ p } />) }
        </VStack>
    )
}

export default EarnCoins