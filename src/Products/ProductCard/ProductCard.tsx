import React, { FC, useState } from 'react'
import { Box, Center, Divider, Flex, Text } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/image'
import { Button } from '@chakra-ui/button'
import { Product } from '../types'
import { motion } from 'framer-motion'
import api from '../api'
import { useToast } from '../../hooks/useToast'
import { useRouter } from 'next/dist/client/router'
import useSession from '../../Session/hook'

interface Props {
    product: Product
    userWallet: number
}

const ProductCard: FC<Props> = ({ product, userWallet }) => {

    const session = useSession()
    const toast = useToast()
    const { push } = useRouter()

    const [ isHover, setIsHover ] = useState( false )
    const [ isLoading, setIsLoading ] = useState( false )

    const onHover = () => setIsHover( true )
    const onUnhover = () => setIsHover( false )

    const onRedeem = async () => {

        if( userWallet >= product.cost ){

            setIsLoading( true )
    
            await api.redeem( product.id ).then( async res => {

                if( res.status === 200 ){
                    toast({ status: 'success', description: `You've redeem the product successfully` }) 
                    session.updatePoints( product.cost * (-1) )
                    session.updateHistory()
                } else {
                    toast({ status: 'error', description: 'Well... Something went wrong, try again.' }) 
                }
    
            })
    
            setIsLoading( false )

        } else {

            push( '/earn' )

        }

        
    }

    return (
        <div>
            <Box
                borderWidth={ 1 }
                borderColor='transparent'
                shadow={ isHover ? '6px 6px 12px rgba(0,0,0,0.25)' : '2px 2px 4px rgba(0,0,0,0.1)' }
                _hover={{
                    transform: 'translateY(-0.5rem)'
                }}
                transitionProperty='all'
                transitionDuration='0.25s'
                onMouseEnter={ onHover }
                onMouseLeave={ onUnhover }
                background='white'
                position='relative'
                // maxW='276px'
            >
                { userWallet >= product.cost && <Image src='assets/icons/buy-blue.svg' w='42px' h='42px' position='absolute' top='12px' right='12px' />}
                { userWallet < product.cost && 
                    <Flex
                        h='42px'
                        position='absolute'
                        top='12px'
                        right='12px'
                        background='rgba( 97, 97, 97, 0.8 )'
                        p={ 2 }
                        borderRadius={ 200 }
                        align='center'
                    >
                        <Text mr={ 2 } fontSize='sm' color='white' >You need { product.cost.toLocaleString( 'de-DE' ) }</Text>
                        <Image src='assets/icons/coin.svg' />
                    </Flex>}
                <Center>
                    <Image src={ product.img } />
                </Center>
                <Box h='1px' backgroundColor='#D9D9D9' m={ 4 } />
                <Text fontSize='sm' mx={ 4 } mt={ 4 } color='gray.400'>{ product.category }</Text>
                <Text fontSize='lg' mx={ 4 } mb={ 4 } mt={ 1 }>{ product.name }</Text>
                <motion.div
                    initial={ ( (isHover || isLoading) ? { opacity: 0 } : { opacity: 1 }) }
                    animate={ ( (isHover || isLoading) ? { opacity: 1 } : { opacity: 0 }) }
                >
                    <Box
                        bgGradient={ ( userWallet >= product.cost ) ? 'linear( rgba( 10, 212, 250, 0.86) 0%, rgba( 37, 187, 241, 0.86) 100%, )' : 'linear( rgba( 97, 97, 97, 0.25) 0%, rgba( 97, 97, 97, 0.50) 100%, )' }
                        position='absolute'
                        top={ 0 }
                        bottom={ 0 }
                        left={ 0 }
                        right={ 0 }
                        p={ 4 }
                    >
                        <Box 
                            h='100%'
                            display='flex'
                            flexDir='column'
                            justifyContent='center'
                        >
                            { userWallet >= product.cost && <Image src='assets/icons/buy-white.svg' w='42px' h='42px' position='absolute' top='12px' right='12px' />}
                            { userWallet < product.cost && 
                                <Flex
                                    h='42px'
                                    position='absolute'
                                    top='12px'
                                    right='12px'
                                    background='rgba( 97, 97, 97, 0.8 )'
                                    p={ 2 }
                                    borderRadius={ 200 }
                                    align='center'
                                >
                                    <Text mr={ 2 } fontSize='sm' color='white' >You need { product.cost.toLocaleString( 'de-DE' ) }</Text>
                                    <Image src='assets/icons/coin.svg' />
                                </Flex>}
                            <Flex mb={ 2 } justify='center' >
                                <Text mr={ 2 } textAlign='center' fontSize='4xl' color='white'>{ product.cost.toLocaleString( 'de-DE' ) }</Text>
                                <Image src='assets/icons/coin.svg' />
                            </Flex>
                            <Button
                                mt={ 2 }
                                borderRadius={ 200 }
                                isFullWidth
                                backgroundColor='white'
                                isLoading={ isLoading }
                                onClick={ onRedeem }
                            >
                                { userWallet >= product.cost ? 'Redeem now' : `Get ${ (product.cost - userWallet).toLocaleString( 'de-DE' ) } more coins` }
                            </Button>
                        </Box>
                    </Box>
                </motion.div>
                {/* { (isHover || isLoading) && <Box
                    bgGradient='linear( rgba( 10, 212, 250, 0.86) 0%, rgba( 37, 187, 241, 0.86) 100%, )'
                    position='absolute'
                    top={ 0 }
                    bottom={ 0 }
                    left={ 0 }
                    right={ 0 }
                    className='animate__animated animate__fadeIn animate__faster'
                    p={ 4 }
                >
                    <Box 
                        h='100%'
                        display='flex'
                        flexDir='column'
                        justifyContent='center'
                    >
                        <Text mb={ 2 } textAlign='center' fontSize='4xl' color='white'>{ product.cost.toLocaleString( 'de-DE' ) }</Text>
                        <Button
                            mt={ 2 }
                            borderRadius={ 200 }
                            isFullWidth
                            backgroundColor='white'
                            isLoading={ isLoading }
                            onClick={ onRedeem }
                        >
                            Redeem now
                        </Button>
                    </Box>
                </Box>} */}
            </Box>
        </div>
    )
}

export default ProductCard