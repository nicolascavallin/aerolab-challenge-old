import React from 'react'
import { Image } from '@chakra-ui/image'
import { Box, Text } from '@chakra-ui/layout'
import ProductsGrid from '../src/Products/ProductsGrid'
import UserHeader from '../src/Session/UserHeader'

interface Props {
  
}

const Home = (props: Props) => {
  return (
    <Box display='flex' alignItems='center' flexDir='column'>
      <UserHeader />
      <Box maxW='6xl' mb={ 4 } position='relative'>
        <Image src='assets/header-x2.png' fit='cover' />
        <Text fontSize='4xl' fontWeight={ 700 } textShadow='0 0 5px rgba( 0, 0, 0, 0.2 )' color='white' position='absolute' bottom='20px' left='25px' >Electronics</Text>
      </Box>
      <ProductsGrid />
    </Box>
  )
}

export default Home