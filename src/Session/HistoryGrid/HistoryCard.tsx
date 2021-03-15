import { Image } from '@chakra-ui/image'
import { Box, Center, Text } from '@chakra-ui/layout'
import React, { FC } from 'react'
import { HistoryItem } from '../types'
import * as timeago from 'timeago.js'

interface Props {
    item: HistoryItem
}

const HistoryCard: FC<Props> = ({ item }) => {

    return(
        <div>
            <Box
                borderWidth={ 1 }
                borderColor='transparent'
                shadow={ '2px 2px 4px rgba(0,0,0,0.1)' }
                background='white'
                position='relative'
            >
                <Text fontSize='sm' mx={ 4 } mt={ 4 } color='gray.400'>{ timeago.format( item.date ) }</Text>
                <Center>
                    <Image src={ item.img } />
                </Center>
                <Box h='1px' backgroundColor='#D9D9D9' m={ 4 } />
                <Text fontSize='sm' mx={ 4 } mt={ 4 } color='gray.400'>{ item.category }</Text>
                <Text fontSize='lg' mx={ 4 } mb={ 4 } mt={ 1 }>{ item.name }</Text>
            </Box>
        </div>
    )
}

export default HistoryCard