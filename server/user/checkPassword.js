
import { disconnectDatabase, checkPasswordAndReturnUserOrDie } from "./users.js";

if (process.argv.length < 4) {
    console.log('Usage: checkPassword <username> <password>')
    process.exit(0)
}

const userName = process.argv[2]
const password = process.argv[3]

try {
    const user = await checkPasswordAndReturnUserOrDie(userName, password)
    console.log('Password is ok.')
    console.log('User is', user)
}
catch(error) {
    console.log('Authentication failed')
    console.log(error)
    console.log(error.message)
}

await disconnectDatabase();
