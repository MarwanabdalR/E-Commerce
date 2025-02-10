
import { Navigate } from 'react-router'

export default function ProtectedPath({children}) {
    if (localStorage.getItem("token")) {
        return children
    }
    else{
        return <Navigate to={"/login"} />
    }
}
