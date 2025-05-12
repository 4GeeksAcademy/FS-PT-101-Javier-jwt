import useGlobalReducer from "../hooks/useGlobalReducer"

export const Private = () => {

    const {store, dispatch} = useGlobalReducer()


    const handleLogout = () => {
        dispatch({type: 'logout'})
    }

    return (
<>
        <h3>Esto es privado!!!!</h3>
        <h4>Solo para los ojos de {store.user?.email}</h4>
        <button onClick={handleLogout}>logout</button>
</>
    )
}