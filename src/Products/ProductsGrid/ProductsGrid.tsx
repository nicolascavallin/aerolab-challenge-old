import React, { FC, useState } from 'react'
import { motion } from 'framer-motion'
import { Box, Flex, SimpleGrid, Spacer, Text } from '@chakra-ui/layout'
import useProducts from '../hook'
import ProductCard from '../ProductCard'
import { Button, ButtonGroup, IconButton } from '@chakra-ui/button'
import { Product } from '../types'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import useSession from '../../Session/hook'

const maxProductsPerPage: number = 16

const ProductsGrid: FC = () => {

    const productsHook = useProducts()
    const sessionHook = useSession()

    const [ page, setPage ] = useState( 0 )
    const [ sort, setSort ] = useState<'recentFirst' | 'expensiveFirst' | 'cheapFirst'>( 'recentFirst' )

    const productsSorted = (): Product[] => {

        const productsClone = [ ...productsHook.products ]

        switch ( sort ) {
            case 'expensiveFirst':
                return [ ...productsClone.sort( (a, b) => b.cost - a.cost ) ]
            
            case 'cheapFirst':
                return [ ...productsClone.sort( (a, b) => a.cost - b.cost ) ]
            
                case 'recentFirst':
                return [ ...productsClone ]
        
            default:
                return [ ...productsClone ]
        }

    }

    const onNextPage = () => setPage( page + 1 )
    
    const onBackPage = () => setPage( page - 1 )

    return (
        <Box maxW='6xl'>

            <Flex align='center' borderBottomWidth={ 1 } maxW='6xl' px={ 8 } pb={ 4 } borderBottomColor='#D9D9D9' direction={[ 'column', 'column', 'row' ]}>
                <Text>{ (( page + 1 ) * maxProductsPerPage < productsHook.products.length) ? ( page + 1 ) * maxProductsPerPage : productsHook.products.length } of { productsHook.products.length } products</Text>
                <Box w='1px' h={[ '0px', '0px', '30px']} bg='#D9D9D9' mx={ 4 }></Box>
                <Text mr={ 2 }>Sort by:</Text>
                <ButtonGroup size='sm'>
                    <Button 
                        borderRadius={ 200 }
                        colorScheme={ sort === 'recentFirst' ? 'cyan' : 'gray' }
                        backgroundColor={ sort === 'recentFirst' ? '#0AD4FA' : '#EDEDED' }
                        textColor={ sort === 'recentFirst' ? 'white' : '#A3A3A3' }
                        onClick={ () => setSort( 'recentFirst' ) }
                        >Most recent</Button>
                    <Button 
                        borderRadius={ 200 }
                        colorScheme={ sort === 'cheapFirst' ? 'cyan' : 'gray' }
                        backgroundColor={ sort === 'cheapFirst' ? '#0AD4FA' : '#EDEDED' }
                        textColor={ sort === 'cheapFirst' ? 'white' : '#A3A3A3' }
                        onClick={ () => setSort( 'cheapFirst' ) }
                        >Lowest price</Button>
                    <Button 
                        borderRadius={ 200 }
                        colorScheme={ sort === 'expensiveFirst' ? 'cyan' : 'gray' }
                        backgroundColor={ sort === 'expensiveFirst' ? '#0AD4FA' : '#EDEDED' }
                        textColor={ sort === 'expensiveFirst' ? 'white' : '#A3A3A3' }
                        onClick={ () => setSort( 'expensiveFirst' ) }
                        >Highest price</Button>
                </ButtonGroup>
                <Spacer />
                <ButtonGroup>
                    <IconButton
                        aria-label='Back page'
                        variant='outline'
                        icon={ <ChevronLeftIcon /> }
                        isRound
                        onClick={ onBackPage }
                        isDisabled={ page === 0 }
                    />
                    <IconButton
                        aria-label='Next page'
                        variant='outline'
                        icon={ <ChevronRightIcon /> }
                        isRound
                        onClick={ onNextPage }
                        isDisabled={ page >= (productsHook.products.length / maxProductsPerPage) - 1 }
                    />
                </ButtonGroup>
            </Flex>

            <SimpleGrid columns={[ 1, 2, 3, 4 ]} maxW='6xl' spacing={ 4 } p={ 8 } alignItems='center'>

                {
                    productsHook.status === 'loading' && <Text>Loading products...</Text>
                }

                {
                    productsHook.status === 'error' && <Text>Error.</Text>
                }

                {
                    productsHook.status === 'ready' && productsSorted().slice( page * maxProductsPerPage, ( page + 1 ) * maxProductsPerPage ).map( (product, index) =>
                        <motion.div 
                            key={ `${product.id}-${ index }` }
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0, transition: { delay: index * 0.05 } }}
                            >
                            <ProductCard product={ product } userWallet={ sessionHook.user.points } />
                        </motion.div>
                    )
                }
                
            </SimpleGrid>

            <Flex align='center' borderTopWidth={ 1 } maxW='6xl' px={ 8 } pt={ 4 } mb={ 8 } borderTopColor='#D9D9D9'>
                <Text>{ (( page + 1 ) * maxProductsPerPage < productsHook.products.length) ? ( page + 1 ) * maxProductsPerPage : productsHook.products.length } of { productsHook.products.length } products</Text>
                <Spacer />
                <ButtonGroup>
                    <IconButton
                        aria-label='Back page'
                        variant='outline'
                        icon={ <ChevronLeftIcon /> }
                        isRound
                        onClick={ onBackPage }
                        isDisabled={ page === 0 }
                    />
                    <IconButton
                        aria-label='Next page'
                        variant='outline'
                        icon={ <ChevronRightIcon /> }
                        isRound
                        onClick={ onNextPage }
                        isDisabled={ page >= (productsHook.products.length / maxProductsPerPage) - 1 }
                    />
                </ButtonGroup>
            </Flex>

        </Box>
    )
}

export default ProductsGrid