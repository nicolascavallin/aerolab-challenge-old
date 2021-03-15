import React, { FC } from 'react'
import { Flex, Text } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/image'
import useSession from '../hook'
import Link from 'next/link'

const UserHeader: FC = () => {

    const session = useSession()

    return(
        <Flex
            justify='space-between'
            maxW='6xl'
            px={ 8 }
            w='100%'
            py={ 4 }
            bg='white'
        >
            <Link href='/' >
                <Image src='assets/aerolab-logo.svg' _hover={{ cursor: 'pointer' }} />
            </Link>
            <Flex align='center'>
                <Link href='/history'>
                    <Text _hover={{
                        textDecoration: 'underline',
                        cursor: 'pointer',
                    }} mr={ 4 }>{ session.user.name }</Text>
                </Link>
                <Link href='/earn'>
                    <Flex
                        h='42px'
                        background='#EDEDED'
                        py={ 2 }
                        px={ 4 }
                        borderRadius={ 200 }
                        align='center'
                        _hover={{
                            cursor: 'pointer'
                        }}
                    >
                        <Text mr={ 2 } fontSize='md' >{ session.user.points.toLocaleString( 'de-DE' ) }</Text>
                        <Image mt='3px' src='assets/icons/coin.svg' />
                    </Flex>
                </Link>
            </Flex>
        </Flex>
    )
}

export default UserHeader