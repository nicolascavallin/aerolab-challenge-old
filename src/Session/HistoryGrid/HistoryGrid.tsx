import { SimpleGrid } from '@chakra-ui/layout';
import { motion } from 'framer-motion';
import React, { FC, useEffect } from 'react'
import useSession from '../hook';
import HistoryCard from './HistoryCard';

const HistoryGrid: FC = () => {

    const session = useSession()

    return (
        <SimpleGrid columns={[ 1, 2, 3, 4 ]} maxW='6xl' spacing={ 4 } p={ 8 } alignItems='center' >

            {
                session.history.map( ( item, index ) => 
                <motion.div key={ `history-${ index }` }
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: index * 0.05 } }}                
                >
                    <HistoryCard item={ item } />
                </motion.div>)
            }

        </SimpleGrid>
    )
}

export default HistoryGrid