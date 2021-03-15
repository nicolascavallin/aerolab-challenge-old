import { useContext } from 'react'
import SessionContext from './context'

const useSession = () => {

    const { state: { status, user, history }, actions: { updatePoints, updateHistory } } = useContext( SessionContext )

    return { status, user, history, updatePoints, updateHistory }

}

export default useSession
