import { useState } from 'react'

import BasicLoginPage from './pages/BasicLoginPage'
import FormBasedLoginPage from './pages/FormBasedLoginPage'
import HomePage from './pages/HomePage'

import { LoginProvider, IfLoggedIn, IfNotLoggedIn } from './LoginContext'
import { basicLogout, callBasicProtectedMethod, callFormBasedProtectedMethod, formBasedLogout } from './api'

import './App.css'

function App() {

  const [usingBasic, setUsingBasic] = useState(true)

  const methodName = usingBasic ? "Basic" : "Form-Based"
  const oppositeMethodName = usingBasic ? "Form-Based" : "Basic"

  function switchMethods() {
    setUsingBasic(!usingBasic)
  }

  return (
    <div>      
      {usingBasic && <AppUsingHttpBasic />}
      {!usingBasic && <AppUsingFormBased />}
      <hr/>
      <div>Using { methodName } Authentication</div>
      <button onClick={switchMethods}>Switch to { oppositeMethodName } </button>      
    </div>
  )
}

function AppUsingHttpBasic() {
  return (
    <LoginProvider logoutCallback={basicLogout}>
      <IfNotLoggedIn> 
        <BasicLoginPage />
      </IfNotLoggedIn>
      <IfLoggedIn> 
        <HomePage protectedMethod={callBasicProtectedMethod}/> 
      </IfLoggedIn>
    </LoginProvider>
  )
}

function AppUsingFormBased() {
  return (
    <LoginProvider logoutCallback={formBasedLogout}>
      <IfNotLoggedIn> 
        <FormBasedLoginPage />
      </IfNotLoggedIn>
      <IfLoggedIn> 
        <HomePage protectedMethod={callFormBasedProtectedMethod}/> 
      </IfLoggedIn>
    </LoginProvider>
  )
}

export default App
