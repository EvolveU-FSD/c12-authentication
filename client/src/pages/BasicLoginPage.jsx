import { useContext, useState } from "react"

import './BasicLoginPage.css'
import { tryBasicLogin } from "../api.js"
import LoginContext from "../LoginContext.jsx"

function BasicLoginPage() {

    const loginContext = useContext(LoginContext)
    const [loginError, setLoginError] = useState()

    async function tryLogin() {
        setLoginError(undefined) // clear out old login error
        try {
            let loggedInUser = await tryBasicLogin()
            console.log('Login succeeded, updating context')
            loginContext.setLoggedInUser(loggedInUser)
        }
        catch(error) {
            setLoginError(error.message)
        }
    }
    
    return (
        <div className='login-form'>
            <div>The browser may ask you for credentials when click the button!</div>
            <button onClick={ tryLogin }>Login</button>
            <div>{loginError}</div>
        </div>
    )
}

export default BasicLoginPage