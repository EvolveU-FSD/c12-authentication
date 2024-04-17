
import { disconnectDatabase, checkPasswordAndReturnUserOrDie, changePassword } from "./users.js";

if (process.argv.length < 5) {
    console.log('Usage: changePassword <username> <old password> <new password>')
    process.exit(0)
}

const userName = process.argv[2]
const oldPassword = process.argv[3]
const newPassword = process.argv[4]

try {
    const user = await changePassword(userName, oldPassword, newPassword)
    console.log('Password is updated')
    console.log('User is', user)
}
catch(error) {
    console.log('Old password authentication failed')
    console.log(error)
    console.log(error.message)
}

await disconnectDatabase();
