import { useCallback } from 'react'
import { useToast as useChakraToast, UseToastOptions } from '@chakra-ui/react'

type ToastOptions = Pick<UseToastOptions, 'title' | 'description' | 'status' | 'duration' >

export function useToast(){

    const toast = useChakraToast()

    return useCallback(
        ({ title, description, status, duration = ( status === 'success' ) ? 3000 : 6000 }: ToastOptions) => {
            
            toast({
                title,
                description,
                status,
                duration,
                isClosable: true,
                position: 'top-right'
            })
            
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    )

}