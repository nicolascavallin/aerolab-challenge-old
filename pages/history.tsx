import React from 'react'
import { Image } from '@chakra-ui/image'
import { Box, Text } from '@chakra-ui/layout'
import UserHeader from '../src/Session/UserHeader'
import HistoryGrid from '../src/Session/HistoryGrid'

interface Props {
  
}

const History = (props: Props) => {
  return (
    <Box display='flex' alignItems='center' flexDir='column'>
      <UserHeader />
      <Box maxW='6xl' mb={ 4 } position='relative'>
        <Image src='assets/header-x2.png' fit='cover' />
        <Text fontSize='4xl' fontWeight={ 700 } textShadow='0 0 5px rgba( 0, 0, 0, 0.2 )' color='white' position='absolute' bottom='20px' left='25px' >History</Text>
      </Box>
      <HistoryGrid />
    </Box>
  )
}

export default History