import { useContext, useState } from "react"
import LoginContext from "../LoginContext"

function HomePage({protectedMethod}) {
    const loginContext = useContext(LoginContext)

    const [methodResult, setMethodResult] = useState()

    async function tryProtectedCall() {
        console.log('Calling protected method')
        const result = await protectedMethod()
        setMethodResult(JSON.stringify(result))
    }

    return (
        <div>
            <h1>Hello {loginContext.loggedInUser.userName} </h1>
            <div><button onClick={tryProtectedCall}>Call api method with credentials</button></div>
            <div>{methodResult}</div>
            <div><button onClick={loginContext.logout}>Logout</button></div>
        </div>
    )
}

export default HomePage