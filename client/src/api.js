
// BASIC methods

// username and password is not required because the browser will manage it
export async function tryBasicLogin() {
    const loginResponse = await fetch('/basic/login')
    if (loginResponse.status !== 200) {
        const message = await loginResponse.text()
        throw new Error(message)
    }
    return await loginResponse.json()
}

export async function basicLogout() {
    try {
        await fetch('/basic/logout')
    }
    catch (error) {
        // the server returns a 401 here - causing the browser 
        // to forget the current credentials
    }
}

export async function callBasicProtectedMethod() {
    // notice that we don't have to add headers here for basic because the browser
    // caches credentials.    
    const apiResponse = await fetch('/basic/cool-api-endpoint')
    return await apiResponse.json()
}


/// form based api methods
export async function tryFormBasedLogin(username, password) {
    const loginResponse = await fetch('/form-based/login', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
    })
    if (loginResponse.status !== 200) {
        const message = await loginResponse.text()
        throw new Error(message)
    }
    return await loginResponse.json()
}

export async function callFormBasedProtectedMethod() {
    // notice that we don't have to add headers here for form based because the browser
    // caches credentials in the cookie. 
    const apiResponse = await fetch('/form-based/awesome-api-endpoint')
    return await apiResponse.json()
}

export async function formBasedLogout() {
    await fetch('/form-based/logout')
}

