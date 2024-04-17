import { useContext, useState } from "react"

import LoginContext from "../LoginContext"

import { tryFormBasedLogin } from "../api"

import './FormBasedLoginPage.css'

function FormBasedLoginPage() {
    const loginContext = useContext(LoginContext)

    const [loginError, setLoginError] = useState()

    async function tryLogin() {
        setLoginError(undefined) // clear out old login error
        const username = document.getElementById("username").value
        const password = document.getElementById("password").value
        try {
            let loggedInUser = await tryFormBasedLogin(username, password)
            loginContext.setLoggedInUser(loggedInUser)
        }
        catch(error) {
            setLoginError(error.message)
        }
    }
    
    return (
        <div className='login-form'>
            <div><label htmlFor="username">User name</label></div>
            <div><input name="username" id="username"></input></div>
            <div><label htmlFor="password">Password</label></div>
            <div><input name="password" id="password" type="password"></input></div>
            <div>{loginError}</div>
            <button onClick={ tryLogin }>Login</button>
        </div>
    )
}

export default FormBasedLoginPage